// tutorial10.js
var RiskMenu = React.createClass({
  render: function() {
    var games = this.props.data.map(function(game) {
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
        {requests}
      </tbody>
      </table>
    );
  }
});