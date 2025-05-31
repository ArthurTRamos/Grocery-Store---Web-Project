import React from 'react';
import { Outlet, Navigate } from "react-router-dom";

const AdmLayout = ({loggedUser}) => {

    console.log(loggedUser);
    
    if (!loggedUser || loggedUser.admin === false) {
        return <Navigate to="/" />;
    }

    return(
        <div className="adm_container">

            <div className="AdmContent">
                <Outlet/>
            </div>


        </div>
    )
}

export default AdmLayout;