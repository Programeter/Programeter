// const res = require("express/lib/response");
$(function(){
  fetch('/api/languages', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).then ((db_AvailableTags) => {
    console.log(db_AvailableTags);
    const availableTags = db_AvailableTags.map((tag) => {return tag.language_name;});
    $('#myAutocompleteMultiple').autocomplete({
      source: availableTags,
      multiselect: true
    });
  });
});
  
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const captchaValue = document.querySelector('#captcha_input').value.trim();
    const isValid = await fetch('/verify-captcha', {
      method: 'GET',
      body: JSON.stringify({ value: captchaValue }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (isValid.message === 'verified') {
      const user_name = document.querySelector('#user_name').value.trim();
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
      const github_name = document.querySelector('#github_name').value.trim();
      const answers = document.getElementsByName("answer");
      const answerValues = [];
      for (const i in answers) {
        answerValues.push(answers[i].value.trim());
      }
      // const answers = document.querySelector('#values').value.trim();
      const languages =  document.querySelector('#languages').value.trim();
    
      if (user_name && email && password && github_name && answers && languages) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ user_name, email, password, github, answers, languages}),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to sign up.');
        }
      }
    } else {
      res.redirect('/signup');
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);