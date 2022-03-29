let form = document.getElementById('form1');


function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    if (form != null) {
      form.classList.toggle("dark-mode");
    }
  }