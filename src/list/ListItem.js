import React from 'react';
import styles from '../../css/ListItem.css';

class ListItem extends React.Component {
  // Add required props
  static propTypes = {
    itemID: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
  };

  constructor() {
    super();
    // Pre-bind this to handlers
    this._handleRemove = this._handleRemove.bind(this);
  }

  // static propTypes = {
  //   data: React.PropTypes.element.isRequired
  // }

  _handleRemove() {
    console.log('Removing item');
    // TODO: Create remove event
  }

  render() {
    return (
      <div className={styles.container} data-item-id={this.props.itemId}>
        <div className={styles.header}>
          <div className={styles.title}>
            {this.props.title}
          </div>
          <a href="#" className={styles.remove} onClick={this._handleRemove}>
            Remove
          </a>
        </div>
        <div className={styles.description}>
          {this.props.description}
        </div>
      </div>
    )
  }
};

module.exports = ListItem;