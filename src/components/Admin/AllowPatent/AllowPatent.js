import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../Main/Main.css";
import Sidebar from "../Sidebar/Sidebar";
const axios = require("axios");

function AllowPatent() {
  const [patentideas, setPatentIdea] = useState(null);
  const token = window.localStorage.getItem("token");
  async function viewMore(id) {
    window.localStorage.setItem("Viewid", id);
  }
  async function getPatentIdeas() {
    let response = await axios.get("http://localhost:5000/getpatentideas");
    if (response.status === 200) {
      setPatentIdea(response.data.message);
    }
  }
  async function handleBlock(id) {
    let data = {
      patentId: id,
    };
    console.log(data);
    let response = axios
      .post("http://localhost:5000/blockpatent", data)
      .then(() => {
        alert("Idea Blocked");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleActivate(id) {
    let data = {
      patentId: id,
    };
    let response = axios
      .post("http://localhost:5000/reactivatepatent", data)
      .then(() => {
        alert("Idea Activated");
   
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPatentIdeas();
  }, []);
  const data = {};
  return (
    <div className="d-flex w-100 h-100">
       <Sidebar /> 
      <main>
        <div className="main__container">
          <Table striped bordered hover size="sm-10">
            <thead>
              <tr>
                <th>Classification</th>
                <th>Date</th>
                <th>Priority Data</th>
                <th>Applicant</th>
                <th>Inventor</th>
                <th>Title</th>
                <th>Abstract</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {patentideas &&
              patentideas.length > 0 &&
              patentideas.map((i) => {
                return (
                  <tbody>
                    <tr>
                      <td>{i.classification}</td>
                      <td>{i.date} </td>
                      <td>{i.priority_data}</td>
                      <td>{i.applicant}</td>
                      <td>{i.inventor}</td>
                      <td>{i.title}</td>
                      <td>{i.abstract}</td>
                      <td>{i.price}</td>
                      <td>{i.status}</td>
                      <td className="d-flex justify-content-around">
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            handleActivate(i._id);
                          }}
                        >
                          Unblock <i className="fa fa-pen"></i>
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            handleBlock(i._id);
                          }}
                        >
                          Block<i className="fa fa-circle"></i>
                        </button>
                      </td>
      
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </div>
      </main>
    </div>
  );
}

export default AllowPatent;
