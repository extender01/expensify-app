
import React from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters"
import { DateRangePicker } from "react-dates";

class ExpenseListFilters extends React.Component {
    

    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}));
    }

    render() {
    return (
        <div>
            <input 
                type="text" 
                value={this.props.filtry.text} 
                onChange={(e) => {
                    this.props.dispatch(setTextFilter(e.target.value));
                    
                }} 
            />
            
            <select
                value={this.props.filtry.sortBy}
                onChange={(e) => {
                    if (e.target.value === "date") {
                        this.props.dispatch(sortByDate());
                    } else if (e.target.value === "amount") {
                        this.props.dispatch(sortByAmount());
                    }
                }}
            >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
            <DateRangePicker 
                startDate={this.props.filtry.startDate}
                endDate={this.props.filtry.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={()=> false}
                showClearDates={true}
            />
        </div>
     
    );
}

};

//propojenim komponety s store pres connect se zpristupni dispatch v komponente a muzeme pres ni menit veci ve store
//onChange je event handler aby se nam projevovaly zmeny v inputu; tady kdykoli je zmena v inputu (treba pridane pismenko) tak se spusti dispatch a v redux store se zapise zmena (nova hodnota v inputu)


const mapStateToProps = (state) => {
    console.log(state);
    return {
        filtry: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters);