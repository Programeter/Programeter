// const res = require("express/lib/response");
$(function(){
  fetch('/api/languages', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).then ((db_AvailableTags) => {
    const availableTags = db_AvailableTags.map((tag) => {return tag.language_name;});
    $('#languages').autocomplete({
      source: availableTags,
      multiselect: true
    });
  });
});
  
const signupFormHandler = async (event) => {
  console.log('here');
    event.preventDefault();
  
    const captchaValue = document.querySelector('#captcha_input').value.trim();
    const sendCaptcha = JSON.stringify({ captcha: captchaValue });
    const isValid = await fetch('/verify-captcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: sendCaptcha
    });
    console.log(isValid);

    if (isValid.ok) {
      const user_name = document.querySelector('#user_name').value.trim();
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
      const github_name = document.querySelector('#github_name').value.trim();
      const answerValues = document.getElementsByName("answer");
      const answers = [];
      for (let i = 0; i < answerValues.length; i++) {
        answers.push(answerValues[i].value);
      }
      const languages = [];
      const languageElements = document.querySelectorAll('.selected-language');
      for (let i = 0; i < languageElements.length; i++) {
          languages.push(Number(languageElements[i].value));
      }
      // const answers = document.querySelector('#values').value.trim();
      // const languageValues =  document.querySelectorAll('.ui-autocomplete-multiselect-item');
      // const languages = [];
      // for (let i = 0; i < languageValues.length; i++) {
      //   languages.push(languageValues[i].outerText);
      // }
    
      if (user_name && email && password && github_name && answers && languages) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ 
            user_name: user_name, 
            email: email, 
            password: password, 
            github_name: github_name, 
            answers: answers, 
            languages: languages}),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to sign up.');
        }
      }
    } else {
      location.replace('/signup');
    }
  };

$(document).ready(function() {
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
});