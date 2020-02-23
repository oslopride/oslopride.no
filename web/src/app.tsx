import React from "react";
import { Router, Link } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";
import sanity, { isEmptyResult } from "./sanity";
import { SanityConfiguration } from "./sanity/models";
import { useSanityStore } from "./sanity/store";

type State = {
	isLoading: boolean;
	configuration: SanityConfiguration | null;
};

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
		<>
			<h1>Welcome to this page</h1>
			<nav>
				<ul>
					{store.configuration?.navigationBar.map(item => {
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
