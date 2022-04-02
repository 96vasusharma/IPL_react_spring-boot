import React from 'react';
import {Link} from 'react-router-dom';
import "./Header.scss";
import { GoHome } from 'react-icons/go';

export function Header({matches, teamName, year}) {

    return (
        <div className="Header">
            <div className="home-page-icon">
                <Link to={`/`}>
                    <GoHome size={40} />
                </Link>
            </div>
        </div>
    );
}

