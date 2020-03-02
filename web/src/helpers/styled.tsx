import styled, { CreateStyled } from "@emotion/styled";

type Theme = {
	main: { purple: string; pink: string; blue: string };
	text: { black: string; grey: string; white: string };
	background: { white: string; pink: string; purple: string };
};

export default styled as CreateStyled<Theme>;
