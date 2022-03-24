import React from 'react';
import {Link} from 'react-router-dom';
import "./MatchSmallCard.scss";

export function MatchSmallCard({match, currentTeamName}) {

  /* In case match object is not found in props */
  if(!match)
    return;

  const otherTeam = 
    (currentTeamName === match.team1) ? match.team2 : match.team1;

  const otherTeamRoute = "/team/" + otherTeam;
  const isMatchWon = currentTeamName === match.matchWinner;

  return (
    <div className={isMatchWon ? 'won-card MatchSmallCard' : 'lost-card MatchSmallCard'}>
      <span>vs</span>
      <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
      <p className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</p>
    </div>
  );
}

