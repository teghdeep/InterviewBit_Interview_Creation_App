import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Home from "./homePage";
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
    history.push({ pathname: "/edit", state: { schedule } });
  };
  return (
    <div>
      <Link to="/"> Home Page </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Interview Id </th>
            <th>Interviewee Email </th>
            <th>Interviewer Email </th>
            <th>Date</th>
            <th> Start time</th>
            <th> End time </th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr
              style={{ cursor: "pointer" }}
              key={schedule.id}
              onClick={() => handleClicked(schedule)}
            >
              <th>{schedule.id}</th>
              <th>{schedule.Interviewee_email}</th>
              <th>{schedule.Interviewer_email} </th>
              <th>{schedule.date}</th>
              <th>{schedule.start_time}</th>
              <th> {schedule.end_time}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewList;
