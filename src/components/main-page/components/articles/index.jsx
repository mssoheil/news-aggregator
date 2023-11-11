import React from "react";
// Components
import { ArticleItem } from "../article-item";
// Styles
import styles from "./index.module.scss";

export const Articles = ({ data }) => {
	return (
		<div className={styles.articles}>
			{data.map((article) => (
				<ArticleItem
					article={article}
					key={`${article.title}_${article.url}`}
				/>
			))}
		</div>
	);
};
