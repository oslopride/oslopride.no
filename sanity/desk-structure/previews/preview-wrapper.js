import React from "react";
// For later reference: https://codesandbox.io/s/p98y9o7jz0 & https://github.com/emotion-js/emotion/issues/560
import { StyleSheetManager } from "styled-components";
import Frame, { FrameContextConsumer } from "react-frame-component";

export default function PreviewWrapper({ children }) {
	return (
		<Frame width="100%" height="100%" frameBorder="0">
			<FrameContextConsumer>
				{frameContext => (
					<StyleSheetManager target={frameContext.document.head}>
						<>{children}</>
					</StyleSheetManager>
				)}
			</FrameContextConsumer>
		</Frame>
	);
}
