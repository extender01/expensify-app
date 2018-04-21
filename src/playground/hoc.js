import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
    <div>
        <h1>info</h1>
        <p>The info is: {props.info}</p>
    </div>
);


const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        
       <div>
            {props.isAdmin && <p>This is private. Please dont share</p>}
            <WrappedComponent {...props}/>
       </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (

        <div>
                {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>nejsi prihlasen</p>}
                
        </div>

    )
}


const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="ahoj jak se mas" />, document.getElementById("app"));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="ahoj jak se mas" />, document.getElementById("app"));