import React from "react";
// Components
import { Header } from "../header";
// Hooks
import { useFeed } from "./index.hook";

export const MainPage = () => {
	useFeed();

	return (
		<div>
			<Header />
		</div>
	);
};
