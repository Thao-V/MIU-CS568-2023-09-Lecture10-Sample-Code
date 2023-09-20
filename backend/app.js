const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'cs568-2023-09'

app.use(express.json());
app.use(cors());

function auth(req, res, next){
  try {
    if(!req.headers.authorization){
      return res.send({success: false, error: "Please add the header's authorization to the request"});
    }
    const arr = req.headers.authorization.split(" ");
    if(arr.length !== 2){
      return res.send({success: false, error: "Please use the Bearer scheme"})
    }
    const token = arr[1];
    let decoded = jwt.verify(token, PRIVATE_KEY);
    req.email = decoded.email;
    next();
  } catch (error) {
    res.send({success: false, error: "Wrong token"});
  }
}

const users = [{email: "test@miu.edu", password: "123"}]
app.post("/login", (req, res) => {
  const user = req.body;
  console.log(user);
  const found = users.find(x => x.email === user.email && x.password === user.password);
  if(!found){
    return res.send({success: false, message: "Wrong email or password"})
  }
  const token = jwt.sign({email: user.email}, PRIVATE_KEY);
  res.send({ success: true, data: token });
});

//Middleware
app.use(auth);

let db = [];

app.get("/employees", (req, res) => {
  res.send({ success: true, data: db });
});
app.post("/employees", (req, res) => {
  try {
    let data = req.body;
    db.push(data);
    res.send({ success: true });
  } catch (error) {
    console.log(error)
    res.send({ success: false, error: "Server Error" });
  }
});

app.use((req, res, next) => {
  res.send("API is not supported");
});

let PORT = 5001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
