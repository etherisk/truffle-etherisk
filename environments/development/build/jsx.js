

// tutorial10.js
"use strict";

var RiskMenu = React.createClass({
  displayName: "RiskMenu",

  loadFromServer: function loadFromServer() {
    return FetchGameList(this);
    return null;
  },
  componentDidMount: function componentDidMount() {
    LoadAccount();
    this.loadFromServer();
    setInterval(this.loadFromServer, 1000);
  },
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(RiskTable, { data: this.state.data })
    );
  }
});

var JoinGame = React.createClass({
  displayName: "JoinGame",

  joinGame: function joinGame(event) {
    var game = this.props.data;
    console.log('join game!');
    getContract().join(game.id);
  },
  render: function render() {
    return React.createElement(
      "button",
      { type: "button", className: "btn btn-default", onClick: this.joinGame },
      "Join"
    );
  }
});

var StartGame = React.createClass({
  displayName: "StartGame",

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
      "button",
      { type: "button", className: "btn btn-default", onClick: this.startGame },
      "Start"
    );
  }
});

var ContinueGame = React.createClass({
  displayName: "ContinueGame",

  continueGame: function continueGame(event) {
    var game = this.props.data;
    ReactDOM.render(React.createElement(RiskBoard, { data: game }), document.getElementById('content'));
  },
  render: function render() {
    return React.createElement(
      "button",
      { type: "button", className: "btn btn-default", onClick: this.continueGame },
      "Continue"
    );
  }
});

var RiskTable = React.createClass({
  displayName: "RiskTable",

  render: function render() {
    var games = this.props.data.map(function (game) {
      var buttons = [];
      if (game.state === 'CREATED') {
        if (!game.isMember) {
          buttons.push(React.createElement(JoinGame, { data: game }));
        }
        if (game.nbPlayers > 1) {
          buttons.push(React.createElement(StartGame, { data: game }));
        }
      }
      if (game.state === 'IN_PROGRESS') {
        buttons.push(React.createElement(ContinueGame, { data: game }));
      }

      return React.createElement(
        "li",
        { className: "list-group-item" },
        React.createElement(
          "b",
          null,
          "Game ",
          game.id
        ),
        " ",
        React.createElement(
          "span",
          { className: "badge" },
          game.nbPlayers,
          " out of 4 player(s)"
        ),
        React.createElement(
          "div",
          null,
          buttons
        )
      );
    });
    return React.createElement(
      "ul",
      { "class": "list-group" },
      games
    );
  }
});

ReactDOM.render(React.createElement(RiskMenu, null), document.getElementById('content'));

"use strict";

var RiskBoard = React.createClass({
  displayName: "RiskBoard",

  loadFromServer: function loadFromServer() {
    var self = this;
    var game = this.props.data;
    getContract().getArmies.call(game.id).then(function (armies) {
      for (var i = 0; i < 16; ++i) {
        $("#army" + i).text(armies[i]);
      }
    });

    getContract().getOwners.call(game.id).then(function (owners) {
      for (var i = 0; i < 16; ++i) {
        $("#country" + i).removeClass();
        $("#country" + i).addClass('col-md-3 ' + self.getColor(owners[i]));
      }
    });
  },
  componentDidMount: function componentDidMount() {
    this.loadFromServer();
    setInterval(this.loadFromServer, 1000);
  },
  getColor: function getColor(id) {
    var t = id % 4;
    switch (t) {
      case 0:
        return 'label-primary';
      case 1:
        return 'label-success';
      case 2:
        return 'label-warning';
      case 3:
        return 'label-info';
    }
  },
  render: function render() {
    var game = this.props.data;
    var rows = [];
    for (var i = 0; i < 4; ++i) {
      var countries = [];
      for (var j = 0; j < 4; ++j) {
        var id = 4 * i + j;
        countries[j] = React.createElement(
          "div",
          { id: 'country' + id, className: "col-md-3" },
          React.createElement("h4", { id: 'army' + id })
        );
      }
      rows.push(React.createElement(
        "div",
        { className: "row" },
        countries
      ));
    }
    return React.createElement(
      "div",
      { className: "row" },
      rows
    );
  }
});