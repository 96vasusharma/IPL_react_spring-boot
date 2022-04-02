import React from 'react';
import {Link} from 'react-router-dom';
import "./YearSelector.scss";

export function YearSelector({teamName}) {
    const yearStart = process.env.REACT_APP_DATA_START_YEAR;
    const yearEnd = process.env.REACT_APP_DATA_END_YEAR;
    const years = [];

    for(let i = yearStart; i <= yearEnd; i++) {
        years.push(i);
    }

    return (
        <div className="YearSelector">
            <ul>
                {
                    years.map(year =>
                        <li key={year}>
                            <Link to={`/team/${teamName}/matches?year=${year}`}>
                                {year}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}