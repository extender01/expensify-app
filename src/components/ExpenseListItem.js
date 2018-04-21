import React from "react";

import { Link } from "react-router-dom";

import axios from "axios";

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
        <p>{amount} - {createdAt}</p>
        

    
    

   
    
    </div>
    )};


export default ExpenseListItem;