import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TeamPage } from './TeamPage';

export function TeamPageDataFetch() {

  const [team, setTeam] = useState({ loading: true });
  const { teamName } = useParams();

  useEffect(

    // ===== Alternative in ES6 (previous version of js) ====
    // fetch('http://localhost:8080/team/Rajasthan Royals')
    //   .then(response => response.json())
    //   .then(data => console.log(data));

    () => {

      const fetchTeam = async () => {
        const response = await fetch(`http://localhost:8080/team/${teamName}`);
        const data = await response.json();
        setTeam(data);
      };

      fetchTeam();

    }
    , [teamName]);

  if (team.loading)
    return "Loading....";

  if (team.latestMatches === undefined)
    return <h2>Team not found</h2>;

  return (
    <div className="TeamPageDataFetch">

      <TeamPage team={team} />

    </div>
  );
}

