var RiskBoard = React.createClass({
  loadFromServer: function(){
    var self = this;
    var game = this.props.data;
    Promise.all([getContract().getArmies.call(game.id),getContract().getOwners.call(game.id)]).then(function(result){
      var armies = result[0];
      var owners = result[1];
      game.armies = armies;
      game.owners = owners;
      self.setState({
        data: game
      });
    });
  },
  componentDidMount: function() {
    this.loadFromServer();
    setInterval(this.loadFromServer,1000);
  },
  getColor: function(id) {
    switch (parseInt(id)) {
      case 0 : return 'primary';
      case 1 : return 'success';
      case 2 : return 'warning';
      case 3 : return 'info';
    }
  },
  render: function(){
    var game = this.props.data;
    var rows = [];
    for(var i = 0; i < 4; ++i) {
      var countries = [];
      for(var j = 0;j < 4; ++j) {
        var id = (4*i + j);
        countries.push(
          <Country key={'country' + id} game={game} countryId={id} color={this.getColor(game.owners[id])}/>
        )
      }
      rows.push(<div className="row-game" key={'countryrow' + i}>{countries}</div>);
    }
    return (
      <div className="row">
        {rows}
        <div className="row">
          <div className="well col-md-3">
             <div className={'label-' + this.getColor(game.myPlayerId)}>
                my player color
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Country = React.createClass({
  render: function(){
    var game = this.props.game;
    var id = this.props.countryId;
    var color = this.props.color;
    var amIMember = game.owners[id] == game.myPlayerId;
    var countryStyle = amIMember ? 'btn' : 'label'
    var armies = parseInt(game.armies[id]);
    if(isNaN(armies)) {
      armies = 5;
    }
    return (
      <div key={'country' + id} className={'country label ' + countryStyle + '-' + color}>
          <h4>{armies}</h4>
          <GameMenu amIMember={amIMember}/>
      </div>
    );
  }
});

var GameMenu = React.createClass({
  render: function(){
    var amIMember = this.props.amIMember;
    var buttons = amIMember ? (
  <div>   
      <div className="btn btn-default">attack</div>
      <div className="btn btn-default">move</div>
      <div className="btn btn-default">reinforcement</div>
  </div>) : (<div></div>);
  return (
  <div>
    {buttons}
  </div>
  )}
});