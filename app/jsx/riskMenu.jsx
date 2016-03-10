// tutorial10.js
var RiskMenu = React.createClass({
  loadFromServer: function() {
    return FetchGameList(this);
    return null;
  },
  componentDidMount: function() {
    LoadAccount();
    this.loadFromServer();
    setInterval(this.loadFromServer,1000);
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function(){
    return (
      <div className="row">
        <RiskTable data={this.state.data} />
      </div>
    );
  }
});

var JoinGame = React.createClass({
  joinGame: function(event){
    var game = this.props.data;
    console.log('join game!');
    getContract().join(game.id);
  },
  render: function(){
    return (
      <button type="button" className="btn btn-default" onClick={this.joinGame}>Join</button>
    );
  }
});

var StartGame = React.createClass({
  startGame: function(event){
    var game = this.props.data;
    $('#waiting').modal('show');
    getContract().startGame(game.id).then(function() {
      $('#waiting').modal('hide');
      enterGame(game);
    });
  },
  render: function(){
    return (
      <button type="button" className="btn btn-default" onClick={this.startGame}>Start</button>
    );
  }
});

var ContinueGame = React.createClass({
  continueGame: function(event){
    var game = this.props.data;
    ReactDOM.render(
      <RiskBoard />,
      document.getElementById('content')
    );
  },
  render: function(){
    return (
      <button type="button" className="btn btn-default" onClick={this.continueGame}>Continue</button>
    );
  }
});

var RiskTable = React.createClass({
  render: function() {
    var games = this.props.data.map(game => {
      var buttons = [];
      if(game.state === 'CREATED') {
        if(!game.isMember){
          buttons.push(<JoinGame data={game} />);  
        }
        if(game.nbPlayers > 1) {
          buttons.push(<StartGame data={game} />);  
        }
      }
      if(game.state === 'IN_PROGRESS') {
        buttons.push(<ContinueGame data={game} />);
      }

      return (
      <li className="list-group-item">
        <b>Game {game.id}</b> <span className="badge">{game.nbPlayers} out of 4 player(s)</span>
        <div>
        {buttons}  
        </div>
      </li>
      );
    });
    return (
    <ul class="list-group">
        {games}
    </ul>
    );
  }
});

ReactDOM.render(
  <RiskMenu />,
  document.getElementById('content')
);