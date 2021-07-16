import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const accessToken = '5b16a06ecae97431359d1dbc3dfb4b9a89442d7bc89d70203731e2fb0a6aec24' ;
const apiUrl = `https://gorest.co.in/public-api/users`;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-type": "application/json"
}

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    status: ""
  });

  const { name, email, gender, status } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(`${apiUrl}`, user,{ headers });
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5" style={{ marginTop:'10vh'}}>
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg mb-2"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="gender"
              name="gender"
              value={gender}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="status"
              name="status"
              value={status}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
