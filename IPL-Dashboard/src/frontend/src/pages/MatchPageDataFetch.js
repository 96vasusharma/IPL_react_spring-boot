import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchPage } from '../pages/MatchPage';

export function MatchPageDataFetch() {

  const [matches, setMatches] = useState({ loading: true });
  const { teamName, year } = useParams();

  useEffect(

    () => {

      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
        const data = await response.json();
        setMatches(data);
      };

      fetchMatches();

    }
    , []);

  if (matches.loading)
    return "Loading....";

  if (matches.length === 0)
    return <h2>Matches/Team not found</h2>;

  return (
    <div className="MatchPageDataFetch">

      <MatchPage matches={matches} teamName={teamName} />

    </div>
  );
}

