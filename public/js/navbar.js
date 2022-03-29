const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const emailinput = document.getElementsByClassName('email-form')[0]
const passwordinput = document.getElementsByClassName('password-form')[0]



toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})