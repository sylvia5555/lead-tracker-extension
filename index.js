const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const myLeadsFromLS = JSON.parse(localStorage.getItem("myLeads")) //to turn into arr

// inputBtn.classList.remove('disabled');
// if (inputEl.value !== '') {
//     inputBtn.classList.add('disabled');
// }



if (myLeadsFromLS) {
    myLeads = myLeadsFromLS;
    render(myLeads);
}

tabBtn.addEventListener('click', function() {
    // grap the url of the curr tab 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
})

function render(leads) {

    let listItems = [];
    // display the array elements 
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href="${leads[i]}" target="_blank">
                ${leads[i]}
            </a>
        </li>`;
        // const li = document.createElement("li");
        // li.textContent = leads[i];
        // ulEl.append(li);
    }

    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
    if (inputEl.value !== '') {
    myLeads.push(inputEl.value);
    clearInput();

    // saving myLeads arr to the localstorage after converting to string 
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
        
    }

})


deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);

})


function clearInput () {
    inputEl.value = '';
}