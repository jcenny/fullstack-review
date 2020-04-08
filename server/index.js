const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js')



app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/repos', function (req, res) {
  var user = Object.keys(req.body);
  github.getReposByUsername(user, (err, data) => {
    if (err) {
      console.log('error getting repos from github')
      res.status(400).send();
    } else {
      var repos = JSON.parse(data.body);
      db.save(repos)
      .then(res.status(200).send())
      .catch(res.status(400).send())
    }
  })
});

app.get('/repos', function (req, res) {
  db.get((err, data) => {
    if (err) {
      res.status(400).send();
    } else {
      res.send(data);
    }
  })
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

