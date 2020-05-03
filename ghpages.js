const ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'master',
    message: 'auto-commit',
    repo: 'https://github.com/daescoGit/daescoGit.github.io',
    dest: "weather-app"
}, (error) => {
    if(error){
        console.log(error);
    }
});