import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams} from "react-router-dom";

const accessToken = '5b16a06ecae97431359d1dbc3dfb4b9a89442d7bc89d70203731e2fb0a6aec24' ;
const apiUrl = `https://gorest.co.in/public-api/users`;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-type": "application/json"
}

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    status: ""
  });

  const { name, email, gender, status } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`${apiUrl}/${id}`, user, { headers })
    .then((response) => {
        alert("User update successfully!");
      })
    history.push("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`${apiUrl}/${id}`, { headers });
    setUser(result.data.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder='Id'
              name="id"
              value={id}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail "
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="gender"
              name="gender"
              value={gender}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="status"
              name="status"
              value={status}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
