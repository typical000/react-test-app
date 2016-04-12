import React from 'react';

import ListUpdater from './ListUpdater';
import ListSorting from './ListSorting';
import ListContainer from './ListContainer';

class List extends React.Component {
  render() {
    return (
      <div className="list">
        <ListUpdater />
        <ListSorting />
        { /* TODO: Change passing state as props to children with REDUX or REFLUX */ }
        <ListContainer data={this.props.data} />
      </div>
    )
  }
};

module.exports = List;