import React, { useState } from 'react';
import { useEffect } from "react";

import "./ManageUsers.css";

import ManageUserComponent from './component/ManageUserComponent';
import SideBar from '../SideBar';

import { GetUsers } from '../../../services/Fetchs';

const ManageUsers = () => {
    // State to hold search input value
    const[inputData, setInputData] = useState("");
    // State to track current page in pagination
    const [currentPage, setCurrentPage] = useState(1);
    // State to hold the filtered list of users
    const [filteredItems, setFilteredItems] = useState([]);

    const ITEMS_PER_PAGE = 15; // Number of users per page

    // Update search input value and reset to first page when input changes
    const setSearchTerm = (e) => {
        let value = e.target.value;
        setInputData(value);
        setCurrentPage(1);
    }

    // Fetch users from API once on component mount
    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const data = await GetUsers();
            setFilteredItems(data); // Set full users list initially
        } catch (err) {
            console.error("Error fetching users:", err);
        }
        };

        fetchUsers();
    }, []);

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    // Calculate start and end indexes for current page slice
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Get only the users for the current page
    const currentItems = filteredItems.slice(startIndex, endIndex);

    // Change to specific page number
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // Go to previous page if not on first page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    }

    // Go to next page if not on last page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    }

    return(
        <>
            <div className="admin-container">

                {/* Sidebar navigation component */}
                <SideBar/>

                <div className='manageUsers-container'>

                    {/* Title section */}
                    <div className='div-centro-gerencia'>
                        <h1>Centro de gerência dos Usuários</h1>
                    </div>

                    {/* Search input field */}
                    <div className="search-input">
                        <input type="text"
                        placeholder='Digite o nome do usuário a ser buscado'
                        onChange={setSearchTerm}
                        value={inputData}
                        />
                    </div>

                    {/* Pagination info showing current range and total items */}
                    {currentItems.length > 0 && (
                    <div className="pagination-info">
                        <p>
                        Mostrando {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} de {filteredItems.length} produtos
                        </p>
                    </div>
                    )}

                    {/* Table container for user list */}
                    <div className='div-table-container'>
                        <table className='table-container'>
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th></th>{/* Column for buttons/actions */}
                                </tr>
                            </thead>

                            {/* Render current page users as table rows */}
                            {currentItems.map((user) => (
                                <ManageUserComponent key={user.id} individualUser={user}/>
                            ))}
                
                        </table>
                    </div>

                    {/* Pagination controls: previous, page numbers, next */}
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
