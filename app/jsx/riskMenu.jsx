// tutorial10.js
var RiskMenu = React.createClass({
  loadFromServer: function() {
    if(this.mounted) {
      FetchGameList(this);  
    }
  },
  componentDidMount: function() {
    LoadAccount();
    this.mounted = true;
    this.loadFromServer();
    setInterval(this.loadFromServer,1000);
  },
  getInitialState: function() {
    return {data: []};
  },
  componentWillUnmount: function() {
    this.mounted = false;
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
    $('#waiting').modal('show');
    getContract().join(game.id).then(function(){
      $('#waiting').modal('hide');
    });
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
      <RiskBoard data={game} />,
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
          buttons.push(<JoinGame data={game} key={game.id + 'join'}/>);  
        }
        if(game.nbPlayers > 1) {
          buttons.push(<StartGame data={game} key={game.id + 'start'}/>);  
        }
      }
      if(game.state === 'IN_PROGRESS') {
        buttons.push(<ContinueGame data={game} key={game.id + 'continue'}/>);
      }

      return (
      <li className="list-group-item" key={game.id}>
        <b>Game {game.id}</b> <span className="badge">{game.nbPlayers} out of 4 player(s)</span>
        <div>
        {buttons}  
        </div>
      </li>
      );
    });
    return (
    <ul className="list-group">
        {games}
    </ul>
    );
  }
});

ReactDOM.render(
  <RiskMenu />,
  document.getElementById('content')
);