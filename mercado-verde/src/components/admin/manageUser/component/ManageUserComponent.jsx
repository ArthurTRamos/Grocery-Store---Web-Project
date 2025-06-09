import React from 'react';
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

import "./ManageUserComponent.css";
import EditProfile from '../editProfileUser/EditProfile';

const ManageUserComponent = ({individualUser}) => {

    return (
        <>
            <tbody>
            <td>
                <div>{individualUser.id}</div>
                </td>

                <td>
                <div>{individualUser.admin ? "Administrador" : "Cliente"}</div>
                </td>
                
                <td>
                <div>{individualUser.name}</div>
                </td>

                <td>
                <div>{individualUser.email}</div>
                </td>

                <td>
                <div>{individualUser.cel}</div>
                </td>
                
                <td>
                <Link to="edit" state={{userToBeEdited: individualUser}}>
                    <button className="icon-button">
                        <CiEdit/>
                    </button>
                </Link>
                </td>
            </tbody>
        </>
    )
}

export default ManageUserComponent;