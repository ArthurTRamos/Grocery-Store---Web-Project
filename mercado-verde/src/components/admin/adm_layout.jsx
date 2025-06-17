import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { GetUserById } from '../../services/Fetchs';

const AdmLayout = ({loggedUserId}) => {

    const [loggedUserInfo, setLoggedUserInfo] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const data = await GetUserById(loggedUserId);
            setLoggedUserInfo(data || null);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchUserData();
      }, [loggedUserId]);
    
    if (!loggedUserId || loggedUserInfo.admin === false) {
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