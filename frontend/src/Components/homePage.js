import React, { useState } from "react";
import { Link } from "react-router-dom";
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
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
        IntervieweeEmail: IntervieweeEmail,
        InterviewerEmail: InterviewerEmail,
        EndTime: EndTime,
        StartTime: StartTime,
        Date: Date,
      };
      console.log(x);
      axios
        .post(`http://localhost:8080/add-interview`, { params: x })
        .then((res) => {
          if (res.data === "OK") {
            alert("New Interview has been successfully added to the schedule");

            // Sending Email to both interviewer and participant using emailjs
            // const templateId = "template_Tw30Kc0N";
            // const messageHtml = `Your interview is scheduled with ${InterviewerEmail} at ${StartTime} to ${EndTime}`;

            // emailjs
            // 	.send("gmail", templateId, {
            // 		interviewer_name: InterviewerEmail, interviewee_name: IntervieweeEmail,
            // 		message_html: messageHtml
            // 	},"user_ao1fjbEs4m4L6RMefAfpI")
            // 	.then((res) => {
            // 		console.log("Email successfully sent!");
            // 	})
            // 	// Handle errors here however you like, or use a React error boundary
            // 	.catch((err) =>
            // 		console.error(
            // 			"Oh well, you failed. Here some thoughts on the error that occured:",
            // 			err
            // 		)
            // 	);

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
      <h3>Please add the details of the Interview.</h3>
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
        <Form.Label>StartTime</Form.Label>
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

      <button onClick={() => handleButtonClicked()}>Submit</button>
    </div>
  );
};

export default Home;
