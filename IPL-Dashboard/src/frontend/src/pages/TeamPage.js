import React from 'react';
import {Link} from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import './TeamPage.scss';
import { PieChart } from 'react-minimal-pie-chart';

export function TeamPage({team}) {

  /* In case team object is not found in props */
  if(!team)
    return;

  return (
    <div className="TeamPage">

      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>

      <div className="win-loss-section">
        Wins / Losses

        <PieChart
          data={[
            { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
            { title: 'Wins', value: team.totalWins, color: '#4da375' },
          ]}
        />
      </div>

      {/* send latest match to match detail component */}
      <div className="match-detail-section">
          <h3>Latest Matches</h3>
          <MatchDetailCard currentTeamName={team.teamName}
            match={team.latestMatches[0]} />
      </div>

      {/* send latest 3 matches excluding latest, to match small component*/}
      {team.latestMatches.slice(1).map((match, idx) =>
        <MatchSmallCard key={idx}
          currentTeamName={team.teamName}
          match={match} />
      )}

      <div className="more-link">
        <Link to={`/team/${team.teamName}/matches?year=${process.env.REACT_APP_DATA_END_YEAR}`}>More ></Link>
      </div>

    </div>
  );
}

