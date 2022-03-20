import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { MatchPage } from '../pages/MatchPage';

export function MatchPageDataFetch() {

  const [matches, setMatches] = useState({ loading: true });
  /* path param */
  const { teamName} = useParams();

  /* query param */
  const [searchParams, setSearchParams] = useSearchParams();
  const year = searchParams.get("year") ?? 0;

  useEffect(

    () => {

      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8496/team/${teamName}/matches?year=${year}`);
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

