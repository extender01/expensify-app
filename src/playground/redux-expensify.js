import { createStore, combineReducers } from "redux";
import uuid from "uuid"

//ACTION GENERATORS ---------------------------------------------------------------------

//ADD EXPENSE
const addExpense = (
    {//destructuring na vice radcich (objekt v argumentu arrow fce)
        description = "", 
        note = "", 
        amount = 0, 
        createdAt = 0
    } = {}
) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
        
    }
});


//REMOVE EXPENSE

const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    expense: {
        id: id
    }
    
});



//EDIT EXPENSE

const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id: id,
    updates: updates

});



//TEXT FILTER

const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text: text
    

})


//SORT BY

const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT",
    sortBy: "amount"
});


//tady jiny zpusob, jen predame type a sortBy uvedeme staticky az v reduceru
const sortByDate = () => ({
    type: "SORT_BY_DATE",
});


//SET START DATE

const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
})

const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate: endDate
})













//=======================================================================================================

//EXPENSES REDUCER
//reducer je ta funkce co neco dela, je to ta co se predava do createStore
//promena pro defaultni state abychom to nemuseli psat v radku kdyz je toho hodne

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [
                ...state,
                action.expense
            ];
        case "REMOVE_EXPENSE":
            //return state.filter((item) => item.id !== action.expense.id); //takhle zapsane normalne, o radek niz destructuring - vim ze v argumentu bude objekt tak muzu pouzit rovnou property id
            return state.filter(({id}) => id !== action.expense.id);

        case "EDIT_EXPENSE":
            
            return state.map((item) => {
                if (item.id === action.id) {
                    return {
                        ...item,                    //spred objektu da vse co je v dosavadnim objektu item
                        ...action.updates           //prida veci z objektu action.updates k vecem z objektu item, kdy se nejake property jmenuji stejne tak je prepise
                    }                               //tohle return vraci novy objekt vznikly sloucenim veci z item a action.updates
                } else {
                    return item
                }
            })
        default:
            return state;
    }

};



//FILTERS REDUCER

const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    
    switch (action.type){
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            } 
        
         case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy: action.sortBy
            }

        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: "date"
            }

        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            }

        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            }
           
        
        default:
            return state;
    }
};


//GET VISIBLE EXPENSES

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    //filter na array ktery projde jednotlive expenses a pokud podminkam vyhovuje tak se zapise do noveho vraceneho array,
    
    return expenses.filter((filterItem) => {
        //je true kdyz to neni cislo (takze treba undefined a tim padem to nepouzivame jako filtr a zobrazujeme vsechno) nebo je to cislo a je to true kdyz je timestamp expense.createdAt vetsi nez startDate
        const startDateMatch = typeof startDate !== "number" || filterItem.createdAt >= startDate;
        const endDateMatch = typeof endDate !== "number" || filterItem.createdAt <=startDate;
       
      
        const textMatch = filterItem.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch
    //seradime pomoci .sort (to vezme array ktery jsme doposud vytvorili a upravi ho)
    }).sort((a, b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1 
        } else if (sortBy === "amount") {
            return a.amount < b.amount ? 1 : -1
        }
    })
};


//STORE CREATION

// misto jednoho reduceru se v createStore funkci zavola funkce combineReducers do ktere se jako argument vlozi objekt toho co se sleduje a ktery reducer to ma na starost...
//vychozim state tedy neni jen [] ale objekt ve kterem je array expenses ulozeno a budou v nem ulozeny dalsi defaultni state z jinych reduceru
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

//provede se vzdycky kdyz je nejaka zmena (hlida zmeny)
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
   console.log(visibleExpenses);
});














//DISPATCH
// v promene je ulozena return value od store.dispatch - a tim je ten action objekt

const expenseOne = store.dispatch(addExpense({ description: "rent", amount: 100, createdAt: 21000}));
const expenseTwo = store.dispatch(addExpense({ description: "kafe", amount: 200, createdAt: 1000}));


//  store.dispatch(removeExpense({id: expenseOne.expense.id}));


// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));

 
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setTextFilter(""));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250)); 
 





const demoState = {
    expenses: [{
        id: "qarfasdf",
        description: "january rent",
        note: "This was final payment",
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: "rent",
        sortBy: "amount", //date or amount
        startDate: undefined,
        endDate: undefined
    }
}