const questions = require('questions');
const { Answer, Question, Language } = require('../models');

const generateCompatibility = async (user1Id, user2Id, searchLanguages) => {
    // Variable to track compatibility percentage. Starts at 100 and deducts
    let personal_compatibility_percentage = 100;
    let work_compatibility_percentage = 100;
    let language_compatibility_percentage = 100;
    let personalQuestionWeight = 100 / await Question.count({ where: {'category' : 'personal'}});
    let workQuestionWeight = 100 / await Question.count({ where: {'category' : 'work'}});

    const user1Answers = await Answer.findAll({
        where: {
            user_id: user1Id,
        },
        include: [{
            model: 'question'
        }],
        order: ['question_id', 'ASC'],
    });

    const user2Answers = await Answer.findAll({
        where: {
            user_id: user2Id,
        },
        include: [{
            model: 'question'
        }],
        order: ['question_id', 'ASC'],
    });

    user1Answers.forEach((answer, index) => {
        // const question = questions.find(x => x.id === answer.answers_id);
        // const weight = categories.find(x => x.id === question.category_id);

        if (answer.question.category == 'personal' && answer != user2Answers[index]) {
            personal_compatibility_percentage -= personalQuestionWeight;
        } else if (answer.question.category == 'work' && answer != user2Answers[index]) {
            work_compatibility_percentage -= workQuestionWeight;
        }
    });

    const user2Languages = await User.findByPk(user2Id, {
        include: ['language']
    });

    const languageWeight = searchLanguages.length;

    searchLanguages.forEach( language => {
        if (! user2Languages.search(userLanguage => {language == userLanguage})) {
            language_compatibility_percentage -= languageWeight;
        }
    });
    
    return {
        'personal_compatibility': personal_compatibility_percentage,
        'work_compatibility': work_compatibility_percentage,
        'language_compataibility': language_compatibility_percentage
    };
};