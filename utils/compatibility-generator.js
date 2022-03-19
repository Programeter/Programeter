const questions = require('questions');
const { Answer, Question, Category, Language } = require('../models');

const generateCompatibility = async (user1Id, user2Id) => {
    const questions =await Question.findAll();

    const user1Answers = await Answer.findAll({
        where: {
            user_id: user1Id,
        },
        order: ['question_id', 'ASC'],
    });

    const user2Answers = await Answer.findAll({
        where: {
            user_id: user2Id,
        },
        order: ['question_id', 'ASC'],
    });



    // Variable to track compatibility percentage. Starts at 100 and deducts
    let compatibility_percentage = 100;
    // Question 1: Tabs or spaces??
    if (user1Answers.answer1 != user2Answers.answer1) { 
        compatibility_percentage -= questions.question1.weight;
    }

    // Question 2: Do you prioritize clean, reliable code or a functioning product?
    if (user1Answers.answer2 != user2Answers.answer2) {
        compatibility_percentage -= questions.question2.weight;
    }

    // Question 3: How do you prefer to test your code?
    if (user1Answers.answer3 != user2Answers.answer3) {
        compatibility_percentage -= questions.question3.weight;
    }

    // Question 4: On a scale of 1 to 5, how much do you comment?
    compatibility_percentage -= Math.abs(user1Answers.answer4 - user2Answers.answer4) * questions.question4.weight;

    // Question 5: What time of day do you work best? (values are between 0 and 2)
    compatibility_percentage -= Math.abs(user1Answers.answer5 - user2Answers.answer5) * questions.question5.weight;

    // Question 6: How do you prefer to receive criticism?
    if (user1Answers.answer6 != user2Answers.answer6) {
        compatibility_percentage -= questions.question6.weight;
    }

    // Question 7: Do you listen to music while you code?
    if (user1Answers.answer7 != user2Answers.answer7) {
        compatibility_percentage -= questions.question7.weight;
    }
};