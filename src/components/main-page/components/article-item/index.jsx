import React, { Fragment } from "react";
// Utilities
import { getFormattedDate } from "@root/utils/date.util";
// Styles
import styles from "./index.module.scss";
// Assets
import linkIcon from "@root/assets/images/link-icon.svg";

export const ArticleItem = ({ article }) => {
	return (
		<div className={styles["article-item"]}>
			<h4 className={styles["article-item__header"]}>
				{getFormattedDate(article.publishedAt)}
			</h4>
			<h4 className={styles["article-item__header"]}>
				{article.author ? (
					<Fragment>
						{article.author ? <b>By</b> : ""}
						{article.author ?? ""}
					</Fragment>
				) : (
					"Unknown author"
				)}
			</h4>
			<h3 className={styles["article-item__title"]}>{article.title}</h3>
			<a
				target="_blank"
				rel="noreferrer"
				href={article.url}
				className={styles["article-item__link"]}
			>
				Read the article
				<img src={linkIcon} alt="link-icon" height={18} width={18} />
			</a>
		</div>
	);
};
