const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');

app.use(express.static('static_files'));
// parse application/json
app.use(bodyParser.json());

let template = '';

template = fs.readFileSync('./template.html', 'UTF-8');

//console.log(template);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'aks18765@outlook.com',
  from: 'vks18765@gmail.com',
  subject: 'Sending with SendGrid is Fun'
};

app.get('/template', (req, res) => {
  res.send({template: template})
});

app.post('/template', (req, res) => {
  //console.log(req.body.template);
  template = req.body.template;
  fs.writeFile('template.html', template, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
},(err) => {
  console.log("Error to save template");
});

app.post('/sendMail', (req, res) => {
  console.log('Post Successful');
 console.log(req.body.templateHtml);
  msg.html = req.body.templateHtml;
  sgMail.send(msg).then((success) => {
    res.send("Successful");
    console.log('Mail send Successfully');
  }).catch((err) => {
    res.send(err);
    console.log(err);
  });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});