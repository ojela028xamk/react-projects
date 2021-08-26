import React from 'react';

/* AppContextin avulla komponentit käyttävät statea
	https://reactjs.org/docs/context.html
*/

// AppReducer luo uuden globaalin state objektin
const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
			};
		case 'DELETE_EXPENSE':
			return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id !== action.payload
				),
			};
		default:
			return state;
	}
};


/* 
InitialStatella indikoidaan staten muoto eli mitä ominaisuuksia ja dataa meillä on.
Voidaan jättää tyhjät stringit, arrayt jne. 
*/

const initialState = {
	budget: 2000,
	expenses: [],
};

export const AppContext = React.createContext(); // Context objekti

// AppProvider on komponentti joka wrappaa komponentit, joihin me halutaan yhdistää state
export const AppProvider = (props) => {
	const [state, dispatch] = React.useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				budget: state.budget,
				expenses: state.expenses,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};