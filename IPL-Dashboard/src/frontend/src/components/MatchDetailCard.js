import React from 'react';
/* Link is like anchor tag in html */
import {Link} from 'react-router-dom';

export function MatchDetailCard({match, currentTeamName}) {

  /* In case match object is not found in props */
  if(!match)
    return;

  const otherTeam = 
    (currentTeamName === match.team1) ? match.team2 : match.team1;
  
  const otherTeamRoute = "/team/" + otherTeam;

  return (
    <div className="MatchDetailCard">
      <h3>Latest Matches</h3>
      <h1>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h1>
      <h2>{match.date}</h2>
      <h3>{match.venue}</h3>
      <h3>{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
    </div>
  );
}

