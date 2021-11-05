import React from 'react';
import {Link} from 'react-router-dom';

export function MatchDetailCard(props) {

  const otherTeam = 
    (props.currentTeamName === props.match.team1) ? props.match.team2 : props.match.team1;
  
  const otherTeamRoute = "/team/" + otherTeam;

  return (
    <div className="MatchDetailCard">
      <h3>Latest Matches</h3>
      <h1>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h1>
      <h2>{props.match.date}</h2>
      <h3>{props.match.venue}</h3>
      <h3>{props.match.matchWinner} won by {props.match.resultMargin} {props.match.result}</h3>
    </div>
  );
}

