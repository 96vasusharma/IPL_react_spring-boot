package com.example.IPLDashboard.data;

import com.example.IPLDashboard.model.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final EntityManager em;

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
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            Map<String, Team> teamsMap = new HashMap<>();

            em.createQuery("select m.team1, count(*) from Match m group by m.team1",
                    Object[].class)
            .getResultList()
            .forEach(obj -> {
                Team team = new Team();
                team.setTeamName((String) obj[0]);
                team.setTotalMatches((long) obj[1]);

                teamsMap.put(team.getTeamName(), team);
            })
            ;

            em.createQuery("select m.team2, count(*) from Match m group by m.team2",
                    Object[].class)
                    .getResultList()
                    .forEach(obj -> {
                        Team team = teamsMap.get((String) obj[0]);
                        if(team != null){
                            team.setTotalMatches(team.getTotalMatches() + (long) obj[1]);
                        }
                        else{
                            team = new Team();
                            team.setTeamName((String) obj[0]);
                            team.setTotalMatches((long) obj[1]);

                            teamsMap.put(team.getTeamName(), team);
                        }
                    })
            ;

            em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner",
                    Object[].class)
                    .getResultList()
                    .forEach(obj -> {
                        Team team = teamsMap.get((String) obj[0]);
                        if(team != null){
                            team.setTotalWins((long) obj[1]);
                        }
                    })
            ;

            teamsMap.values()
            .forEach(em::persist);

            teamsMap.values()
            .forEach(System.out::println);
        }
    }
}