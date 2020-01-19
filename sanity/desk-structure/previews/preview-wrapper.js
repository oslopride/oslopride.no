import React from "react";
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
