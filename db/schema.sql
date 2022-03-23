DROP DATABASE IF EXISTS programeter_db;

CREATE DATABASE programeter_db;

USE programeter_db;


--User Table
CREATE TABLE users (
    --USER ID
    user_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    --Users Name
    name_id VARCHAR(30) NOT NULL,
    --User Password
    password_id VARCHAR(30) NOT NULL,
    --Users Known Languages
    languages VARCHAR(100) NOT NULL,
    --User Email
    email VARCHAR(40) NOT NULL
);

--The questions asked to the User
CREATE TABLE questions (
    --Question is given a numbeer
    question_id INTEGER primary key AUTO_INCREMENT,
    --Question itself
    question text,
    --The question is from User
    asked_by_id INTEGER not null,
    FOREIGN KEY (asked_by_id) REFERENCES users(user_id),
);

--The Answers given from the User
CREATE TABLE answers (
    --Answer is given an ID
    answer_id INTEGER NOT NULL,
    --The Users ID is attached to the answer
    answered_by_id INTEGER NOT NULL,
    --The Answer given
    answer TEXT,
    --The Answer given to which question
    answers_id INTEGER,
    PRIMARY KEY (answer_id, answered_by_id),
    FOREIGN KEY (answers_id) REFERENCES questions(question_id)
);

CREATE TABLE knownLanguages (
    --Each language is given an ID
    language_id INTEGER NOT NULL AUTO_INCREMENT,
    --User is given attached Language ID
    user_language INTEGER NOT NULL,
    --Different Languages
    languages_known TEXT,
    FOREIGN KEY (user_language) REFERENCES users(user_id)
);