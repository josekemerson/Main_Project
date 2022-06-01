import React, { useEffect, useState } from "react";
import "../Main/Main.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./editform.css";
import Sidebar from "../Sidebar/Sidebar";

const axios = require("axios");

function Useradmin() {
  let history = useHistory();
  const [users, setUsers] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getCourses() {
    let response = await axios.get("http://localhost:5000/getusers");
    if (response.status === 200) {
      setUsers(response.data.users);
      console.log(response.data.users);
    }
  }
  async function handleBlock(id) {
    let data = {
      userID: id,
    };
    let response = axios
      .post("http://localhost:5000/blockUser", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleDelete(id) {
    let data = {
      userID: id,
    };
    let response = axios
      .post("http://localhost:5000/deleteUser", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleActivate(id) {
    let data = {
      userID: id,
    };
    let response = axios
      .post("http://localhost:5000/activateUser", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCourses();
  }, []);

  const data = {};
  // let button;
  // console.log(users);
  // if(users.status === "active"){
  //         button  = <button
  //         className="btn btn-success"
  //         data-toggle="modal"
  //         data-target="#exampleModal"
  //         onClick={() => {
  //           handleActivate(users._id);
  //         }}
  //       >
  //         Unblock <i className="fa fa-pen"></i>
  //       </button>
  // }else{
  //   button  =   <button
  //   className="btn btn-warning"
  //   onClick={() => {
  //     handleBlock(users._id);
  //   }}
  // >
  //   Block<i className="fa fa-circle"></i>
  // </button>
  // }
  return (
    <div className="d-flex w-100 h-100">
       <Sidebar /> 
      <main>
        <div className="main__container">
          <Table striped bordered hover size="sm" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((u) => {
                  if (u.role !== "admin") {
                    return (
                      <tr>
                        <td>{u.uname}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{u.status}</td>
                        <td>{u.role}</td>
                        <td className="d-flex justify-content-around">
                        
                          {/* <button
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() => {
                              handleActivate(u._id);
                            }}
                          >
                            Unblock <i className="fa fa-pen"></i>
                          </button> */}
                        
              
                                                  
                            {/* <button
                            className="btn btn-warning"
                            onClick={() => {
                              handleBlock(u._id);
                            }}
                          >
                            Block<i className="fa fa-circle"></i>
                          </button> */}

                          {/* {button} */}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(u._id);
                            }}
                          >
                            Delete<i className="fa fa-trash"></i>
                          </button>
                        
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </Table>
        </div>
      </main>
    </div>
  );
}

export default Useradmin;
