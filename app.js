const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log("server is running on port 3000");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  var fname = req.body.first;
  var sname = req.body.secound;
  var mail = req.body.email;

  var data = {
    members: [{
      email_address: mail,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        SNAME: sname
      }
    }]
  };
  var jsondata = JSON.stringify(data);


  var url = "https://us21.api.mailchimp.com/3.0/lists/a47e6ef2d2";
  const option = {
    method : "POST",
    auth: "sathish:af0c6e5213fce4703f644e45d06a2a10-us21"
  }
  const request=https.request(url, option, function(response) {

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

// api key
// af0c6e5213fce4703f644e45d06a2a10-us21
