DROP DATABASE IF EXISTS programeter_db;

CREATE DATABASE programeter_db;

USE programeter_db;



CREATE TABLE users (
    user_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    user_name VARCHAR(30) NOT NULL,
    github_name VARCHAR(25) NOT NULL,
    password_id VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL
);


CREATE TABLE questions (
    question_id INTEGER primary key AUTO_INCREMENT,
    question text,
    asked_by_id INTEGER not null,
    FOREIGN KEY (asked_by_id) REFERENCES users(user_id)
);


CREATE TABLE answers (
    user_id INTEGER NOT NULL,
    answer_id INTEGER NOT NULL,
    answered_by_id INTEGER NOT NULL,
    answer VARCHAR(50) NOT NULL,
    answers_id INTEGER,
    PRIMARY KEY (answer_id, answered_by_id, answer),
    FOREIGN KEY (answers_id) REFERENCES questions(question_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE knownLanguages (
    language_id INTEGER NOT NULL,
    user_language INTEGER NOT NULL,
    languages_known VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_language) REFERENCES users(user_id)
);

CREATE TABLE useranswers (
    user_id INTEGER NOT NULL,
    answer_id INTEGER NOT NULL,
    answer VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id),
    FOREIGN KEY (answer) REFERENCES answers(answer)
);