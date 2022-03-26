const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector('#user_name').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const github_name = document.querySelector('#github_name').value.trim();
    const answers = document.querySelector('#values').value.trim();
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
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);