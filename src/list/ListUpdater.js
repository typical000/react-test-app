import React from 'react';
import styles from '../../css/ListUpdater.css'; // Just for test, import styles and try to make them like CSS-module

class ListUpdater extends React.Component {
  constructor() {
    super(); // Let us use 'this' from React.Component base class

    this.state = {
      title: "",
      description: ""
    };
    // Pre-bind this to handlers
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  _handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  _handleSubmit(e) {
    e.preventDefault();

    //- TODO: Create submit function
    console.log('Submit!');
  }

  render() {
    return (
      <form className={styles.container} onSubmit={this._handleSubmit}>
        <div className={styles.item}>
          <input
            type="text"
            className={styles.input}
            placeholder="Title"
            value={this.state.title}
            onChange={this._handleTitleChange} />
        </div>
        <div className={styles.item}>
          <textarea
            className={styles.input}
            placeholder="Description"
            value={this.state.description}
            onChange={this._handleDescriptionChange} />
        </div>
        <div className={styles.action}>
          <button className={styles.btn}>
            Publish item
          </button>
        </div>
      </form>
    )
  }
};

module.exports = ListUpdater;