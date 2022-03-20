import React from 'react';
import { MatchSmallCard } from '../components/MatchSmallCard';

export function MatchPage({matches, teamName}) {

  /* In case matches array is not found in props */
  if(!matches)
    return;

    return (
        <div className="MatchPage">

            <h1>Match Page</h1>

            {matches.map((match, idx) =>
                <MatchSmallCard key={idx}
                    currentTeamName={teamName}
                    match={match} />
            )}

        </div>
    );
}

