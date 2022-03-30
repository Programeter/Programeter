const fetch = require('node-fetch');
require('dotenv').config();

// search github for the first 5 repos from a particular user
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
    return repos;
};

// get the languages that a particular user's repo contains
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
    return languages;
};

// generates a list of repositories from a user that use the queried languages
const searchByLanguage = async (user, languageList) => {
    let repoList = [];
    let langList = [];
    let numberOfRepos = 0;
    let reposCycled = 0;
    const repos = await getRepos(user);
    numberOfRepos = repos.length;
    for (let x = 0; x < numberOfRepos; x++) {
        const languages = await getLanguages(user, repos[x].name);
        const matching = languages.filter(y => languageList.indexOf(y) !== -1);
        if (matching.length) {
            const repoInfo = {
                repo_name: repos[x].name,
                user: user,
                description: repos[x].description,
                url: repos[x].html_url,
                languages: languages,
                created_at: repos[x].created_at,
                updated_at: repos[x].updated_at
            };
            repoList.push(repoInfo);
        }
    }

    return repoList;
};

module.exports = { getRepos, getLanguages, searchByLanguage };
