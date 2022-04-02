import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TeamPage } from './TeamPage';

/* Data fetch page is to fetch data from api
   and pass it to its corresponding react component  */
export function TeamPageDataFetch() {

  /* Loading true is the initial value of this react state */
  const [team, setTeam] = useState({ loading: true });
  /* useParams give us all the path params , so using destructuring */
  const { teamName } = useParams();

  /* Using react hooks
     for events like react component first load */
  useEffect(

    /*
    ===== Alternative in ES6 (previous version of js) ====
    fetch('http://localhost:8496/team/Rajasthan Royals')
      .then(response => response.json())
      .then(data => console.log(data));
    */

    /* first argument is a callback function */
    () => {

      /* Using async to use await for the fetch api */
      const fetchTeam = async () => {
        /* Rest call to the BE API via fetch api
           await waits for the operation to complete
        */
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`);
        /* converting to json */
        const data = await response.json();
        /* set api response in react state */
        setTeam(data);
      };

      fetchTeam();
    }
    ,
    /* second argument is dependency array
       this helps deciding when to re-trigger effect
       in our case it happens when teamName is changed */
    [teamName]
    );

  /* Loading obj property will be overridden by the response from api */
  if (team.loading)
    return "Loading....";

  /* if api response is blank or doesn't have teamName */
  if (!team || !team.teamName)
    return <h1>Team not found</h1>;

  return (
    <div className="TeamPageDataFetch">

      <TeamPage team={team} />

    </div>
  );
}

