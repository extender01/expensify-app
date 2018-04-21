import { addExpense, editExpense, removeExpense} from "../../actions/expenses";

test("should setup remove expense action object", () => {
    const action = removeExpense({id: "123abc"});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123abc"
    });
});

test("should setup edit expense action object", () => {
    const action = editExpense("123abc", {note: "new note value"});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123abc",
        updates: {
            note: "new note value"
        }
    });
});


test("add expense action object with provided values", () => {
    const expenseData = {
        description: "rent",
        amount: 109500,
        createdAt: 1000,
        note: "This was last rent"
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test("add expense defaults", () => {
    const ExpenseDefault = {
       type: "ADD_EXPENSE",
        expense: {
            description: "",
            amount: 0,
            createdAt: 0,
            note: "",
            id: expect.any(String)
    }};
    
    const action = addExpense();
    expect(action).toEqual(ExpenseData);
});