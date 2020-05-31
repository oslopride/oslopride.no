import React from "react";
import { Router } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";
import Article from "./pages/article";
import ArticleOverview from "./pages/article-overview";
import Footer from "./components/footer";
import Header from "./components/header";
import useSWR from "swr";
import { SanityConfiguration } from "./sanity/models";
import { ClientError, ServerError } from "@sanity/client";
import { ConfigProvider } from "./utils/use-config";
import EventOverview from "./pages/event-overview";
import PartnerOverview from "./pages/partner-overview";
import Loading from "./components/loading";
import NotFound from "./pages/not-found";

const App: React.FC = () => {
	const { data, error } = useSWR<
		SanityConfiguration,
		ClientError | ServerError
	>(`
		*[_id in ["global_web_configuration", "drafts.global_web_configuration"]]
		| order(_updatedAt desc)
		[0]
	`);

	if (error) return <div>500 - Error</div>;
	if (data === undefined) return <Loading />;
	if (data === null) return <div>No configuration found.</div>;

	return (
		<>
			<ConfigProvider value={data}>
				<Header />
				<main>
					<Router>
						<NotFound default />
						<FrontPage path="/" />
						<Page path="/p/:slug" />
						<Article path="/a/:slug" />
						<ArticleOverview path="/articles" />
						<EventOverview path="/events" />
						<PartnerOverview path="/partners" />
					</Router>
				</main>
				<Footer />
			</ConfigProvider>
		</>
	);
};

export default App;
