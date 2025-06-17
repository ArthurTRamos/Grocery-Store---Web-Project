// Importing React library
import React from 'react';
// Importing Link component for navigation
import { Link } from "react-router-dom";
// Importing edit icon from react-icons
import { CiEdit } from "react-icons/ci";
// Importing associated CSS styles
import "./ManageUserComponent.css";

// Functional component to display and manage a single user's data in a table row
const ManageUserComponent = ({individualUser}) => {

    return (
        <>
            {/* Table body for a single user row */}
            <tbody>
                {/* User ID */}
                <td>
                    <div>{individualUser._id}</div>
                </td>

                {/* User role (admin or client) */}
                <td>
                    <div>{individualUser.admin ? "Administrador" : "Cliente"}</div>
                </td>
                
                {/* User name */}
                <td>
                    <div>{individualUser.name}</div>
                </td>

                {/* User email */}
                <td>
                    <div>{individualUser.email}</div>
                </td>

                {/* User phone number */}
                <td>
                    <div>{individualUser.cel}</div>
                </td>
                
                {/* Edit profile button with link */}
                <td>
                    <Link to={`edit/profile/${individualUser._id}`}>
                        <button className="icon-button">
                            <CiEdit/>
                        </button>
                    </Link>
                </td>
            </tbody>
        </>
    )
}

// Exporting the component to be used in other parts of the app
export default ManageUserComponent;
