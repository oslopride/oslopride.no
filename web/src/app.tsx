import React from "react";
import { Router } from "@reach/router";
import Page from "./pages/page";
import FrontPage from "./pages/front-page";
import Footer from "./components/footer";
import Header from "./components/header";

const App: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Router>
					<FrontPage path="/" />
					<Page path="/:slug" />
				</Router>
			</main>
			<Footer />
		</>
	);
};

export default App;
