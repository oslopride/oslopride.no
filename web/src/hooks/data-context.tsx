import React, { ReactNode } from "react";
import sanity, { SanityConfiguration } from "../sanity";
import { isEmptyResult } from "../sanity/utils";

type State = {
	isLoading: boolean;
	data: SanityConfiguration | null;
};

const DataContext = React.createContext<State | null>(null);

export const DataProvider: React.FC<ReactNode> = ({ children }) => {
	const [state, setState] = React.useState<State>({
		isLoading: true,
		data: null
	});

	React.useEffect(() => {
		const query = `*[]`;
		sanity
			.fetch<SanityConfiguration>(query)
			.then((result: SanityConfiguration | null) => {
				console.log(result);
				setState(current => ({
					...current,
					isLoading: false,
					data: result
				}));
			});
	}, []);

	return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
	const context = React.useContext(DataContext);
	if (context === undefined) {
		throw new Error("useDataContext must be used within a DataProvider");
	}
	return context;
};
