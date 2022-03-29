const compatibilityGenerator = require('./compatibility-generator');
const githubHandler = require('./github-handler');
const { User } = require('../models');

const searchHandler = async (searchUser, languages) => {
    let dbUserData = await User.findAll();
    let users = dbUserData.map((user) => user.get({ plain: true }));
    let possibleUsers = [];
    const numOfUsers = users.length;
    let usersTried1 = 0;
    let usersTried2 = 0;
    let repoList = [];
    for (const x in users) {
        usersTried1++;
        if (searchUser == users[x].id) {
            continue;
        }
        const compatibility = await compatibilityGenerator(searchUser, users[x].id, languages);
        if (compatibility.personal_compatibility && compatibility.work_compatibility && compatibility.language_compataibility) {
            possibleUsers.push(users[x]);
        }
        if (usersTried1 >= numOfUsers) {
            for (const i in possibleUsers) {
                usersTried2++;
                const repos = await githubHandler.searchByLanguage(possibleUsers[i].github_name, languages);
                repoList = repoList.concat(repos);
                if (usersTried2 >= possibleUsers.length) {
                    // console.log(repoList);
                    // res.status(200).send(repoList);
                    const searchResults = {
                        compatibility: compatibility,
                        repos: repoList
                    };
                    return searchResults;
                }
            }
        }
    }
};

module.exports = searchHandler;