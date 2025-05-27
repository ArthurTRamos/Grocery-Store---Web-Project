import React, { useState } from 'react';
import { useMemo } from "react";
import ManageUserComponent from './component/ManageUserComponent';
import "./ManageUsers.css";

const ManageUsers = ({users, setUsers, loggedUser}) => {
    const[inputData, setInputData] = useState("");

    const setSearchTerm = (e) => {
        let value = e.target.value;
        setInputData(value);
    }

    const filteredItems = useMemo(() => {
        let filteredData = users.filter( item => {
            const match = item.name.toLowerCase().includes(inputData.toLowerCase());
            return match;

        })

        return filteredData;

    }, [inputData, users]);

    return(
        <>
            <div className='manageUsers-container'>
                <div>
                    <h1>Centro de gerência dos Usuários</h1>
                </div>

                <div className="search-input">

                    <input type="text"
                    placeholder='Digite o nome do usuário a ser buscado'
                    onChange={setSearchTerm}
                    value={inputData}
                    />
                </div>

                <div className='div-table-container'>
                    <table className='table-container'>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th></th>{/* buttons */}
                            </tr>
                        </thead>

                        {filteredItems.map((user) => (
                            <ManageUserComponent key={user.id} individualUser={user} users={users} setUsers={setUsers} loggedUser={loggedUser}/>
                        ))}
            
                    </table>
                </div>
            </div>




        </>
    )
}

export default ManageUsers;