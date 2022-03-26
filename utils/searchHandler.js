const compatibilityGenerator = require('./compatibility-generator');
const githubHandler = require('./GithubHandler');
const { User } = require('../models');

const searchHandler = async (searchUser, languages) => {
    let users = await User.findAll();
    let possibleUsers = [];
    const numOfUsers = users.length;
    let usersTried1 = 0;
    let usersTried2 = 0;
    let repoList = [];
    for (const x in users) {
        usersTried1++;
        if (searchUser == users[x].dataValues.id) {
            continue;
        }
        const compatibility = await compatibilityGenerator(searchUser, users[x].dataValues.id, languages);
        if (await compatibility.personal_compatibility > 1 && await compatibility.work_compatibility > 1 && await compatibility.language_compataibility > 1) {
            possibleUsers.push(users[x]);
        }
        if (usersTried1 >= numOfUsers) {
            for (const i in possibleUsers) {
                usersTried2++;
                const repos = await githubHandler.searchByLanguage(possibleUsers[i].dataValues.github_name, languages);
                repoList = repoList.concat(repos);
                if (usersTried2 >= possibleUsers.length) {
                    // console.log(repoList);
                    // res.status(200).send(repoList);
                    return repoList;
                }
            }
        }
    }
};

module.exports = searchHandler;