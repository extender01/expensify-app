import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses"

//expense je objekt ktery prichazi z komponenty Expense form, kde se vola fce onSubmit s objektem v argumetu (to je tady ten expense) ktery obsahuje udaje ze submitovane form
//tyto udaje se predaji dal pres props.dispatch do redux store a tam se ulozi novy zaznam 
//history je objekt z react-routeru, pres push se muzeme presmerovat jinam bez refreshe
const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={(expense) => {
            console.log(expense);
            props.dispatch(addExpense(expense));
            props.history.push("/");
         }}
        />
    </div>
);

export default connect()(AddExpensePage);