import React from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';

export function MatchPage(props) {

    return (
        <div className="MatchPage">

            <h1>Match Page</h1>

            {props.matches.map((match, idx) =>
                <MatchDetailCard key={idx}
                    currentTeamName={props.teamName}
                    match={match} />
            )}

        </div>
    );
}

