import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense } from "../actions/expenses"
import { removeExpense } from "../actions/expenses";



//props.match.params.id je z react-routeru je to property predavana do komponenty a pochazi z url v AppRouter.js ("/edit/:id")
const EditExpensePage = (props) => {
   
    return (
    
    <div>
     <ExpenseForm 
        expense={props.expenseVracejiciSeZeState}
        onSubmit={(expenseParametr) => {
            props.dispatch(editExpense(props.match.params.id, expenseParametr));
            props.history.push("/");
        }}
    />
    <button onClick={() => {
        console.log(props);
        props.dispatch(removeExpense({id: props.expenseVracejiciSeZeState.id}));
        props.history.push("/");
    }}>odstranit</button>
    </div>
)};
//id je bud v props.match.params.id (to je z URL z react-routeru) nebo v props.expenseVracejiciSeZeState (to je z mapStateToProps) 
//onSubmit={(expenseParametr) => { tady je expenseParametr jen nazev parametru, skutecne udaje v ExpenseForm.js

//state je objekt v redux store kde je ulozen soucasny stav, props je objekt s informacemi ze state, ktere jsou diky mapStateToProps pristupne, ale taky tam jsou jine info treba params.id z react-routeru
const mapStateToProps = (state, props) => {
    
    return {expenseVracejiciSeZeState: state.expenses.find((polozka) => {
       
        return props.match.params.id === polozka.id
    })}
};


export default connect(mapStateToProps)(EditExpensePage);