const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  user: {type: String, unique: false},
  link: {type: String, unique: false},
  name: {type: String, unique: true},
  avatar: {type: String, unique: false},
  forks: {type: String, unique: false}
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var promises = repos.map((repo) => {
    var repoName = repo.name;
    repoName = new Repo({
      user: repo.owner.login,
      link: repo.html_url,
      name: repo.name,
      avatar: repo.owner.avatar_url,
      forks: repo.forks
    })
     return repoName.save()
  })
  return Promise.all(promises);
}

let get = (callback) => {
  Repo.find((err, repos) => {
    if (err) {
      console.log('error finding')
    } else {
      return repos;
    }
  })
    .limit(25)
    .sort({ forks: -1 })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      console.log('error getting')
      callback(err)
    })
}


module.exports.save = save;
module.exports.get = get;