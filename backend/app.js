var express = require("express");
const app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "interview_scalar",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL Localhost!");
});
connection.query("USE interview_scalar");

// API to view all the interview schedules
app.get("/view-schedule", function (req, res) {
  var sql = "SELECT * FROM Interviews";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    else res.status(200).send({ table: result });
  });
});

// API to schedule a new interview
app.post("/add-interview", function (req, res) {
  var data = req.body.params;
  var intervieweeEmail = data.IntervieweeEmail;
  var interviewerEmail = data.InterviewerEmail;
  var date = data.Date;
  var startTime = data.StartTime;
  var endTime = data.EndTime;
  var flag = 1;
  var sql1 = "SELECT * FROM Interviewee where  email = ?";
  connection.query(sql1, [intervieweeEmail], function (err, result, fields) {
    if (err) throw err;
    else {
      console.log(result);
      if (result.length === 0) {
        res.send(
          "No Interviewee exist with that email. Please enter the correct email."
        );
      } else {
        connection.query(
          "SELECT * FROM `Interviewer` where `email`= ?",
          [interviewerEmail],
          function (err, result, fields) {
            if (err) throw err;
            else {
              if (result.length === 0) {
                flag = 0;
                res.send(
                  "No Interviewer exist with that email. Please enter the correct email."
                );
              } else {
                var sql =
                  "SELECT * FROM Interviews where (interviewee_email=? or interviewer_email = ?) and date=? and (( end_time > ? and end_time <= ?) or ( start_time >= ? and start_time < ?))";
                var query = connection.query(
                  sql,
                  [
                    intervieweeEmail,
                    interviewerEmail,
                    date,
                    startTime,
                    endTime,
                    startTime,
                    endTime,
                  ],
                  function (err, result, fields) {
                    if (err) throw err;
                    else {
                      console.log(result);
                      if (result.length === 0) {
                        console.log("hi");
                        var sql =
                          "INSERT INTO Interviews (Interviewee_email , Interviewer_email , start_time , end_time , date) VALUES ?";
                        connection.query(
                          sql,
                          [
                            [
                              [
                                intervieweeEmail,
                                interviewerEmail,
                                startTime,
                                endTime,
                                date,
                              ],
                            ],
                          ],
                          function (err, result, fields) {
                            if (err) throw err;
                            else console.log(result);
                          }
                        );
                        res.status(200).send("OK");
                      } else
                        res.send(
                          "The selected time slot is not available. Please choose some other time."
                        );
                    }
                  }
                );
                console.log(query.sql);
              }
            }
          }
        );
      }
    }
  });
});
app.put("/update-interview", function (req, res) {
  console.log(req.body.params);
  var data = req.body.params;
  var id = data.id;
  var intervieweeEmail = data.IntervieweeEmail;
  var interviewerEmail = data.InterviewerEmail;
  var date = data.Date;
  var startTime = data.StartTime;
  var endTime = data.EndTime;
  var flag = 1;
  var sql1 = "SELECT * FROM Interviewee where  email = ?";
  connection.query(sql1, [intervieweeEmail], function (err, result, fields) {
    if (err) throw err;
    else {
      console.log(result);
      if (result.length === 0) {

        res.send(
          "No Interviewee exist with that email. Please enter the correct email."
        );
      } else {
        connection.query(
          "SELECT * FROM `Interviewer` where `email`= ?",
          [interviewerEmail],
          function (err, result, fields) {
            if (err) throw err;
            else {
              if (result.length === 0) {
                flag = 0;
                res.send(
                  "No Interviewer exist with that email. Please enter the correct email."
                );
              } else {
                var sql =
                  "SELECT * FROM Interviews where (interviewee_email=? or interviewer_email = ?) and date=? and (( end_time > ? and end_time <= ?) or (start_time >= ? and start_time < ?))";
                var query = connection.query(
                  sql,
                  [
                    intervieweeEmail,
                    interviewerEmail,
                    date,
                    startTime,
                    endTime,
                    startTime,
                    endTime,
                  ],
                  function (err, result, fields) {
                    if (err) throw err;
                    else {
                      console.log(result);
                      if (result.length === 0) {
                        var sql =
                          "UPDATE Interviews set Interviewee_email =? , Interviewer_email = ? , start_time =?, end_time =? , date =?  where id = ?";
                        connection.query(
                          sql,
                          [
                            intervieweeEmail,
                            interviewerEmail,
                            startTime,
                            endTime,
                            date,
                            id,
                          ],
                          function (err, result, fields) {
                            if (err) throw err;
                            else console.log(result);
                          }
                        );
                        res.status(200).send("OK");
                      } else
                        res.send(
                          "The selected time slot is not available. Please choose some other time."
                        );
                    }
                  }
                );
                console.log(query.sql);
              }
            }
          }
        );
      }
    }
  });
});

// listen to requests at port 8080
app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
