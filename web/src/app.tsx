import React from "react";
import { Router, globalHistory, Redirect } from "@reach/router";
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
import Event from "./pages/event";
import PartnerOverview from "./pages/partner-overview";
import Loading from "./components/loading";
import NotFound from "./pages/not-found";
import {
	initializeGoogleAnalytics,
	logPageView
} from "./utils/google-analytics";
import ErrorPage from "./pages/error";
import Partner from "./pages/partner";
import Live from "./pages/live";
import SkeivtKulturAarEvents from "./pages/skeivt-kulturaar-events";

const App: React.FC = () => {
	const { data, error } = useSWR<
		SanityConfiguration,
		ClientError | ServerError
	>(`
		*[_id in ["global_web_configuration", "drafts.global_web_configuration"]]
		| order(_updatedAt desc)
		[0]
	`);

	React.useEffect(() => {
		initializeGoogleAnalytics();
		logPageView();
		globalHistory.listen(() => {
			logPageView();
		});
	}, []);

	if (error)
		return (
			<ErrorPage error={`Unable to load configuration. Error: ${error}`} />
		);
	if (data === undefined) return <Loading />;
	if (data === null) return <ErrorPage error="Missing configuration" />;

	return (
		<>
			<ConfigProvider value={data}>
				<Header />
				<main>
					<Router>
						{data.redirects?.map(redirect => (
							<Redirect
								key={redirect._key}
								from={redirect.from}
								to={redirect.to}
							/>
						))}
						<NotFound default />
						<FrontPage path="/" />
						<Page path="/p/:slug" />
						<Article path="/a/:slug" />
						<ArticleOverview path="/articles" />
						<EventOverview path="/events" />
						<SkeivtKulturAarEvents path="/skeivt-kulturaar" />
						<Live path="/live" />
						<Event path="/event/:slug" />
						<PartnerOverview path="/partners" />
						<Partner path="/partner/:slug" />
					</Router>
				</main>
				<Footer />
			</ConfigProvider>
		</>
	);
};

export default App;
