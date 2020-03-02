type Theme = {
	main: { purple: string; pink: string; blue: string };
	text: { black: string; grey: string; white: string };
	background: { white: string; pink: string; purple: string };
};

const theme: Theme = {
	main: { purple: "#3a1b7b", pink: "#e350a0", blue: "#184FBD" },
	text: { black: "#252525", grey: "#656781", white: "#ffffff" },
	background: { white: "#f7f8fa", pink: "#f7acb3", purple: "#bfb4d3" }
};

export default theme;
