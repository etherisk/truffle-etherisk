

// tutorial10.js
'use strict';

var RiskMenu = React.createClass({
  displayName: 'RiskMenu',

  loadFromServer: function loadFromServer() {
    return FetchGameList(this);
  },
  componentDidMount: function componentDidMount() {
    this.loadFromServer();
    setInterval(this.loadFromServer, 500);
  },
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  render: function render() {
    var games = this.state.data.map(function (game) {
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          game.id
        ),
        React.createElement(
          'td',
          null,
          game.nbPlayers
        )
      );
    });
    return React.createElement(RiskTable, { data: this.state.data });
  }
});

var RiskTable = React.createClass({
  displayName: 'RiskTable',

  render: function render() {
    var games = this.props.data.map(function (game) {
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          game.id
        ),
        React.createElement(
          'td',
          null,
          game.nbPlayers
        )
      );
    });
    return React.createElement(
      'table',
      null,
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            null,
            'Game ID'
          ),
          React.createElement(
            'th',
            null,
            'Number of players'
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        games
      )
    );
  }
});

ReactDOM.render(React.createElement(RiskMenu, null), document.getElementById('content'));