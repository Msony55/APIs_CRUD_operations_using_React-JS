import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";

const accessToken = '5b16a06ecae97431359d1dbc3dfb4b9a89442d7bc89d70203731e2fb0a6aec24' ;
const apiUrl = `https://gorest.co.in/public-api/users`;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-type": "application/json"
}

const Home = () => {
  const [users, setUser] = useState([]);

  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage ] = useState(0);
  const pageCount = page;
  

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`${apiUrl}`,{ params : { page : 1 }});
    setUser(result.data.data);
    setPage(result.data.meta.pagination.pages);
  };
  
  const handelPageClick = ({selected: selectedPage}) => {
    const originalPage = selectedPage + 1;
    axios.get(`${apiUrl}`,{ params : { page : originalPage }})
      .then(function(result) {
        console.log(result.data.data) 
        setUser(result.data.data);
        setPage(result.data.meta.pagination.pages);
    })
  };


  const deleteUser = async id => {
    await axios.delete(`${apiUrl}/${id}`,{ headers })
    .then((response) => {
        alert("Delete user successfully!");
      })
    .catch(err => console.log('err', err));
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table class="table" style={{border: 'collapse', textAlign: 'center'}}>
          <thead>
            <tr>
              <th scope="col" style={{border: '1px solid black'}}>#</th>
              <th scope="col" style={{border: '1px solid black'}}>Name</th>
              <th style={{border: '1px solid black'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" style={{border: '1px solid black'}}>{index + 1}</th>
                <td style={{border: '1px solid black'}}>{user.name}</td>
                <td style={{border: '1px solid black'}}>
                  <Link 
                    class="btn" style={{color: "blue",textDecorationLine: 'underline'}}
                    to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn" style={{color: "blue",textDecorationLine: 'underline'}}
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn" style={{color: "blue",textDecorationLine: 'underline'}}
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className = "paginate-container">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={4}
          disableInitialCallback={ true }
          onPageChange={handelPageClick}
          containerClassName="pagination"
          activeClassName="active"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          pageClassName="page-item"
          breakClassName="page-item"
          nextClassName="page-item"
          previousClassName="page-item"
          previousLabel={"<"}
          nextLabel={">"}
        />
      </div>
    </div>
  );
};

export default Home;
