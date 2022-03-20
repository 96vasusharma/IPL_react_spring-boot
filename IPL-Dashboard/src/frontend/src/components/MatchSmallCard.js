import React from 'react';
import {Link} from 'react-router-dom';

export function MatchSmallCard({match, currentTeamName}) {

  /* In case match object is not found in props */
  if(!match)
    return;

  const otherTeam = 
    (currentTeamName === match.team1) ? match.team2 : match.team1;

  const otherTeamRoute = "/team/" + otherTeam;

  return (
    <div className="MatchSmallCard">
      <h3>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h3>
      <p>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
    </div>
  );
}

