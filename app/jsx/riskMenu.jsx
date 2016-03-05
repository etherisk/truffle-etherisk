// tutorial10.js
var RiskMenu = React.createClass({
  componentDidMount: () => {
    FetchGameList(this);
  },
  render: () =>  {
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