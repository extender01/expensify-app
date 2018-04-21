import moment from "moment";

//GET VISIBLE EXPENSES

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    //filter na array ktery projde jednotlive expenses a pokud podminkam vyhovuje tak se zapise do noveho vraceneho array,
    
    return expenses.filter((filterItem) => {
        //je true kdyz to neni cislo (takze treba undefined a tim padem to nepouzivame jako filtr a zobrazujeme vsechno) nebo je pres library moment vyhodnoceno datum
        //.isSameOrBefore porovna datum od startDate s datem od createdAtMoment, "day" uvadi porovnani v radu dni (byl to stejny den?)
        const createdAtMoment = moment(filterItem.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true
       
      
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

export default getVisibleExpenses;
