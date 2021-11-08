import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
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
      alert("Please enter Interviewee Email");
    } else if (!InterviewerEmail) {
      alert("Please enter Interviewer Email");
    } else if (!Date) {
      alert("Please enter Date of the Interview");
    } else if (!StartTime) {
      alert("Please enter start time of the Interview");
    } else if (!EndTime) {
      alert("Please enter End time of the Interview");
    } else {
      var data = {
        id: id,
        IntervieweeEmail: IntervieweeEmail,
        InterviewerEmail: InterviewerEmail,
        EndTime: EndTime,
        StartTime: StartTime,
        Date: Date,
      };
      axios
        .put(`http://localhost:8080/update-interview`, { params: data })
        .then((res) => {
          if (res.data === "OK") {
            alert("The Interview has been successfully updated according to the schedule");
            setIntervieweeEmail("");
            setInterviewerEmail("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setid("");
            history.push("/view-schedule");
          } else {
            alert(res.data);
          }
        });
    }
  }

  return (
    <div>
      <Link to="/view-schedule"> Interview List </Link>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "50%" }}>
          <Card.Header as="h5">
            Please add the details of the Interview.
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="IntervieweeEmail">
              <Form.Label>Interviewee Email </Form.Label>
              <Form.Control
                type="email"
                name="IntervieweeEmail"
                value={IntervieweeEmail}
                placeholder="Enter interviewee email"
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
                placeholder="Enter interviewer Email"
                onChange={(e) => {
                  setInterviewerEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Interviewer Date</Form.Label>
              <Form.Control
                type="text"
                name="Date"
                value={Date}
                placeholder="DD/MM/YY Format"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                name="StartTime"
                value={StartTime}
                placeholder="14:00"
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="text"
                name="EndTime"
                value={EndTime}
                placeholder="15:00"
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Please Upload the Resume of Interviewee</Form.Label>
              <br />
              <Form.Control type="file" />
            </Form.Group>

            <Button onClick={() => handleButtonClicked()} variant="primary">
              Submit
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditPage;
