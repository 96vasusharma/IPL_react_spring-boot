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
@CrossOrigin
public class TeamController {

    private TeamRepository teamRepository;

    @Autowired
    private MatchRepository matchRepository;

    // For single constructor @Autowired is not required for spring 4.3+
    public TeamController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeamByName(@PathVariable("teamName") String teamName) {

        Team team = teamRepository.findByTeamName(teamName);
        team.setLatestMatches(matchRepository.findLatestMatchesByTeamName(teamName, 4));

        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeamByYear(@PathVariable("teamName") String teamName,
            @RequestParam("year") int year) {

        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);
        List<Match> matches = matchRepository.findByTeamNameBetweenDate(teamName, startDate, endDate);

        return matches;
    }
}
