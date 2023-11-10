import { useEffect } from "react";

const newsApiApiKey = process.env.REACT_APP_NEWSAPI_API_KEY;
const nytimesApiKey = process.env.REACT_APP_NYTIMES_API_KEY;
const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;

export function useFeed() {
	useEffect(() => {
		handleFetchArticles();
	}, []);

	async function handleFetchArticles() {
		try {
			const newsapiResponse = await fetch(
				`/newsapi/v2/everything?apiKey=${newsApiApiKey}&q=keyword`
			);
			const newsapiArticles = await newsapiResponse.json();

			const nytimesResponse = await fetch(
				`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nytimesApiKey}&q=election`
			);
			const nytimesArticles = await nytimesResponse.json();

			const guardianResponse = await fetch(
				`https://content.guardianapis.com/search?api-key=${guardianApiKey}`
			);
			const guardianArticles = await guardianResponse.json();
		} catch (error) {
			console.log("Debug ~ handleFetchArticles ~ error:", error);
		}
	}
}
