import { useEffect, useMemo, useRef, useState } from "react";
// Utilities
import { createQuery } from "@root/utils/query.util";

const newsApiApiKey = process.env.REACT_APP_NEWSAPI_API_KEY;
const nytimesApiKey = process.env.REACT_APP_NYTIMES_API_KEY;
const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;

const newsApiBaseUrl = "/newsapi/v2/top-headlines";
const nytimesBaseUrl =
	"https://api.nytimes.com/svc/search/v2/articlesearch.json";
const guardianBaseUrl = "https://content.guardianapis.com/search";

export function useFeed() {
	const [page, setPage] = useState(1);
	const [toDate, setToDate] = useState("");
	const [source, setSource] = useState("");
	const [author, setAuthor] = useState("");
	const [keyword, setKeyword] = useState("");
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fromDate, setFromDate] = useState("");
	const [category, setCategory] = useState(null);
	const [newsapiHasError, setNewsapiHasError] = useState(true);
	const [nytimesHasError, setNytimesHasError] = useState(true);
	const [guardianHasError, setGuardianHasError] = useState(true);

	useEffect(() => {
		const preferredCategory = localStorage.getItem("preferredCategory");
		const preferredSource = localStorage.getItem("preferredSource");
		const preferredAuthor = localStorage.getItem("preferredAuthor");

		if (preferredCategory) {
			setCategory(preferredCategory);
		}

		if (preferredSource) {
			setSource(preferredSource);
		}

		if (preferredAuthor) {
			setAuthor(preferredAuthor);
		}
	}, []);

	const hasError = useMemo(
		() => guardianHasError && nytimesHasError && newsapiHasError,
		[guardianHasError, nytimesHasError, newsapiHasError]
	);

	useEffect(() => {
		const currentPreferredCategory = localStorage.getItem("preferredCategory");
		setCategory(currentPreferredCategory);
	}, []);

	useEffect(() => {
		handleFetchArticles();
	}, [page, fromDate, toDate, source, keyword, category]);

	function goNextPage() {
		if (!hasError && !loading) {
			setPage((page) => page + 1);
		}
	}

	function goPreviousPage() {
		if (hasError || loading) {
			return;
		}

		if (page > 1) {
			setPage((page) => page - 1);
		}
	}

	async function getNewsApiArticles() {
		try {
			setNewsapiHasError(false);
			const newsapiQuery = createQuery({
				page,
				source,
				author,
				category,
				to: toDate,
				pageSize: 10,
				from: fromDate,
				apiKey: newsApiApiKey,
				q: keyword || "keyword",
			});
			const newsapiResponse = await fetch(`${newsApiBaseUrl}?${newsapiQuery}`);
			const newsapiArticles = await newsapiResponse.json();

			return newsapiArticles?.articles;
		} catch (error) {
			setNewsapiHasError(true);
		}
	}

	async function getNyTimesArticles() {
		try {
			setNytimesHasError(false);
			const sourceQuery = source && `source:(${source})`;
			const newsDeskQuery = category && `news_desk:(${category})`;
			const filterQuery =
				sourceQuery && newsDeskQuery
					? `${sourceQuery} AND ${newsDeskQuery}`
					: sourceQuery || newsDeskQuery;

			const nytimesQuery = createQuery({
				page,
				q: keyword,
				fq: filterQuery,
				byline: author,
				end_date: toDate,
				begin_date: fromDate,
				"api-key": nytimesApiKey,
			});
			const nytimesResponse = await fetch(`${nytimesBaseUrl}?${nytimesQuery}`);
			const nytimesArticles = await nytimesResponse.json();

			return nytimesArticles?.response.docs;
		} catch (error) {
			setNytimesHasError(true);
		}
	}

	async function getGuardianArticles() {
		try {
			setGuardianHasError(false);
			const guardianQuery = createQuery({
				page,
				author,
				q: keyword,
				"page-size": 10,
				section: category,
				"to-date": toDate,
				"from-date": fromDate,
				"api-key": guardianApiKey,
				"show-references": "author",
			});
			const guardianResponse = await fetch(
				`${guardianBaseUrl}?${guardianQuery}`
			);
			const guardianArticles = await guardianResponse.json();

			return guardianArticles?.response.results;
		} catch (error) {
			setGuardianHasError(true);
		}
	}

	async function handleFetchArticles() {
		try {
			setLoading(true);

			const newsapiArticles = await getNewsApiArticles();

			const nytimesArticles = await getNyTimesArticles();

			const guardianArticles = await getGuardianArticles();

			const aggregatedData = aggregate(
				newsapiArticles ?? [],
				nytimesArticles ?? [],
				guardianArticles ?? []
			);

			setArticles(aggregatedData);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	function aggregate(newsApi, nytimes, guardian) {
		const newsApiAggregated = newsApi.map(
			({ author, title, description, publishedAt, source, url }) => ({
				url,
				title,
				author,
				description,
				publishedAt,
				source: source.name,
				newsCompany: "newsApi",
			})
		);

		const nytimesAggregated = nytimes.map(
			({ byline, headline, lead_paragraph, pub_date, source, web_url }) => ({
				source,
				url: web_url,
				title: headline.main,
				publishedAt: pub_date,
				newsCompany: "nytimes",
				description: lead_paragraph,
				author: byline.original?.replace(/By /i, ""),
			})
		);

		const guardianAggregated = guardian.map(
			({ webPublicationDate, webTitle, webUrl }) => ({
				url: webUrl,
				title: webTitle,
				newsCompany: "guardian",
				publishedAt: webPublicationDate,
			})
		);

		return [
			...newsApiAggregated,
			...nytimesAggregated,
			...guardianAggregated,
		].sort((a, b) => (a.publishedAt > b.publishedAt ? 1 : -1));
	}

	function handleFromDateChange(fromDate) {
		setFromDate(fromDate);
	}

	function handleToDateChange(toDate) {
		setToDate(toDate);
	}

	function handleSourceChange(source) {
		setSource(source);
	}

	function handleKeywordChange(value) {
		setKeyword(value);
	}

	function handleSubmit(fromDate, toDate, source) {
		handleToDateChange(toDate);
		handleSourceChange(source);
		handleFromDateChange(fromDate);
	}

	function onCategorySelect(value) {
		setCategory(value);
	}

	return {
		toDate,
		source,
		loading,
		keyword,
		articles,
		hasError,
		fromDate,
		category,
		setAuthor,
		setSource,
		goNextPage,
		handleSubmit,
		goPreviousPage,
		onCategorySelect,
		handleKeywordChange,
		hasPreviousPage: page > 1 && !loading && !hasError,
		hasNextPage: !loading && !hasError && articles.length,
	};
}
