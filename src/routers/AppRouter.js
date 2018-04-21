import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom"
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";



















const AppRouter = () => (
    <BrowserRouter>
    <div>
        <Header />
        <Switch> {/*switch projede vsecny Route a kdyz najde shodu tak se zastavi a nezkousi dalsi (dat bez path (404) jako posledni) */}
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/edit/:id/" component={EditExpensePage} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </div>
</BrowserRouter>
);

export default AppRouter;

