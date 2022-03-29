// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const selBox = searchWrapper.querySelector(".selected-box");
let webLink;

//This array must be changed to array of objects pulled from database
const suggestion = async () => {
    const response = await fetch('/api/languages', {
      method: 'GET'
    });
    const db_AvailableTags = await response.json();
    
    const newSuggestions = await db_AvailableTags.map((tag) => {return {language_name: tag.language_name, id: tag.id};});
    return newSuggestions;
  };

// if user press any key and release
inputBox.onkeyup = async (e)=>{
    const suggestions = await suggestion();
    let userData = e.target.value; //user entered data
    let emptyArray = [];
    if(userData){
        // icon.onclick = () =>{
        //     webLink = `https://www.google.com/search?q=${userData}`;
        //     linkTag.setAttribute("href", webLink);
        //     linkTag.click();
        // };
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.language_name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li value="${data.id}">${data.language_name}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function showSuggestions(list){
    // if(!list.length){
    //     userValue = inputBox.value;
    //     listData = `<li>${userValue}</li>`;
    // }else{
    let listData = list.join('');
    // }
    suggBox.innerHTML = listData;
}

function select(element){
    let language_name = element.textContent;
    let language_id = element.value;
    selBox.classList.add("p-3");
    selBox.innerHTML += `<div class="ml-3"><li class="selected-language" value="${language_id}">${language_name}</li></div>`;
    inputBox.value = null;
    // icon.onclick = ()=>{
    //     webLink = `https://www.google.com/search?q=${selectData}`;
    //     linkTag.setAttribute("href", webLink);
    //     linkTag.click();
    // }
    searchWrapper.classList.remove("active");
}

async function searchByLanguages() {
    const searchArray = [];
    const languageElements = document.querySelectorAll('.selected-language');
    for (let i = 0; i < languageElements.length; i++) {
        searchArray.push(languageElements[i].innerHTML);
    }
    const response = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            languages: searchArray
        }),
    });
    const result = await response.json();
    console.log(result);
} 