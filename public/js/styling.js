let form = document.getElementById('form1');
let themeSwitcher = document.getElementById('themeSwitcher');


function init(){
  if(document.cookie && document.cookie==="isDark=true"){
    // clicks the button to dark mode side when dark mode is left on
  themeSwitcher.click()
  }
  
}

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    if (form != null) {
      form.classList.toggle("dark-mode");
    }
    // sets cookie to be either either on dark mode or off
    if(element.classList.contains('dark-mode')){
      document.cookie = "isDark=true"
    } else {
      document.cookie = "isDark=false"
    }
    
  }

  init();