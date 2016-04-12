import React from 'react';
import styles from '../../css/Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.container}>
        <h2 className={styles.title}>
          Test application example
        </h2>
      </header>
    )
  }
};

module.exports = Header;