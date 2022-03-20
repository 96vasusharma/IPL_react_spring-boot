package com.example.IPLDashboard.data;

import com.example.IPLDashboard.model.Match;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.sql.DataSource;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    private static final String[] CSV_FIELD_NAMES = new String[]{
            "id","city","date","player_of_match","venue","neutral_venue","team1","team2","toss_winner"
            ,"toss_decision","winner","result","result_margin","eliminator","method","umpire1","umpire2"
    };

    // csv -> MatchInput
    @Bean
    public FlatFileItemReader<MatchInput> reader() {
        return new FlatFileItemReaderBuilder<MatchInput>()
                .name("matchItemReader")
                // data source csv file
                .resource(new ClassPathResource("match-data.csv"))
                .delimited()
                // columns/fields to read
                .names(CSV_FIELD_NAMES)
                // output Java-type to convert to
                .fieldSetMapper(new BeanWrapperFieldSetMapper<MatchInput>() {{
                    setTargetType(MatchInput.class);
                }})
                .linesToSkip(1)
                .build();
    }

    // MatchInput -> Match
    @Bean
    public MatchDataProcessor processor() {
        return new MatchDataProcessor();
    }

    // Match -> DB save
    // jpa by default converts camel case to have under-scores in b/w
    @Bean
    public JdbcBatchItemWriter<Match> writer(DataSource dataSource) {
        return new JdbcBatchItemWriterBuilder<Match>()
                .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
                .sql("INSERT INTO match " +
                        "(id,city,date,player_Of_Match,venue,team1,team2,toss_Winner,toss_Decision,match_Winner,"
                        + "result,result_Margin,eliminator,method,umpire1,umpire2) " +
                        "VALUES (:id,:city,:date,:playerOfMatch,:venue,:team1,:team2,:tossWinner,:tossDecision,:matchWinner,"
                        + ":result,:resultMargin,:eliminator,:method,:umpire1,:umpire2)")
                .dataSource(dataSource)
                .build();
    }

    // job config
    @Bean
    public Job importUserJob(JobCompletionNotificationListener listener, Step step1) {
        return jobBuilderFactory
                .get("importUserJob")
                .incrementer(new RunIdIncrementer())
                .listener(listener) // know when the job is done
                .flow(step1) // just 1 step in flow & then it will end ; can be multiple
                .end()
                .build();
    }

    // step config to inject in job config
    @Bean
    public Step step1(JdbcBatchItemWriter<Match> writer) {
        return stepBuilderFactory
                .get("step1")
                .<MatchInput, Match> chunk(10)
                .reader(reader())
                .processor(processor())
                .writer(writer) // no-idea why it is not the bean like others
                .build();
    }
}