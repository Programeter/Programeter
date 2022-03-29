const { Option, Question, Language, User, UserAnswer, LanguageLink } = require('../models');

const generateCompatibility = async (user1Id, user2Id, searchLanguages) => {
    // Variable to track compatibility percentage. Starts at 100 and deducts
    let personal_compatibility_percentage = 100;
    let work_compatibility_percentage = 100;
    let language_compatibility_percentage = 100;
    const questions = await Question.findAll();
    // generate a percentage amount for the questions by category
    let personalQuestionWeight = 100 / await Question.count({ where: {'category' : 'personal'}});
    let workQuestionWeight =  100 / await Question.count({ where: {'category' : 'work'}});

    // get the searching user
    const user1 = await User.findByPk(user1Id, {
        include: [
            {
                model: Option, 
                through: UserAnswer, 
                as: 'user_answers' 
            },
            {
                model: Language, 
                through: LanguageLink, 
                as: 'user_languages' 
            }
        ]
    });

    // get just the answers
    const user1Answers = user1.user_answers.map((answer) => {return answer.dataValues;});

    // repeat for the user being searched
    const user2 = await User.findByPk(user2Id, {
        include: [
            {
                model: Option, 
                through: UserAnswer, 
                as: 'user_answers' 
            },
            {
                model: Language, 
                through: LanguageLink, 
                as: 'user_languages' 
            }
        ]
    });

    const user2Answers = user2.user_answers.map((answer) => {return answer.dataValues;});

    // Loop through the answers for user 1 and compare them to user 2. Break the comparisons up into categories.
    // If the two answers don't match, subtract the percentage defined above
    user1Answers.forEach((answer, index) => {
        if (questions[answer.question_id - 1].dataValues.category == 'personal' && answer.value != user2Answers[index].value) {
            personal_compatibility_percentage -= personalQuestionWeight;
        } else if (questions[answer.question_id - 1].dataValues.category == 'work' && answer.value != user2Answers[index].value) {
            work_compatibility_percentage -= workQuestionWeight;
        }
    });

    // get the list of languages the user being searched is familiar with
    const user2Languages = user2.user_languages.map((language) => {return language.dataValues.language_name;});

    // generate a percentage for each language based on the number of languages being searched
    const languageWeight = 100 / searchLanguages.length;
    
    // subtract the defined percentage for each searched language that the user being searched dowsn't know
    searchLanguages.forEach( language => {
        if (user2Languages.find(userLanguage => language == userLanguage) == undefined) {
            language_compatibility_percentage -= languageWeight;
        }
    });

    // return an object containing the three searate compatiblities
    const returnValue =  {
        'personal_compatibility': personal_compatibility_percentage,
        'work_compatibility': work_compatibility_percentage,
        'language_compataibility': language_compatibility_percentage
    };

    // console.log(returnValue);
    return returnValue;
};

module.exports = generateCompatibility;