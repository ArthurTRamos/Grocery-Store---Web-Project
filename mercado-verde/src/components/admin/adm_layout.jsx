import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { GetUserById } from '../../services/Fetchs';

const AdmLayout = ({ loggedUserId }) => {
    // State to hold information about the logged-in user
    const [loggedUserInfo, setLoggedUserInfo] = useState("");

    // Fetch user data based on loggedUserId whenever it changes
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const data = await GetUserById(loggedUserId);
            setLoggedUserInfo(data || null); // Set user info or null if no data
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchUserData();
      }, [loggedUserId]);
    
    // Redirect to home page if user is not logged in or is not an admin
    if (!loggedUserId || loggedUserInfo.admin === false) {
        return <Navigate to="/" />;
    }

    return(
        <div className="adm_container">
            {/* Wrapper for admin content */}
            <div className="AdmContent">
                {/* Render child routes/components */}
                <Outlet/>
            </div>
        </div>
    )
}

export default AdmLayout;
