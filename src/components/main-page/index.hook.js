import { useEffect, useMemo, useState } from "react";

const newsApiApiKey = process.env.REACT_APP_NEWSAPI_API_KEY;
const nytimesApiKey = process.env.REACT_APP_NYTIMES_API_KEY;
const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;

const newsApiBaseUrl = "/newsapi/v2/everything";
const nytimesBaseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const guardianBaseUrl = "https://content.guardianapis.com/search";

export function useFeed() {
	const [page, setPage] = useState(1);
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newsapiHasError, setNewsapiHasError] = useState(true);
	const [nytimesHasError, setNytimesHasError] = useState(true);
	const [guardianHasError, setGuardianHasError] = useState(true);

	const hasError = useMemo(
		() => guardianHasError && nytimesHasError && newsapiHasError,
		[guardianHasError, nytimesHasError, newsapiHasError]
	);

	useEffect(() => {
		handleFetchArticles();
	}, [page]);

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
			const newsapiResponse = await fetch(
				`${newsApiBaseUrl}?apiKey=${newsApiApiKey}&q=keyword&pageSize=10&page=${page}`
			);
			const newsapiArticles = await newsapiResponse.json();

			return newsapiArticles?.articles;
		} catch (error) {
			setNewsapiHasError(true);
		}
	}

	async function getNyTimesArticles() {
		try {
			setNytimesHasError(false);
			const nytimesResponse = await fetch(
				`${nytimesBaseUrl}?api-key=${nytimesApiKey}&q=election&page=${page}`
			);
			const nytimesArticles = await nytimesResponse.json();

			return nytimesArticles?.response.docs;
		} catch (error) {
			setNytimesHasError(true);
		}
	}

	async function getGuardianArticles() {
		try {
			setGuardianHasError(false);
			const guardianResponse = await fetch(
				`${guardianBaseUrl}?api-key=${guardianApiKey}&page=${page}`
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
				newsCompany: "newsApi",
				author,
				title,
				description,
				publishedAt,
				source: source.name,
				url,
			})
		);

		const nytimesAggregated = nytimes.map(
			({ byline, headline, lead_paragraph, pub_date, source, web_url }) => ({
				newsCompany: "nytimes",
				author: byline.original?.replace(/By /i, ""),
				title: headline.main,
				description: lead_paragraph,
				publishedAt: pub_date,
				source,
				url: web_url,
			})
		);

		const guardianAggregated = guardian.map(
			({ webPublicationDate, webTitle, webUrl }) => ({
				newsCompany: "guardian",
				title: webTitle,
				publishedAt: webPublicationDate,
				url: webUrl,
			})
		);

		return [
			...newsApiAggregated,
			...nytimesAggregated,
			...guardianAggregated,
		].sort((a, b) => (a.publishedAt > b.publishedAt ? 1 : -1));
	}



	return {
		articles,
		hasError,
		loading,
		hasPreviousPage: page > 1 && !loading && !hasError,
		hasNextPage: !loading && !hasError && articles.length,
		goNextPage,
		goPreviousPage,
	};
}
