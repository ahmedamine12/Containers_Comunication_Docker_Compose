const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {

  const formData = req.body;

  request.post(process.env.toBackend || 'http://app2:3001/submit', { form: formData }, (err, response, body) => {
    if (err) {
      console.error(err);
      res.send('Error submitting form');
    } else {
      console.log(body);
      res.send(body);
    }
  });
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
