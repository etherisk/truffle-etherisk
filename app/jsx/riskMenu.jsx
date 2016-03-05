// tutorial10.js
var RiskMenu = React.createClass({
  loadFromServer: function() {
    return FetchGameList(this);
  },
  componentDidMount: function() {
    this.loadFromServer();
    setInterval(this.loadFromServer, 500);
    
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function(){
    var games = this.state.data.map(game => {
      return (
        <tr><td>{game.id}</td><td>{game.nbPlayers}</td></tr>
      );
    });
    return (
      <RiskTable data={this.state.data} />
    );
  }
});

var RiskTable = React.createClass({
  render: function() {
    var games = this.props.data.map(game => {
      return (
        <tr><td>{game.id}</td><td>{game.nbPlayers}</td></tr>
      );
    });
    return (
      <table>
      <thead>
        <tr><th>Game ID</th><th>Number of players</th></tr>
      </thead>
      <tbody>
        {games}
      </tbody>
      </table>
    );
  }
});


ReactDOM.render(
  <RiskMenu />,
  document.getElementById('content')
);