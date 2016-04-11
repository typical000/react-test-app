(() => {

  // Custom event polyfill
  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }
  // Modify custom events
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;


  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
  var CSSTransitionGroup = React.addons.CSSTransitionGroup;

  // Main application
  var App = React.createClass({
    // Initial data
    getInitialState: function() {
      return {
        data: [], // Just return empty data if is not fetched
        filter: {
          title: false,
          text: false
        }
      };
    },
    handleFilterToggle: function(e) {
      // console.log(!this.state.filter[e.detail.filter]);
      this.state.filter[e.detail.filter] = !this.state.filter[e.detail.filter];
      this.setState({
        filter: this.state.filter
      });
    },
    handleItemRemove: function(e) {
      let currentId = e.detail.id;
      let modifiedState = this.state.data.slice(0);

      modifiedState.forEach(function(item, index) {
        if(item.id === currentId) {
          modifiedState.splice(index, 1);
          // break;
        }
      });
      this.setState({
        data: modifiedState
      });
    },
    handleItemSubmit: function(item) {
      let modifiedState = this.state.data.slice(0);
      // modifiedState.unshift(item);
      modifiedState.unshift(item);

      this.setState({
        data: modifiedState
      });
    },
    // Mounting
    componentDidMount: function() {
      // Make a vanilla JS ajax request
      var request = new XMLHttpRequest();
      request.open('GET', this.props.url, true);

      request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
          this.setState({
            data: JSON.parse(request.responseText)
          })
        } else {
          console.error(this.props.url, status, err.toString());
        }
      }.bind(this);
      request.onerror = function() {
        console.error(this.props.url, status, err.toString());
      }.bind(this);
      request.send();

      // Add event listeners for global application
      document.addEventListener('app.removeItem', this.handleItemRemove);
      document.addEventListener('app.toggleFilter', this.handleFilterToggle);
    },

    // componentDidMount: function() {
    //   var request = new XMLHttpRequest();
    //   request.open('GET', this.props.url, true);
    //   request.onload = function() {
    //     if(request.status >= 200 && request.status < 400) {
    //       console.log('Loaded something');
    //       return JSON.parse(request.responseText);
    //     }
    //   }
    //   request.send();
    // },

    // Render by itseld
    render: function() {
      return (
        <div className="app-example">
          <ListUpdater onItemSubmit={this.handleItemSubmit} />
          <ListSorting filter={this.state.filter} />
          <List filter={this.state.filter} data={this.state.data}/>
        </div>
      )
    }
  });

  // List Updater
  var ListUpdater = React.createClass({
    defaultFormState: {
      title: '',
      description: ''
    },

    getInitialState: function() {
      return this.defaultFormState;
    },

    handleTitleChange: function(e) {
      // console.log(this);
      // console.log('Title change!');
      this.setState({
        title: e.target.value
      })
    },
    handleDescriptionChange: function(e) {
      // console.log('Description change!');
      this.setState({
        description: e.target.value
      });
    },
    handleSubmit: function(e) {
      console.log('FORM SUBMIT!');

      e.preventDefault();

      var title = this.state.title.trim();
      var description = this.state.description.trim();
      // if(!title || !description) {
      //   // TODO: Throw validation error
      //   console.error('Empty form');
      //   return;
      // }

      // TODO: Send something via AJAX

      this.props.onItemSubmit({
        title: title,
        description: description,
        id: Math.floor(Math.random() * 1000)
      })

      // Reset view to defaults
      this.setState(this.defaultFormState);
    },

    render: function() {
      return (
        <form className="list-updater" onSubmit={this.handleSubmit}>
          <div className="list-updater_item">
            <input
              type="text"
              className="list-updater_input list-updater_input__title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleTitleChange} />
          </div>
          <div className="list-updater_item">
            <textarea
              className="list-updater_input list-updater_input__descritipon"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleDescriptionChange} />
          </div>
          <div className="list-updater_action">
            <button className="list-updater_btn">
              Publish item
            </button>
          </div>
        </form>
      )
    }
  });

  var ListSorting = React.createClass({
    // getInitialState: function() {
    //   console.log(this);
    //   return {
    //     title: { checked: false },
    //     text: { checked: false }
    //   }
    // },
    handleFilterTitle: function() {
      document.dispatchEvent(new CustomEvent('app.toggleFilter', {
        detail: { filter: 'title' }
      }));
      // this.setState({
      //   title: {
      //     checked: !this.state.title.checked
      //   }
      // });
    },
    handleFilterText: function() {
      document.dispatchEvent(new CustomEvent('app.toggleFilter', {
        detail: { filter: 'text' }
      }));
      // this.setState({
      //   text: {
      //     checked: !this.state.text.checked
      //   }
      // });
    },
    // handleFilter: function(type) {
    //   console.log(this);
    //   console.log(type);
    //   // Bubble global event
    //   // document.dispatchEvent(new CustomEvent('app.toggleFilter', {
    //   //   detail: { filter: type }
    //   // }));
    // },
    // componentWillUpdate: function() {
    //   console.log('UPDATE!');
    // },
    render: function() {
      return (
        <div className="list_sort">
          <label>
            <input type="checkbox" checked={this.props.filter.title} onChange={this.handleFilterTitle} />
            <span>With title</span>
          </label>
          <label>
            <input type="checkbox" checked={this.props.filter.text} onChange={this.handleFilterText} />
            <span>With text</span>
          </label>
        </div>
      )
    }
  });

  // // List
  var List = React.createClass({
    render: function() {
      var self = this;
      var listNodes = this.props.data.map(function(item, index) {
        return (
          <CSSTransitionGroup
            className="item-transition-wrap"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionName="item"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1000}
          >
            <ListItem key={item} itemId={item.id} title={item.title} description={item.description} />
          </CSSTransitionGroup>
        )
      });

      return (
        <div className="list">
          <div className="list_title">Elements list</div>
          <div className="list_content">
            {listNodes}
          </div>
        </div>
      );
    }
  });

            // <ListItem title="Cool Title">Content of item</ListItem>
            // <ListItem title="Foo title">Content of item 2</ListItem>

  var ListItem = React.createClass({
    handleRemove: function() {
      console.log(this);
      // Bubble global event
      document.dispatchEvent(new CustomEvent('app.removeItem', {
        detail: { id: this.props.itemId }
      }));
    },
    render: function() {
      return (
        <div className="item" key={this.props.key} data-item-id={this.props.itemId}>
          <div className="item_header">
            <div className="item_title">
              {this.props.title}
            </div>
            <a href="#" className="item_remove" onClick={this.handleRemove}>Remove</a>
          </div>
          <div className="item_description">
            {this.props.description}
          </div>
        </div>
      )
    }
  });

  // DOM rendering
  var AppDOM = ReactDOM.render(
    // <App data={data} />,
    <App url="data.json" />,
    document.getElementById('app')
  );

})();