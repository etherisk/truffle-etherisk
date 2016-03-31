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
    var armies = parseInt(game.armies[id]);
    if(isNaN(armies)) {
      armies = 5;
    }
    return (
      <div key={'country' + id} className={'country label label-' + color}>
          <h4>{armies}</h4>
          <GameMenu amIMember={amIMember} id={id} armies={armies} gameId={game.id}/>
      </div>
    );
  }
});

var GameMenu = React.createClass({
  attack: function(from, to, gameId, armies){
    var result = $('#attack' + from).popover({
      content: '<div class="row center-block">'+ 
      '<div class="btn btn-primary" onclick="attack()">&#x2191;</div>' +
      '</div><div class="row">' + 
      '<div class="btn btn-primary">&#8592;</div>' + 
      '<div class="btn btn-primary">&#x2193;</div>' + 
      '<div class="btn btn-primary">&#x2192;</div></div>',
      html: true
    });
  },
  move: function(from, to, gameId, armies) {
    var result = $('#move' + from).popover({
      content: '<div class="row center-block">'+ 
      '<div class="btn btn-primary" onclick="move()">&#x2191;</div>' +
      '</div><div class="row">' + 
      '<div class="btn btn-primary">&#8592;</div>' + 
      '<div class="btn btn-primary">&#x2193;</div>' + 
      '<div class="btn btn-primary">&#x2192;</div></div>',
      html: true
    });
  },
  reinforcement: function(id) {
    var result = $('#reinforcement' + id).popover({
      content: '<div class="btn btn-primary" onclick="reinforcement()">reinforcement!</div>',
      html: true
    });
  },
  render: function(){
    var id = this.props.id;
    var amIMember = this.props.amIMember;
    var armies = this.props.armies;
    var gameId = this.props.gameId;
    var buttons = amIMember ? (
  <div>   
      <div className="btn btn-default" id={'attack' + id} onClick={this.attack(id,gameId, armies)}>attack</div>
      <div className="btn btn-default" id={'move' + id} onClick={this.move(id, gameId, armies)}>move</div>
      <div className="btn btn-default" id={'reinforcement' + id} onClick={this.reinforcement(id)}>reinforcement</div>
  </div>) : (<div></div>);
  return (
  <div>
    {buttons}
  </div>
  )}
});