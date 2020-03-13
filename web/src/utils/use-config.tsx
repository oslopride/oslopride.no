import React from "react";
import { SanityConfiguration } from "../sanity/models";

const ConfigContext = React.createContext<SanityConfiguration | undefined>(
	undefined
);

type Props = {
	value: SanityConfiguration;
};

export const ConfigProvider: React.FC<Props> = props => {
	const { children, value } = props;

	return (
		<ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
	);
};

export default function useConfig() {
	const context = React.useContext(ConfigContext);

	if (context === undefined) {
		throw new Error("useConfig must be used within a ConfigProvider");
	}

	return context;
}
