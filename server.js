const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.static('static_files'));
// parse application/json
app.use(bodyParser.json());

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'aks18765@outlook.com',
  from: 'vks18765@gmail.com',
  subject: 'Sending with SendGrid is Fun'
};

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