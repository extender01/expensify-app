


//TEXT FILTER

export const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text: text
    

})


//SORT BY

export const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT",
    sortBy: "amount"
});


//tady jiny zpusob, jen predame type a sortBy uvedeme staticky az v reduceru
export const sortByDate = () => ({
    type: "SORT_BY_DATE",
});


//SET START DATE

export const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
})

export const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate: endDate
})