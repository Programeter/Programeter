const compatibilityGenerator = require('./compatibility-generator');
const githubHandler = require('./github-handler');
const { User, Language, LanguageLink } = require('../models');

const searchHandler = async (searchUser, languages) => {
    let dbUserData = await User.findAll({
        include: [{
            model: Language,
            through: LanguageLink,
            as: 'user_languages'
        }]
    });
    let users = dbUserData.map((user) => user.get({ plain: true }));
    let possibleUsers = [];
    const numOfUsers = users.length;
    let usersTried1 = 0;
    let usersTried2 = 0;
    let resultsList = [];
    for (let x = 0; x < numOfUsers; x++) {
        usersTried1++;
        if (searchUser == users[x].id) {
            continue;
        }
        const compatibility = await compatibilityGenerator(searchUser, users[x].id, languages);
        if (compatibility.personal_compatibility && compatibility.work_compatibility && compatibility.language_compataibility) {
            const userAndCompat = {
                user: users[x],
                compatibility: compatibility
            };
            possibleUsers.push(userAndCompat);
        }

        if (usersTried1 >= numOfUsers) {
            for (let i = 0; i < possibleUsers.length; i++) {
                usersTried2++;
                const repos = await githubHandler.searchByLanguage(possibleUsers[i].user.github_name, languages);
                const searchResults = {
                    user: possibleUsers[i].user,
                    compatibility: possibleUsers[i].compatibility,
                    repos: repos
                };
                resultsList = resultsList.concat(searchResults);
                if (usersTried2 >= possibleUsers.length) {
                    return resultsList;
                }
            }
        }
    }
};

module.exports = searchHandler;