

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
            return state.filter(({id}) => id !== action.id);

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

export default expensesReducer;