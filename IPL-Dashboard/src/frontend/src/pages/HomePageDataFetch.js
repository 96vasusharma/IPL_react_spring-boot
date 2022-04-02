import React, { useEffect, useState } from 'react';
import { HomePage } from './HomePage';

/* Data fetch page is to fetch data from api
   and pass it to its corresponding react component  */
export function HomePageDataFetch() {

  /* Loading true is the initial value of this react state */
  const [teams, setTeams] = useState({ loading: true });

  /* Using react hooks
     for events like react component first load */
  useEffect(

    /* first argument is a callback function */
    () => {

      /* Using async to use await for the fetch api */
      const fetchAllTeams = async () => {
        /* Rest call to the BE API via fetch api
           await waits for the operation to complete
        */
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`);
        /* converting to json */
        const data = await response.json();
        /* set api response in react state */
        setTeams(data);
      };

      fetchAllTeams();
    }
    ,
    /* second argument is dependency array
       this helps deciding when to re-trigger effect
       in our case it happens when component loads for the first time */
    []
    );

  /* Loading obj property will be overridden by the response from api */
  if (teams.loading)
    return "Loading....";

  /* if api response is blank */
  if (!teams)
    return <h2>Teams not found</h2>;

  return (
    <div className="HomePageDataFetch">

      <HomePage teams={teams} />

    </div>
  );
}

