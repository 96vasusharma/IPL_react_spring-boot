import React from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export function TeamPage({team}) {

  /* In case team object is not found in props */
  if(!team)
    return;

  return (
    <div className="TeamPage">

      <h1>{team.teamName}</h1>

      {/* send latest match to match detail component */}
      <MatchDetailCard currentTeamName={team.teamName}
        match={team.latestMatches[0]} />

      {/* send latest 3 matches excluding latest, to match small component*/}
      {team.latestMatches.slice(1).map((match, idx) =>
        <MatchSmallCard key={idx}
          currentTeamName={team.teamName}
          match={match} />
      )}

    </div>
  );
}

