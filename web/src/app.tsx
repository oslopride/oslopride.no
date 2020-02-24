// @ts-nocheck

import React from "react";
import { Router, Link } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";
import sanity, { isEmptyResult } from "./sanity";
import { SanityConfiguration } from "./sanity/models";
import { useSanityStore } from "./sanity/store";
import * as S from "./styles";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
type State = {
	isLoading: boolean;
	configuration: SanityConfiguration | null;
};
import Header from "./components/Header";

const App: React.FC = () => {
	const [isLoading, setLoading] = React.useState(true);
	const [store, dispatch] = useSanityStore();

	React.useEffect(() => {
		if (store.configuration === undefined) {
			setLoading(true);
			sanity
				.fetch<SanityConfiguration>(
					`*[_id == "global_configuration"][0]{..., navigationBar[]->}`
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

	return (
		<ThemeProvider theme={S.theme}>
			<S.GlobalStyle />

			<Header />
			<S.Content>
				<Router>
					<FrontPage path="/" />
					<Page path="/:slug" />
				</Router>
			</S.Content>
			<Footer
				date={store.configuration.date}
				links={store.configuration.footer.links}
			/>
		</ThemeProvider>
	);
};

export default App;
