import { useContext, useEffect, useState } from "react";
import { Store } from "@components/main-page";

export function usePreference(onClose) {
	const {
		setAuthor: setSelectedAuthor,
		setSource: setSelectedSource,
		onCategorySelect: setSelectedCategory,
	} = useContext(Store);

	const [source, setSource] = useState("");
	const [author, setAuthor] = useState("");
	const [category, setCategory] = useState("");

	useEffect(() => {
		const preferredSource = localStorage.getItem("preferredSource");
		const preferredAuthor = localStorage.getItem("preferredAuthor");
		const preferredCategory = localStorage.getItem("preferredCategory");

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

	function handleCategorySelect(key) {
		const currentPreferredCategory = localStorage.getItem("preferredCategory");

		if (currentPreferredCategory === key) {
			localStorage.removeItem("preferredCategory");
			setCategory("");
		} else {
			setCategory(key);
			localStorage.setItem("preferredCategory", key);
		}
	}

	function handleSourceChange(event) {
		const { value } = event.target;

		setSource(value);
		localStorage.setItem("preferredSource", value);
	}

	function handleAuthorChange(event) {
		const { value } = event.target;

		setAuthor(value);
		localStorage.setItem("preferredAuthor", value);
	}

	function handleRefresh() {
		setSelectedSource(source);
		setSelectedAuthor(author);
		setSelectedCategory(category);
		onClose();
	}

	return {
		author,
		source,
		category,
		handleRefresh,
		handleAuthorChange,
		handleSourceChange,
		handleCategorySelect,
	};
}
