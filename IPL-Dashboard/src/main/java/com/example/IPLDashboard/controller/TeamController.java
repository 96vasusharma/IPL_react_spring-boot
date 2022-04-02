package com.example.IPLDashboard.controller;

import java.time.LocalDate;
import java.util.List;

import com.example.IPLDashboard.model.Match;
import com.example.IPLDashboard.model.Team;
import com.example.IPLDashboard.repository.MatchRepository;
import com.example.IPLDashboard.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
// since domain is diff .. react port is 3000 .. spring boot port is 8496
@CrossOrigin
public class TeamController {

    private TeamRepository teamRepository;

    // another way to inject dependency
    @Autowired
    private MatchRepository matchRepository;

    // For single constructor @Autowired is not required for spring 4.3+
    public TeamController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    // team details for a team name (team page)
    @GetMapping("/team/{teamName}")
    public Team getTeamByName(@PathVariable("teamName") String teamName) {

        Team team = teamRepository.findByTeamName(teamName);

        if(team != null) {
            // we need this data from the match table
            team.setLatestMatches(matchRepository.findLatestMatchesByTeamName(teamName, 4));
            return team;
        }
        else {
            return new Team();
        }
    }

    // team's matches for a particular year (match page)
    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeamByYear(@PathVariable("teamName") String teamName,
            @RequestParam("year") int year) {

        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);
        return matchRepository.findByTeamNameBetweenDate(teamName, startDate, endDate);

    }

    // all teams (home page)
    @GetMapping("/team")
    public Iterable<Team> getAllTeams() {

        return teamRepository.findAll();
    }
}
