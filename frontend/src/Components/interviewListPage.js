import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
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
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr
              style={{ cursor: "pointer" }}
              key={schedule.id}
              onClick={() => handleClicked(schedule)}
            >
              <td>{schedule.id}</td>
              <td>{schedule.Interviewee_email}</td>
              <td>{schedule.Interviewer_email} </td>
              <td>{schedule.date}</td>
              <td>{schedule.start_time}</td>
              <td>{schedule.end_time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InterviewList;
