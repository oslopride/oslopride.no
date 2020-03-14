import React from "react";

export default function useWindowSize(idleTime = 500) {
	const getWindowSize = () => ({
		width: window.innerWidth,
		height: window.innerHeight
	});
	const [windowSize, setWindowSize] = React.useState(getWindowSize);

	React.useEffect(() => {
		let timeout: number | undefined;

		function handleResize() {
			window.clearTimeout(timeout);
			timeout = window.setTimeout(() => setWindowSize(getWindowSize), idleTime);
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.clearTimeout(timeout);
		};
	}, []);

	return windowSize;
}
