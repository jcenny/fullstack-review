import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }


  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: term,
      success: this.getRepos,
      error: () => {
        alert('Username does not exist')
      }
    })
  }

  getRepos() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: (data) => {
        console.log(data)
        this.setState({
          repos: data
        })
      },
      error: () => {
        console.log('error getting data back to client')
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));