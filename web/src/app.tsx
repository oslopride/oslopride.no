import React from "react";
import { Router, Link } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";
import sanity, { SanityConfiguration } from "./sanity";
import { isEmptyResult } from "./sanity/utils";

type State = {
	isLoading: boolean;
	configuration: SanityConfiguration | null;
};

const App: React.FC = () => {
	const [state, setState] = React.useState<State>({
		isLoading: true,
		configuration: null
	});

	React.useEffect(() => {
		const query = `*[_id == "global_configuration"][0]{..., navigationBar[]->}`;
		sanity.fetch<SanityConfiguration>(query).then(result => {
			setState(current => ({
				...current,
				isLoading: false,
				configuration: isEmptyResult(result) ? null : result
			}));
		});
	}, []);

	if (state.isLoading) return <div>Loading...</div>;

	return (
		<>
			<h1>Welcome to this page</h1>
			<nav>
				<ul>
					{state.configuration?.navigationBar.map(item => {
						const id = item._id;
						const slug = item._type === "frontPage" ? "/" : item.slug.current;
						const title = item._type === "frontPage" ? "Hjem" : item.title.no;
						return (
							<li key={id}>
								<Link to={slug}>{title}</Link>
							</li>
						);
					})}
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
