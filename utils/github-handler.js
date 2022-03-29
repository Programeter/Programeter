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
    // console.log(repos);
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
    // console.log(languages);
    return languages;
};

// generates a list of repositories from a user that use the queried languages
const searchByLanguage = async (user, languageList) => {
    let repoList = [];
    let numberOfRepos = 0;
    let reposCycled = 0;
    const repos = await getRepos(user);
    numberOfRepos = repos.length;
    for (const x in repos) {
        reposCycled++;
        const languages = await getLanguages(user, repos[x].name);
        for(const i in languages) {
            if (languageList.find(listLanguage => listLanguage == languages[i]) != undefined && repoList.findIndex(listRepo => listRepo.id == repos[x].id) == -1) {
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
                continue;
            }
            if (reposCycled >= numberOfRepos) {
                // console.log(repoList);
                return repoList;
            }
        }
    }
};

// getRepos('SlaterMcArdle');
// getLanguages('SlaterMcArdle','Work_Day_Scheduler');
// searchByLanguage('Tkachuk94', ['JavaScript']);

module.exports = { getRepos, getLanguages, searchByLanguage };
