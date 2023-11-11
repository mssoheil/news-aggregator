import { useEffect, useState } from "react";

const newsApiApiKey = process.env.REACT_APP_NEWSAPI_API_KEY;
const nytimesApiKey = process.env.REACT_APP_NYTIMES_API_KEY;
const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;

export function useFeed() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newsapiHasError, setNewsapiHasError] = useState(true);
	const [nytimesHasError, setNytimesHasError] = useState(true);
	const [guardianHasError, setGuardianHasError] = useState(true);

	useEffect(() => {
		handleFetchArticles();
	}, []);

	async function getNewsApiArticles() {
		try {
			setNewsapiHasError(false);
			const newsapiResponse = await fetch(
				`/newsapi/v2/everything?apiKey=${newsApiApiKey}&q=keyword&pageSize=10`
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
				`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nytimesApiKey}&q=election&page=1`
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
				`https://content.guardianapis.com/search?api-key=${guardianApiKey}&page=1`
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
			console.log("Debug ~ handleFetchArticles ~ error:", error);
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
		hasError: guardianHasError && nytimesHasError && newsapiHasError,
		loading,
	};
}
