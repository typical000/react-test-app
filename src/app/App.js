import React from 'react';

import Header from './Header';
import List from '../list/List';

import styles from '../../css/App.css';

class App extends React.Component {
  constructor() {
    super(); // Let us use 'this' from React.Component base class

    this.state = {
      data: [], // Just return empty data if is not fetched
      // --- USED in ListSorting --- Commented for now
      // filter: {
      //   title: false,
      //   text: false
      // }
    };
    // Pre-bind this to handlers
    // this._handleTitleChange = this._handleTitleChange.bind(this);
    // this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
    // this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('STATUS: Mounting application');

    let request = new XMLHttpRequest;
    let requestUrl = this.props.url;

    request.open('GET', requestUrl, true); // Url for json is defined on ReactDOM render

    request.onload = function() {
      if(request.status >= 200 && request.status < 400) {
        this.setState({
          data: JSON.parse(request.responseText)
        });
      } else {
        console.error(requestUrl, status, err.toString());
      }
    }.bind(this);
    request.onerror = function() {
      console.error(requestUrl, status, err.toString());
    }.bind(this);

    request.send();
  }

  render() {
    return (
      <div class="app-example">
        <Header />
        <List data={this.state.data} />
      </div>
    )
  }
};

module.exports = App;
