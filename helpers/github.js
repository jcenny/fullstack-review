const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'Content-Type' : 'application/vnd.github.v3+json',
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, (err, data)=> {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;