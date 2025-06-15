import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { GetUserById } from '../../services/Fetchs';

const AdmLayout = ({loggedUserId}) => {

    const [loggedUserInfo, setLoggedUserInfo] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            // setIsLoading(true);
            const data = await GetUserById(loggedUserId);
            setLoggedUserInfo(data || null);
            // setError(null);
          } catch (err) {
            // setError("Falha ao carregar dados do usuário.");
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