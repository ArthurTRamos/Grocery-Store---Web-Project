import React from 'react';
import ManageUserComponent from './component/ManageUserComponent';
import "./ManageUsers.css";

const ManageUsers = ({users}) => {


    return(
        <>
            <div className='manageUsers-container'>
                <div>
                    <h1>Centro de gerência dos Usuários</h1>
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

                        {users.map((user) => (
                            <ManageUserComponent user={user}/>
                        ))}
            
                    </table>
                </div>
            </div>




        </>
    )
}

export default ManageUsers;