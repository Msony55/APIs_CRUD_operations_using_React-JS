import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const accessToken = '5b16a06ecae97431359d1dbc3dfb4b9a89442d7bc89d70203731e2fb0a6aec24' ;
const apiUrl = `https://gorest.co.in/public-api/users`;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-type": "application/json"
}

const ViewUser = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    status: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`${apiUrl}/${id}`,{ headers })
    setUser(res.data.data);
  };
  return (
    <div className="container py-4">
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">id: {user.id}</li>
        <li className="list-group-item">name: {user.name}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">gender: {user.gender}</li>
        <li className="list-group-item">status: {user.status}</li>
      </ul>
    </div>
  );
};

export default ViewUser;
