import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const AdmLayout = () => {

    return(
        <div className="adm_container">

            <div className="AdmContent">
                <Outlet/>
            </div>


        </div>
    )
}

export default AdmLayout;