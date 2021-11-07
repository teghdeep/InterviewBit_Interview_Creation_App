import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import axios from "axios";

const EditPage = ({ history }) => {
  if (!history) {
    history.push("/view-schedule");
  }
  const [id, setid] = useState(
    history.location.state.schedule.id ? history.location.state.schedule.id : ""
  );
  const [IntervieweeEmail, setIntervieweeEmail] = useState(
    history.location.state.schedule.Interviewee_email
      ? history.location.state.schedule.Interviewee_email
      : ""
  );
  const [InterviewerEmail, setInterviewerEmail] = useState(
    history.location.state.schedule.Interviewer_email
      ? history.location.state.schedule.Interviewer_email
      : ""
  );
  const [Date, setDate] = useState(
    history.location.state.schedule.date
      ? history.location.state.schedule.date
      : ""
  );
  const [StartTime, setStartTime] = useState(
    history.location.state.schedule.start_time
      ? history.location.state.schedule.start_time
      : ""
  );
  const [EndTime, setEndTime] = useState(
    history.location.state.schedule.end_time
      ? history.location.state.schedule.end_time
      : ""
  );

  function handleButtonClicked() {
    if (!IntervieweeEmail) {
      alert("Please enter IntervieweeEmail");
    } else if (!InterviewerEmail) {
      alert("Please enter InterviewerEmail");
    } else if (!Date) {
      alert("Please enter Date of the Interview");
    } else if (!StartTime) {
      alert("Please enter start time of the Interview");
    } else if (!EndTime) {
      alert("Please enter End time of the Interview");
    } else {
      var x = {
        id: id,
        IntervieweeEmail: IntervieweeEmail,
        InterviewerEmail: InterviewerEmail,
        EndTime: EndTime,
        StartTime: StartTime,
        Date: Date,
      };
      axios
        .put(`http://localhost:8080/update-interview`, { params: x })
        .then((res) => {
          if (res.data === "OK") {
            setIntervieweeEmail("");
            setInterviewerEmail("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setid("");
            alert("Interview has been successfully updated to the schedule");
            history.push("/view-schedule");
          } else {
            alert(res.data);
          }
        });
    }
  }

  return (
    <div>
      <Link to="/view-schedule"> Interview schedules </Link>
      <h3>Please fill the details you want to change.</h3>
      <Form.Group className="mb-3" controlId="IntervieweeEmail">
        <Form.Label>Interviewee Email </Form.Label>
        <Form.Control
          type="email"
          name="IntervieweeEmail"
          value={IntervieweeEmail}
          placeholder="Enter Interviewee email"
          onChange={(e) => {
            setIntervieweeEmail(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Interviewer Email</Form.Label>
        <Form.Control
          type="email"
          name="InterviewerEmail"
          value={InterviewerEmail}
          placeholder="Enter Interviewer Email"
          onChange={(e) => {
            setInterviewerEmail(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Interviewer Date</Form.Label>
        <Form.Control
          type="email"
          name="Date"
          value={Date}
          placeholder="DD/MM/YY Format"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>StartTime</Form.Label>
        <Form.Control
          type="email"
          name="StartTime"
          value={StartTime}
          placeholder="14:00"
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>EndTime</Form.Label>
        <Form.Control
          type="email"
          name="EndTime"
          value={EndTime}
          placeholder="15:00"
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Please Upload the Resume of Participant</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <button onClick={handleButtonClicked}>Update</button>
    </div>
  );
};

export default EditPage;
