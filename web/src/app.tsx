import React from "react";
import { Router } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";
import sanity, { isEmptyResult } from "./sanity";
import { SanityConfiguration } from "./sanity/models";
import { useSanityStore } from "./sanity/store";
import Footer from "./components/footer";
import Header from "./components/header/header";

const App: React.FC = () => {
	const [isLoading, setLoading] = React.useState(true);
	const [store, dispatch] = useSanityStore();

	React.useEffect(() => {
		if (store.configuration === undefined) {
			setLoading(true);
			sanity
				.fetch<SanityConfiguration>(
					`*[_id == "global_configuration"][0]{ ..., navigationBar[]{ url->, text } }`
				)
				.then(result => {
					if (!isEmptyResult(result)) {
						dispatch({ type: "set_configuration", data: result });
					}
					setLoading(false);
				});
		}
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (!store.configuration) return <div>Error: No configuration available</div>;

	return (
		<>
			<Header
				navigation={store.configuration.navigationBar || []}
				date={store.configuration.date}
			/>
			<main>
				<Router>
					<FrontPage path="/" />
					<Page path="/:slug" />
				</Router>
			</main>
			<Footer footer={store.configuration.footer} />
		</>
	);
};

export default App;
