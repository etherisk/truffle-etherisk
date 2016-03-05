

// tutorial10.js
'use strict';

var RiskMenu = React.createClass({
  displayName: 'RiskMenu',

  componentDidMount: function componentDidMount() {
    FetchGameList(undefined);
  },
  render: function render() {
    var games = undefined.props.data.map(function (game) {
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