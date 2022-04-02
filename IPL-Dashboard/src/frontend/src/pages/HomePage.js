import React from 'react';
import { TeamTile } from '../components/TeamTile';
import "./HomePage.scss";

export function HomePage({teams}) {

  /* In case team object is not found in props */
  if(!teams)
    return;

  return (
    <div className="HomePage">

      <div className="header-section">
        <h1 className="app-name">IPL Dashboard</h1>
      </div>

      <div className="teams-section">
        {teams.map(team => <TeamTile key={team.id} teamName={team.teamName} />)}
      </div>

    </div>
  );
}

