const ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'master',
    message: 'auto-commit',
    repo: 'https://github.com/DanEskildsen1234/DanEskildsen1234.github.io',
    dest: "weather-app"
}, (error) => {
    if(error){
        console.log(error);
    }
});