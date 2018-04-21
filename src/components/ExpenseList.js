import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

//KOMPONENTA
//{...item} je to same jako vypsat vsechny key:value z toho item
const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        <p>{props.expenses.length}</p>
        {props.expenses.map((item) => {
           
            return <ExpenseListItem key={item.id} {...item} />
        })}
        
        
    </div>
    
    
);

//syntax je connect()() - to je volani funkce uvnitr funkce; ()() jsou: (funkce, ktera rika jakou informaci ze store chceme zpristupnit pro komponentu) (komponenta, do ktere to chceme pripojit)
//(state) ze store se predava jako prvni argument do metody connect; vraci se objekt, ktery se da pouzit jako props v puvodni komponente ExpenseList



/* const ConnectedExpenseList = connect((state) => {
    return {
        jmeno: state.expenses
    }
})(ExpenseList);

export default ConnectedExpenseList; */




//==================================================JINAK ZAPSANE TO STEJNE VYSE

//mapuje state ze store nebo odjinud k props od komponenty (ta funkce co je nahore v connect v te prvni zavorce: connect()())
//argument state prisutupuje do store, ten je zpristupnen diky hlavni Provider komponente v app.js
const mapStateToProps = (state) => {
   
    return {       //nepouzijeme array ze store (state.expenses), ale az vyfiltrovane a serazene array z funkce selectExpenses ze slozky selectors
        expenses: selectExpenses(state.expenses, state.filters)
        
        
    }
}


export default connect(mapStateToProps)(ExpenseList)



//do mapStateToProps zadam co vsechno ze state ma byt pristupno jako props pro komponentu, pri zmene se to samo rerenderuje