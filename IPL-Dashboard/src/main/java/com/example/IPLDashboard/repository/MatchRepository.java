package com.example.IPLDashboard.repository;

import java.time.LocalDate;
import java.util.List;

import com.example.IPLDashboard.model.Match;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MatchRepository extends CrudRepository<Match, Long> {

    // convert to below sql behind the scenes from this method name
    // where team1 = :team or team2 = :team order by date desc + limit 4
    List<Match> findByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

    default List<Match> findLatestMatchesByTeamName(String teamName, int matchCount){
        // for limiting the no. of sql rows returned
        // use pageable from spring
        return findByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, matchCount));
    }

    // for complex queries use @Query annotation
    @Query("from Match where (team1 = :teamName or team2 = :teamName)" 
        + "and date between :startDate and :endDate order by date desc")
    List<Match> findByTeamNameBetweenDate(@Param("teamName") String teamName, 
        @Param("startDate") LocalDate startDate, 
        @Param("endDate") LocalDate endDate);
}
