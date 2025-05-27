import React from 'react';
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const ManageUserComponent = ({user}) => {




    return (
        <>
            <tbody>
            <td>
                <div>{user.id}</div>
                </td>

                <td>
                <div>{user.admin ? "Administrador" : "Cliente"}</div>
                </td>
                
                <td>
                <div>{user.name}</div>
                </td>

                <td>
                <div>{user.email}</div>
                </td>

                <td>
                <div>{user.cel}</div>
                </td>
                
                <td>
                <button
                    // onClick={() => handleEditClick(user)}
                >
                    <CiEdit/>
                </button>
                <button
                    // onClick={() => handleDeleteClick(user.id)}
                >
                    <FaTrash/>
                </button>
                </td>


                {/* {filteredUsers.map(user => (
                <tr key={user.id}>
                    {editingUserId === user.id ? (
                    // Versão editável da linha
                    <>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="text"
                            name="nome"
                            required
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            value={editFormData.nome}
                            onChange={handleEditFormChange}
                        />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            value={editFormData.email}
                            onChange={handleEditFormChange}
                        />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <select
                            name="cargo"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            value={editFormData.cargo}
                            onChange={handleEditFormChange}
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Gerente">Gerente</option>
                            <option value="Editor">Editor</option>
                            <option value="Usuário">Usuário</option>
                        </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <select
                            name="status"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            value={editFormData.status}
                            onChange={handleEditFormChange}
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                            onClick={handleEditFormSubmit}
                            className="text-green-600 hover:text-green-900 mr-3"
                        >
                            <Check className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        </td>
                    </>
                    ) : (
                    // Versão não editável da linha
                    <>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.nome}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.cargo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                            {user.status}
                        </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                            onClick={() => handleEditClick(user)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                            <Edit className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => handleDeleteClick(user.id)}
                            className="text-red-600 hover:text-red-900"
                        >
                            <Trash className="h-5 w-5" />
                        </button>
                        </td>
                    </>
                    )}
                </tr>
                ))} */}
            </tbody>
        </>
    )
}

export default ManageUserComponent;