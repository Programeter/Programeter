const fetch = require('node-fetch');
require('dotenv').config();

const getRepos = async (user) => {
    const url = `https://api.github.com/users/${user}/repos?per_page=5`;
    const response = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
            authorization: `token ${process.env.GH_PA_TOKEN}`
        },
    });
    const repos = await response.json();
    // console.log(repos);
    return repos;
};

const getLanguages = async (user, repoName) => {
    const url = `https://api.github.com/repos/${user}/${repoName}/languages`; 
    const response = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
            authorization: `token ${process.env.GH_PA_TOKEN}`
        },
    });
    const languageObject = await response.json();
    const languages = await Object.keys(languageObject);
    // console.log(languages);
    return languages;
};

// generates a list of repositories from a user that use  the queried languages
const searchByLanguage = async (user, languageList) => {
    let repoList = [];
    let numberOfRepos = 0;
    let reposCycled = 0;
    const repos = await getRepos(user);
    numberOfRepos = repos.length;
    repos.forEach(async (repo) => {
        reposCycled++;
        const languages = await getLanguages(user, repo.name);
        languages.forEach((language) => {
            if (languageList.find(listLanguage => listLanguage == language) != undefined && repoList.findIndex(listRepo => listRepo.id == repo.id) == -1) {
                repoList.push(repo);
                return;
            }
            if (reposCycled >= numberOfRepos) {
                console.log(repoList);
                return repoList;
            }
        });
    });
};

// getRepos('SlaterMcArdle');
// getLanguages('SlaterMcArdle','Work_Day_Scheduler');
searchByLanguage('SlaterMcArdle', ['JavaScript', 'HTML']);

module.exports = { getRepos, getLanguages, searchByLanguage };
