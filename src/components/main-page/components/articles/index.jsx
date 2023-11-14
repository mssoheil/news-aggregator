import React, { useContext } from "react";
// Components
import { ArticleItem } from "../article-item";
// Styles
import styles from "./index.module.scss";
import { Store } from "../..";

export const Articles = () => {
	const { articles, isFilterVisible } = useContext(Store);

	return (
		<div
			className={`${styles.articles} ${
				isFilterVisible ? styles["articles--filter-visible"] : ""
			}`}
		>
			{articles.map((article) => (
				<ArticleItem
					article={article}
					key={`${article.title}_${article.url}`}
				/>
			))}
		</div>
	);
};
