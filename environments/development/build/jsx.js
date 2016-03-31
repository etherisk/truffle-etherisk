

// tutorial10.js
'use strict';

var RiskMenu = React.createClass({
  displayName: 'RiskMenu',

  loadFromServer: function loadFromServer() {
    if (this.mounted) {
      FetchGameList(this);
    }
  },
  componentDidMount: function componentDidMount() {
    LoadAccount();
    this.mounted = true;
    this.loadFromServer();
    setInterval(this.loadFromServer, 1000);
  },
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentWillUnmount: function componentWillUnmount() {
    this.mounted = false;
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(RiskTable, { data: this.state.data })
    );
  }
});

var JoinGame = React.createClass({
  displayName: 'JoinGame',

  joinGame: function joinGame(event) {
    var game = this.props.data;
    $('#waiting').modal('show');
    getContract().join(game.id).then(function () {
      $('#waiting').modal('hide');
    });
  },
  render: function render() {
    return React.createElement(
      'button',
      { type: 'button', className: 'btn btn-default', onClick: this.joinGame },
      'Join'
    );
  }
});

var StartGame = React.createClass({
  displayName: 'StartGame',

  startGame: function startGame(event) {
    var game = this.props.data;
    $('#waiting').modal('show');
    getContract().startGame(game.id).then(function () {
      $('#waiting').modal('hide');
      enterGame(game);
    });
  },
  render: function render() {
    return React.createElement(
      'button',
      { type: 'button', className: 'btn btn-default', onClick: this.startGame },
      'Start'
    );
  }
});

var ContinueGame = React.createClass({
  displayName: 'ContinueGame',

  continueGame: function continueGame(event) {
    var game = this.props.data;
    ReactDOM.render(React.createElement(RiskBoard, { data: game }), document.getElementById('content'));
  },
  render: function render() {
    return React.createElement(
      'button',
      { type: 'button', className: 'btn btn-default', onClick: this.continueGame },
      'Continue'
    );
  }
});

var RiskTable = React.createClass({
  displayName: 'RiskTable',

  render: function render() {
    var games = this.props.data.map(function (game) {
      var buttons = [];
      if (game.state === 'CREATED') {
        if (!game.isMember) {
          buttons.push(React.createElement(JoinGame, { data: game, key: game.id + 'join' }));
        }
        if (game.nbPlayers > 1) {
          buttons.push(React.createElement(StartGame, { data: game, key: game.id + 'start' }));
        }
      }
      if (game.state === 'IN_PROGRESS') {
        buttons.push(React.createElement(ContinueGame, { data: game, key: game.id + 'continue' }));
      }

      return React.createElement(
        'li',
        { className: 'list-group-item', key: game.id },
        React.createElement(
          'b',
          null,
          'Game ',
          game.id
        ),
        ' ',
        React.createElement(
          'span',
          { className: 'badge' },
          game.nbPlayers,
          ' out of 4 player(s)'
        ),
        React.createElement(
          'div',
          null,
          buttons
        )
      );
    });
    return React.createElement(
      'ul',
      { className: 'list-group' },
      games
    );
  }
});

ReactDOM.render(React.createElement(RiskMenu, null), document.getElementById('content'));

'use strict';

var RiskBoard = React.createClass({
  displayName: 'RiskBoard',

  loadFromServer: function loadFromServer() {
    var self = this;
    var game = this.props.data;
    Promise.all([getContract().getArmies.call(game.id), getContract().getOwners.call(game.id)]).then(function (result) {
      var armies = result[0];
      var owners = result[1];
      game.armies = armies;
      game.owners = owners;
      self.setState({
        data: game
      });
    });
  },
  componentDidMount: function componentDidMount() {
    this.loadFromServer();
    setInterval(this.loadFromServer, 1000);
  },
  getColor: function getColor(id) {
    switch (parseInt(id)) {
      case 0:
        return 'primary';
      case 1:
        return 'success';
      case 2:
        return 'warning';
      case 3:
        return 'info';
    }
  },
  render: function render() {
    var game = this.props.data;
    var rows = [];
    for (var i = 0; i < 4; ++i) {
      var countries = [];
      for (var j = 0; j < 4; ++j) {
        var id = 4 * i + j;
        countries.push(React.createElement(Country, { key: 'country' + id, game: game, countryId: id, color: this.getColor(game.owners[id]) }));
      }
      rows.push(React.createElement(
        'div',
        { className: 'row-game', key: 'countryrow' + i },
        countries
      ));
    }
    return React.createElement(
      'div',
      { className: 'row' },
      rows,
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'well col-md-3' },
          React.createElement(
            'div',
            { className: 'label-' + this.getColor(game.myPlayerId) },
            'my player color'
          )
        )
      )
    );
  }
});

var Country = React.createClass({
  displayName: 'Country',

  render: function render() {
    var game = this.props.game;
    var id = this.props.countryId;
    var color = this.props.color;
    var amIMember = game.owners[id] == game.myPlayerId;
    var armies = parseInt(game.armies[id]);
    if (isNaN(armies)) {
      armies = 5;
    }
    return React.createElement(
      'div',
      { key: 'country' + id, className: 'country label label-' + color },
      React.createElement(
        'h4',
        null,
        armies
      ),
      React.createElement(GameMenu, { amIMember: amIMember, id: id, armies: armies, gameId: game.id })
    );
  }
});

var GameMenu = React.createClass({
  displayName: 'GameMenu',

  attack: function attack(from, to, gameId, armies) {
    var result = $('#attack' + from).popover({
      content: '<div class="row center-block">' + '<div class="btn btn-primary" onclick="attack()">&#x2191;</div>' + '</div><div class="row">' + '<div class="btn btn-primary">&#8592;</div>' + '<div class="btn btn-primary">&#x2193;</div>' + '<div class="btn btn-primary">&#x2192;</div></div>',
      html: true
    });
  },
  move: function move(from, to, gameId, armies) {
    var result = $('#move' + from).popover({
      content: '<div class="row center-block">' + '<div class="btn btn-primary" onclick="move()">&#x2191;</div>' + '</div><div class="row">' + '<div class="btn btn-primary">&#8592;</div>' + '<div class="btn btn-primary">&#x2193;</div>' + '<div class="btn btn-primary">&#x2192;</div></div>',
      html: true
    });
  },
  reinforcement: function reinforcement(id) {
    var result = $('#reinforcement' + id).popover({
      content: '<div class="btn btn-primary" onclick="reinforcement()">reinforcement!</div>',
      html: true
    });
  },
  render: function render() {
    var id = this.props.id;
    var amIMember = this.props.amIMember;
    var armies = this.props.armies;
    var gameId = this.props.gameId;
    var buttons = amIMember ? React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'btn btn-default', id: 'attack' + id, onClick: this.attack(id, gameId, armies) },
        'attack'
      ),
      React.createElement(
        'div',
        { className: 'btn btn-default', id: 'move' + id, onClick: this.move(id, gameId, armies) },
        'move'
      ),
      React.createElement(
        'div',
        { className: 'btn btn-default', id: 'reinforcement' + id, onClick: this.reinforcement(id) },
        'reinforcement'
      )
    ) : React.createElement('div', null);
    return React.createElement(
      'div',
      null,
      buttons
    );
  }
});