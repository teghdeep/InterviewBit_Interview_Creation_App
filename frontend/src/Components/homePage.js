import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
} from "react-bootstrap";
import axios from "axios";
import emailjs from "emailjs-com";

const Home = (props) => {
  const [IntervieweeEmail, setIntervieweeEmail] = useState(
    props.IntervieweeEmail
  );
  const [InterviewerEmail, setInterviewerEmail] = useState(
    props.InterviewerEmail
  );
  const [Date, setDate] = useState(props.Date);
  const [StartTime, setStartTime] = useState(props.StartTime);
  const [EndTime, setEndTime] = useState(props.EndTime);

  const handleButtonClicked = () => {
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
        IntervieweeEmail: IntervieweeEmail,
        InterviewerEmail: InterviewerEmail,
        EndTime: EndTime,
        StartTime: StartTime,
        Date: Date,
      };
      console.log(data);
      axios
        .post(`http://localhost:8080/add-interview`, { params: data })
        .then((res) => {
          if (res.data === "OK") {
            alert("New Interview has been successfully added to the schedule");

            // Sending Email to both interviewer and participant using emailjs
            const templateId = "template_Tw30Kc0N";
            const messageHtml = `Your interview is scheduled with ${InterviewerEmail} at ${StartTime} to ${EndTime}`;

            emailjs
            	.send("gmail", templateId, {
            		interviewer_name: InterviewerEmail, interviewee_name: IntervieweeEmail,
            		message_html: messageHtml
            	},"user_ao1fjbEs4m4L6RMefAfpI")
            	.then((res) => {
            		console.log("Email successfully sent!");
            	})
            	// Handle errors here however you like, or use a React error boundary
            	.catch((err) =>
            		console.error(
            			"Oh well, you failed. Here some thoughts on the error that occured:",
            			err
            		)
            	);

            setIntervieweeEmail("");
            setInterviewerEmail("");
            setDate("");
            setStartTime("");
            setEndTime("");
          } else {
            alert(res.data);
          }
        });
    }
  };

  return (
    <div>
      <Link to="/view-schedule"> Interview schedules </Link>
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
                placeholder="Enter the Date in this DD/MM/YY Format"
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
                placeholder="For example 17:00"
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
                placeholder="For example 18:00"
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

export default Home;
