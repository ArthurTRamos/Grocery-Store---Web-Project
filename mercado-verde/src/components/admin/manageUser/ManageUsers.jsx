import React, { useState } from 'react';
import { useEffect } from "react";

import "./ManageUsers.css";

import ManageUserComponent from './component/ManageUserComponent';
import SideBar from '../SideBar';

import { GetUsers } from '../../../services/Fetchs';

const ManageUsers = () => {
    const[inputData, setInputData] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredItems, setFilteredItems] = useState([]);

    const ITEMS_PER_PAGE = 15;

    const setSearchTerm = (e) => {
        let value = e.target.value;
        setInputData(value);
        setCurrentPage(1);
    }


    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const data = await GetUsers();
            setFilteredItems(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
        };

        fetchUsers();
    }, []);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentItems = filteredItems.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    }

    return(
        <>
            <div className="admin-container">

                <SideBar/>

                <div className='manageUsers-container'>
                    <div className='div-centro-gerencia'>
                        <h1>Centro de gerência dos Usuários</h1>
                    </div>

                    <div className="search-input">

                        <input type="text"
                        placeholder='Digite o nome do usuário a ser buscado'
                        onChange={setSearchTerm}
                        value={inputData}
                        />
                    </div>

                    {/* Informações da paginação */}
                    {currentItems.length > 0 && (
                    <div className="pagination-info">
                        <p>
                        Mostrando {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} de {filteredItems.length} produtos
                        </p>
                    </div>
                    )}

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

                            {currentItems.map((user) => (
                                <ManageUserComponent key={user.id} individualUser={user}/>
                            ))}
                
                        </table>
                    </div>

                    {totalPages > 1 && (
                    <div className="pagination-controls">
                        <button 
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                        >
                        Anterior
                        </button>
                        
                        <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? "pagination-btn active" : "pagination-btn"}
                            >
                            {index + 1}
                            </button>
                        ))}
                        </div>
                        
                        <button 
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                        >
                        Próximo
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ManageUsers;