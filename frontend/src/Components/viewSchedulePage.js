import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Form,
  Card,
} from "react-bootstrap";
import axios from "axios";

const ViewSchedule = () => {
    const {id,email}=useParams();
    const [schedule, setSchedule] = useState([]);

    useEffect(()=>{
        axios.post(`http://localhost:8080/view-interview`, { params: id })
        .then((res)=>{
            if(res.status === 200){
                const data = res.data.table;
                console.log(data);
                setSchedule(data);
            }
            else {
                alert(res.data);
            }
        })
    },[])

 

  return (
    <div>{schedule && schedule[0]? <>
    <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "50%" }}>
          <Card.Header as="h5">
            Hello, {email}
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="IntervieweeEmail">
              <Form.Label>Interviewee Email </Form.Label>
              <Form.Control
                type="email"
                name="IntervieweeEmail"
                value={schedule[0].Interviewee_email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Interviewer Email</Form.Label>
              <Form.Control
                type="email"
                name="InterviewerEmail"
                value={schedule[0].Interviewer_email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Interviewer Date</Form.Label>
              <Form.Control
                type="text"
                name="Date"
                value={schedule[0].date}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                name="StartTime"
                value={schedule[0].start_time}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="text"
                name="EndTime"
                value={schedule[0].end_time}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </div>
</>: <>Loading....</>}
          </div>
  );
};

export default ViewSchedule;
