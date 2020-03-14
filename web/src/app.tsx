import React from "react";
import { Router } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";
import Footer from "./components/footer";
import Header from "./components/header";
import useSWR from "swr";
import { SanityConfiguration } from "./sanity/models";
import { ClientError, ServerError } from "@sanity/client";
import { ConfigProvider } from "./utils/use-config";

const App: React.FC = () => {
	const { data, error } = useSWR<
		SanityConfiguration,
		ClientError | ServerError
	>(`
		*[_id in ["global_configuration", "drafts.global_configuration"]]
		| order(_updatedAt desc)
		[0]
	`);

	if (error) return <div>500 - Error</div>;
	if (data === undefined) return <div>Loading...</div>;
	if (data === null) return <div>No configuration found.</div>;

	return (
		<>
			<ConfigProvider value={data}>
				<Header />
				<main>
					<Router>
						<FrontPage path="/" />
						<Page path="/:slug" />
					</Router>
				</main>
				<Footer />
			</ConfigProvider>
		</>
	);
};

export default App;
