import React from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export function TeamPage(props) {

  return (
    <div className="TeamPage">

      <h1>{props.team.teamName}</h1>

      <MatchDetailCard currentTeamName={props.team.teamName}
        match={props.team.latestMatches[0]} />

      {props.team.latestMatches.slice(1).map((match, idx) =>
        <MatchSmallCard key={idx}
          currentTeamName={props.team.teamName}
          match={match} />
      )}

    </div>
  );
}

