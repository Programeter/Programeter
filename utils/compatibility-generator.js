const questions = require('questions');
const { Answer, Question, Category, Language } = require('../models');

const generateCompatibility = async (user1Id, user2Id) => {
    const questions = await Question.findAll();
    const categories = await Category.findAll();

    // Variable to track compatibility percentage. Starts at 100 and deducts
    let compatibility_percentage = 100;
    
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

    user1Answers.forEach((answer, index) => {
        const question = questions.find(x => x.id === answer.answers_id);
        const weight = categories.find(x => x.id === question.category_id);

        compatibility_percentage -= Math.abs(answer - user2Answers[index]) * weight;
    });
};