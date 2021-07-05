//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };


    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us6.api.mailchimp.com/3.0/lists/f12ca83020",
        method: "POST",
        headers: {
            "Authorization": "Divya1 4ebe0efd54960f8fe2b12ff2764d20f2-us6"
        },
        body: jsonData
    };

    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/Failure.html");
        }
        else{
            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/Failure.html");
            }
        }
    });
})

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Server started on port 3000');
});

//API key
// 4ebe0efd54960f8fe2b12ff2764d20f2-us6

//List ID
//f12ca83020