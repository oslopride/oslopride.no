import React from "react";
import { SanityConfiguration, SanityPage, SanityFrontPage } from "./models";

type State = {
	configuration?: SanityConfiguration;
	pages: { [id: string]: SanityPage };
	frontPage?: SanityFrontPage;
};

const initialState: State = {
	pages: {}
};

type Action =
	| { type: "set_configuration"; data: SanityConfiguration }
	| { type: "set_front_page"; data: SanityFrontPage }
	| { type: "add_page"; data: SanityPage };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "set_configuration": {
			return { ...state, configuration: action.data };
		}
		case "set_front_page": {
			return { ...state, frontPage: action.data };
		}
		case "add_page": {
			return {
				...state,
				pages: { ...state.pages, [action.data._id]: action.data }
			};
		}
	}
}

const Context = React.createContext<
	[State, React.Dispatch<Action>] | undefined
>(undefined);

export const SanityStoreProvider: React.FC = props => {
	const store = React.useReducer(reducer, initialState);

	return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export function useSanityStore() {
	const context = React.useContext(Context);
	if (context === undefined) {
		throw new Error("useSanityStore must be used within a SanityStoreProvider");
	}
	return context;
}
