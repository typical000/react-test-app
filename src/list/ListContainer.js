import React from 'react';
import ListItem from './ListItem';
import styles from '../../css/ListContainer.css';

class ListContainer extends React.Component {
  static propTypes = { data: React.PropTypes.array.isRequired };

  render() {
    // Iterate and get all child
    let listNodes = this.props.data.map(function(item, index) {
      return (
        <ListItem key={index} itemID={item.id} title={item.title} description={item.description} />
      )
    });

    return (
      <div className={styles.container}>
        <div className={styles.title}>Elements list</div>
        <div className={styles.content}>
          {listNodes}
        </div>
      </div>
    )
  }
};

module.exports = ListContainer;