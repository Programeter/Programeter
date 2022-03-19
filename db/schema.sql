DROP DATABASE IF EXISTS programeter_db;

CREATE DATABASE programeter_db;

USE programeter_db;

CREATE TABLE users  (
    user_id INT NOT NULL AUTO_INCREMEMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
);

CREATE TABLE CATEGORY (
    category_id INTEGER PRIMARY KEY,
    category VARCHAR(40) NOT NULL
);

CREATE TABLE questions (
    question_id INTEGER primary key AUTO_INCREMEMENT,
    question text,
    asked_by_id INTEGER not null,
    category_id INTEGER not null,
    FOREIGN KEY asked_by_id references user(user_id),
    FOREIGN KEY category_id REFERENCES category(category_id)
);

CREATE TABLE Answers (
    answer_id INTEGER NOT NULL,
    answered_by_id INTEGER NOT NULL,
    answer TEXT,
    answer_weight INTEGER,
    PRIMARY KEY (answer_id, answered_by_id),
    FOREIGN KEY answers_id REFERENCES question(question_id),
    FOREIGN KEY answered_by_id REFERENCES user(user_id)
);