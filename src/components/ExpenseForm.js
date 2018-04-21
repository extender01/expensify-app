import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

const now = moment();
console.log(now.format("MMM Do YYYY"));


export default class ExpenseForm extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
        description: props.expense ? props.expense.description : "",
        note: props.expense ? props.expense.note : "",
        amount: props.expense ? (props.expense.amount / 100).toString() : "",
        createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
        calendarFocused: false,
        error: ""
    };
};
   
   onDescriptionChange = (e) => {
        const descriptionInForm = e.target.value;
        
        this.setState(() => ({description: descriptionInForm}));
   };

   onNoteChange = (e) => {
       const noteInForm = e.target.value;
       this.setState(() => ({note: noteInForm}));
   };

   onAmountChange = (e) => {
       const amountInForm = e.target.value;
       //match zkontruje string pomoci reg.expresion v argumentu (regex101.com)
       if (!amountInForm || amountInForm.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState(() =>({amount: amountInForm}));
    }
   };

   onDateChange = (vytvoreno) => {
        if (vytvoreno) {
            this.setState(() =>({createdAt: vytvoreno}));
        }
   };


   onFocusChange = ({ focused }) => {
       this.setState(() => ({ calendarFocused: focused }))
   };

   onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
        this.setState(() => ({error: "hovno"}));
        
    } else {
        this.setState(() => ({error: ""}));
        //zavolani fce pres props, ktera je v AddExpensePage nebo EditExpensePage komponente
        this.props.onSubmit({
            description: this.state.description,
            amount: parseFloat(this.state.amount, 10) *100,
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note
        })
        
    }
   };


   
   
    render() {
        return (
            <div>
                {this.state.error && <h2>ERROR VOE</h2>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value = {this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                        
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value = {this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}

//value = this.state.description da do toho inputu vychozi hodnotu co je nastavena nahore v objektu state
//onChange vzdy pri nejake zmene inputu (nekdo neco napise) spusti fci ktera pres this.setState zapise do state aktualni hodnotu z inputu