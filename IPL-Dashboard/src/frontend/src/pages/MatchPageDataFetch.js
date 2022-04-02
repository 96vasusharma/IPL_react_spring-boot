import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { MatchPage } from '../pages/MatchPage';

export function MatchPageDataFetch() {

  const [matches, setMatches] = useState({ loading: true });
  /* path param */
  const {teamName} = useParams();

  /* query param */
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") ?? 0;

  useEffect(

    () => {

      const fetchMatches = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
        const data = await response.json();
        setMatches(data);
      };

      fetchMatches();

    }
    , [teamName, year]);

  if (matches.loading)
    return "Loading....";

  if (matches.length === 0)
    return <h2>Matches/Team not found</h2>;

  return (
    <div className="MatchPageDataFetch">

      <MatchPage matches={matches} teamName={teamName} year={year} />

    </div>
  );
}

