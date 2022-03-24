import React from 'react';
/* Link is like anchor tag in html */
import {Link} from 'react-router-dom';
import "./MatchDetailCard.scss";

export function MatchDetailCard({match, currentTeamName}) {

  /* In case match object is not found in props */
  if(!match)
    return;

  const otherTeam = 
    (currentTeamName === match.team1) ? match.team2 : match.team1;
  
  const otherTeamRoute = "/team/" + otherTeam;
  const isMatchWon = currentTeamName === match.matchWinner;

  return (
    <div className={isMatchWon ? 'won-card MatchDetailCard' : 'lost-card MatchDetailCard'}>
        <div>
            <span>vs</span>
            <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
            <h2 className="match-date">{match.date}</h2>
            <h3 className="match-venue">at {match.venue}</h3>
            <h3 className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
        </div>

        <div className="additional-details">
            <h3>First Innings</h3>
            <p>{match.team1}</p>
            <h3>Second Innings</h3>
            <p>{match.team2}</p>
            <h3>Man of the match</h3>
            <p>{match.playerOfMatch}</p>
            <h3>Umpires</h3>
            <p>{match.umpire1}, {match.umpire2}</p>

        </div>

    </div>
  );
}

