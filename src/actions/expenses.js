import uuid from "uuid";



//ADD EXPENSE
export const addExpense = (
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

export const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    id: id
    }
    
);



//EDIT EXPENSE

export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id: id,
    updates: updates

});