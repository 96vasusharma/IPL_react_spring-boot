import React from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';
import "./MatchPage.scss";

export function MatchPage({matches, teamName, year}) {

  /* In case matches array is not found in props */
  if(!matches)
    return;

    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h3> Select Year </h3>
                <YearSelector teamName={teamName}/>
            </div>

            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>

                {matches.map((match) =>
                    <MatchDetailCard key={match.id}
                        currentTeamName={teamName}
                        match={match} />
                )}

            </div>

        </div>
    );
}

