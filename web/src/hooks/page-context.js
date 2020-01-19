import React from "react";

const PageContext = React.createContext();

export function PageProvider({ context, children }) {
	return (
		<PageContext.Provider value={context}>{children}</PageContext.Provider>
	);
}
export function usePageContext() {
	const context = React.useContext(PageContext);
	if (context === undefined) {
		throw new Error("usePageContext must be used within a PageProvider");
	}
	return context;
}
