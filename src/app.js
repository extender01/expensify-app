//kdyz je export named tak pri importu se musi jmenovat stejne jako v exportnim souboru
//kdyz je export default tak se to pri jmenovani importu muze jmenovat jinak nez v externim souboru a je to bez slozenych zavorek

/* import {square, add} from "./utils.js";
import {isAdult, canDrink} from "./person.js";
import defaultniFceSenior from "./person.js"; */

/* import validator from "validator";
console.log(validator.isEmail("ahoooooj@asf.com")); */


import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses.js";
import "normalize.css/normalize.css"
import "./styles/styles.scss";
import "./firebase/firebase";

const store = configureStore();

// store.dispatch(addExpense({description: "water bill", amount: 5000, createdAt: 0}));
// store.dispatch(addExpense({description: "gas bill", amount: 2000, createdAt: 1000}));
// store.dispatch(addExpense({description: "rent", amount: 109500, createdAt: 0}));
// store.dispatch(setTextFilter("water"));

// setTimeout(() => {
//     store.dispatch(setTextFilter("bill"));
// }, 1000)

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

// console.log(visibleExpenses);


//definujeme store, ktery budeme pro komponenty zpristupnovat
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"))

