import React from "react";
import { Router, Link } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";
import { useDataContext } from "./hooks/data-context";

const App: React.FC = () => {
	const { isLoading, data } = useDataContext();
	console.log(data);
	const navBar = data.filter(
		(item: any) => item.__id === "global_configuration"
	).navigationBar;

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<h1>Welcome to this page</h1>
			<nav>
				<ul>
					{navBar.map((item: any) => {
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
