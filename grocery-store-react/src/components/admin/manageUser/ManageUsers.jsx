import React from 'react';
import ManageUserComponent from './component/ManageUserComponent';

const ManageUsers = ({users}) => {


    return(
        <>
            <div>
                <div>
                    <h1>Centro de gerência dos Usuários</h1>
                </div>

                <div>
                    <table>
                        <thead>
                            <tr>
                            <th>Tipo</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
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