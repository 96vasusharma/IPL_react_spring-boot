package com.example.IPLDashboard.data;

import com.example.IPLDashboard.model.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Component
// Run before/after user job is complete
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

//    private final JdbcTemplate jdbcTemplate;

    private final EntityManager em;

    // we can inject either jdbcTemplate or entityManager
    /*@Autowired
    public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }*/

    @Autowired
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;
    }

    /*@Override
    public void afterJob(JobExecution jobExecution) {
        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            jdbcTemplate.query("SELECT team1, team2, date FROM match",
                    (rs, row) ->
                            // ResultSet -> String
                            // creating a string object with the mapper
                            "Team1 = " + rs.getString(1)
                            + " Team2 = " + rs.getString(2)
                            + " Date = " + rs.getDate(3)

            ).forEach(str -> System.out.println(str));
        }
    }*/

    @Override
    // since we are persisting in the DB so use transactional
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            // use match entity from the DB to form team entities
            // and save them in the DB as well

            // teamName -> team .. map
            Map<String, Team> teamsMap = new HashMap<>();

            /*
                To get team details from the matches we have to fire a UNION query
                for both team1 and team2 column

                As there is a possibility
                that a team has always been in team2 in the match data
                Also for number of matches
                we need to consider a team for both team1 and team2 scenarios

                Now JPA doesn't allow UNION query as in SQL
                So we have to query twice.

                em.createQuery is JPQL (JPA query language)
            */

            // query from team1 column for teamName and total matches played
            em.createQuery(
                    "select m.team1, count(*) from Match m group by m.team1",
                        Object[].class
                    )
                    .getResultList()
                    .stream()
                    .map(obj -> new Team((String) obj[0], (long) obj[1]))
                    .forEach(team -> teamsMap.put(team.getTeamName(), team));

            // query for team2 column, here team could already be there in the map
            // (due to team1 call above)
            // so simply mutate the data in map
            em.createQuery("select m.team2, count(*) from Match m group by m.team2",
                    Object[].class)
                    .getResultList()
                    .forEach(obj -> {
                        Team team = teamsMap.get((String) obj[0]);
                        if(team != null){
                            team.setTotalMatches(team.getTotalMatches() + (long) obj[1]);
                        }
                        else{
                            teamsMap.put((String) obj[0], new Team((String) obj[0], (long) obj[1]));
                        }
                    });

            // find number of wins of a team from the match data
            em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner",
                    Object[].class)
                    .getResultList()
                    .forEach(obj -> {
                        Team team = teamsMap.get((String) obj[0]);
                        if(team != null){
                            team.setTotalWins((long) obj[1]);
                        }
                    });

            // save teams in the database
            teamsMap.values()
                    .forEach(em::persist);

            // print them as well
            teamsMap.values()
                    .forEach(System.out::println);
        }
    }
}