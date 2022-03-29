// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const selBox = searchWrapper.querySelector(".selected-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
const searchBtn = searchWrapper.querySelector("#searchBtn");
let webLink;

//This array must be changed to array of objects pulled from database
const suggestion = async () => {
    const response = await fetch('/api/languages', {
      method: 'GET'
    });
    const db_AvailableTags = await response.json();
    
    const newSuggestions = await db_AvailableTags.map((tag) => {return tag.language_name;});
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
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
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
    let selectData = element.textContent;
    selBox.classList.add("p-3");
    selBox.innerHTML += `<p class="selected-language ml-3">${selectData}</p>`;
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
    window.location.href = '/search?languages=' + JSON.stringify(searchArray);
} 

searchBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    searchByLanguages();
});



