import React from 'react';
import SideBar from './SideBar';
import { Outlet, useNavigate, Navigate } from "react-router-dom";

const AdmLayout = ({loggedUser}) => {

    console.log(loggedUser);

    if (!loggedUser) {
        return <Navigate to="/" />;
    }

    // loggedUser.admin === false

    return(
        <div className="adm_container">

            <div className="AdmContent">
                <Outlet/>
            </div>


        </div>
    )
}

export default AdmLayout;