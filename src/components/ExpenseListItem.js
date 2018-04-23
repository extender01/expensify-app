import React from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import moment from "moment";
import numeral from "numeral";

const mapStateToProps = (state) => {
    
    return {
        expenses: state.expenses,
        filters: state.filters
    };
};
                          //destructured props
const ExpenseListItem = ({description, amount, createdAt, id}) => {
    //console.log(dispatch);
    const odkaz = "/edit/" + id;
    return (
    
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>{numeral(amount / 100).format("$0,0.00")}
         - 
        {moment(createdAt).format("Do MMMM, YYYY")}
         </p>
        

    
    

   
    
    </div>
    )};


export default ExpenseListItem;