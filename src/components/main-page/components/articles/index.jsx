import React, { useContext } from "react";
import cn from "classnames";
// Components
import { ArticleItem } from "../article-item";
// Styles
import styles from "./index.module.scss";
// Store
import { Store } from "../..";

export const Articles = () => {
	const { articles, isFilterVisible } = useContext(Store);

	return (
		<div
			className={cn(styles.articles, {
				[styles["articles--filter-visible"]]: isFilterVisible,
			})}
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
