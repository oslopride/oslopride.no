import React from "react";
import { useOvermind } from "./overmind";
import { Router, Link } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";

const App: React.FC = () => {
	const { state } = useOvermind();

	if (state.isLoadingConfiguration) return <>Loading...</>;
	if (state.configuration === null) return <>Error</>;

	return (
		<>
			<h1>Welcome to this page</h1>
			<nav>
				<ul>
					{state.configuration.navigationBar.map(link => (
						<li key={link.id}>
							<Link to={link.url}>{link.title.no}</Link>
						</li>
					))}
				</ul>
			</nav>
			<article>
				<Router>
					<FrontPage path="/" />
					<Page path="/:slug" />
				</Router>
			</article>
			<footer>
				<p>This is the end of the page.</p>
			</footer>
		</>
	);
};

export default App;
