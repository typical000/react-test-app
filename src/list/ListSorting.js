import React from 'react';
import styles from '../../css/ListSorting.css';

class ListSorting extends React.Component {
  // TODO: Describe sorting interactions
  render() {
    return (
      <div className={styles.sort}>
        <label>
          <input type="checkbox" />
          <span>With title</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>With text</span>
        </label>
      </div>
    )
  }
};

module.exports = ListSorting;