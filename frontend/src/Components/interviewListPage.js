import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const InterviewList = ({ history }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/view-schedule`).then((res) => {
      const data = res.data.table;
      console.log(data);
      setSchedules(data);
    });
  }, []);

  const handleClicked = (schedule) => {
    history.push({ pathname: "/edit-interview", state: { schedule } });
  };

  const handleDelete = (id) =>{
    axios.post(`http://localhost:8080/delete-interview`, { params: id })
    .then((res)=>{
      if(res.data === "OK"){
        alert("The Interview is deleted");
      }
      else{
        alert(res.data);
      }
    });

    var dummy = schedules.filter((schedule)=>schedule.id !== id);
    setSchedules(dummy);

  }

  return (
    <div>
      <Link to="/"> Home Page </Link>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Interview Id </th>
            <th>Interviewee Email </th>
            <th>Interviewer Email </th>
            <th>Date</th>
            <th>Start time</th>
            <th>End time </th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr
              key={schedule.id}
            >
              <td>{schedule.id}</td>
              <td>{schedule.Interviewee_email}</td>
              <td>{schedule.Interviewer_email} </td>
              <td>{schedule.date}</td>
              <td>{schedule.start_time}</td>
              <td>{schedule.end_time}</td>
              <td><Button onClick={()=>handleDelete(schedule.id)}>Delete</Button>
              <Button onClick={()=>handleClicked(schedule)}>Edit</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InterviewList;
