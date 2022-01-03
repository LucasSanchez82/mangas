let defaultDatas;
function defaultModels() {
    // génerer le model par defaut
    localStorage.setItem('default', true)
    function contentLoop(el) {
            let  name, chapter, deleteModel;
            deleteModel = "<span class='delete'>X</span>"
            name = el.title;
            link = el.link;
            chapter = el.actu;
            image = el.image;
            structurModel(name, image, link, chapter);
    }
        // génerer fetch si ce n'est pas déjà fait, sinon => le réutiliser
    
    if (defaultDatas !== undefined) {
        for (let i = 0; i < defaultDatas.length; i++) {
            contentLoop(defaultDatas[i]);
        }
        deleteAllItems();
    }else{
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
            defaultDatas = data;
            for (let i = 0; i < defaultDatas.length; i++) {
                contentLoop(defaultDatas[i]);
            }
            deleteAllItems();
            return defaultDatas;
        });
    }
}

let datasSave;
function createNewDatasSave() {
    let json, model, title, link, image, actu;
    model = document.querySelectorAll('.model')
    json = []
    for (let i = 0; i < model.length; i++) {
        title = document.querySelectorAll('.title')[i].innerText;
        link = document.querySelectorAll('.link')[i].href;
        image = document.querySelectorAll('.container-image')[i].style.backgroundImage.split('\"')[1];
        actu = document.querySelectorAll('.chapter')[i].value;
        
        json.push({'title': title, 'link': link, 'image': image, 'actu': actu})
    }
    return datasSave = json;
}


function loadSaveModel() {
    localStorage.setItem('default', false)
    let datasStorage = JSON.parse(localStorage.getItem('theSave'))
    for (let i = 0; i < datasStorage.length; i++) {
        const el = datasStorage[i];

        let  name, chapter, deleteModel;
        deleteModel = "<span class='delete'>X</span>"
        name = el.title;
        image = el.image;
        link = el.link;
        chapter = el.actu;

        structurModel(name, image, link, chapter);
    }
    deleteAllItems();
}

function infoBox(txt) {
    let timeToDelete = 2;

    let texte = txt;
    document.querySelector('#pop-up-container').innerHTML += '<p class="pop-up">' + texte + '</p>'
    setTimeout(() => {
        let parentElement, ElementTodelete
        ElementTodelete = document.querySelectorAll('.pop-up')[0]
        parentElement = ElementTodelete.parentElement
        
        parentElement.removeChild(ElementTodelete)
    }, timeToDelete * 1000);
}
function saveChange() {
    createNewDatasSave();
    strJson = JSON.stringify(datasSave);
    localStorage.setItem('theSave', strJson);

    infoBox('sauvegardé 👌')
}


function structurModel(name, image, link, chapter){
    let localisation, createDiv, newDiv, deleteModel;
    deleteModel = "<span class='delete'>X</span>"
    localisation = document.querySelector('#container');
    createDiv = document.createElement('div');   
    newDiv = localisation.appendChild(createDiv)
    newDiv.className += 'model new-model'
    
    let htmlLink, htmlName, htmlImage, htmlChapter;
    htmlName = `<h2 class='title'> ${name} </h2>`;
    htmlImage = `<div class='container-image' style="background-image: url('${image}');"></div>`;
    htmlChapter = `<input class='chapter' value=${chapter} type="number">`;
    htmlLink = `<a class='link' href='${link}' target='_blank'> ${htmlName} ${htmlImage} </a>`;
    newDiv.innerHTML = deleteModel + htmlLink + htmlChapter;
    deleteSpecificItems(newDiv.querySelector('.delete'))
}




function everyInputsAreOk(){
    let inputs = document.querySelectorAll('.add-model-input');
    let numberOfOkInput = 0;
    for (let i = 0; i < inputs.length; i++) {
        const el = inputs[i].value;
        if(el !== ''){
            numberOfOkInput++
        }
        if(numberOfOkInput === 4) {
            structurModel(inputs[0].value, inputs[2].value, inputs[1].value, inputs[3].value); 
            // deleteAllItems();
            inputs[0].value = '';
            inputs[1].value = '';
            inputs[2].value = '';
            inputs[3].value = '';
            infoBox('ajout d\'une box manga👌')
        }
    };
};


function downloadJson() {
    createNewDatasSave();
    let strJson = JSON.stringify(datasSave);

    let a = document.createElement('a');
    a.setAttribute('href', "data:text/plain;charset=utf-8,"+encodeURIComponent(strJson));
    a.setAttribute('download', 'data.json');
    a.click();
}
function searchBar() {
    // Declare variables
    var input, filter, block, a,  i, txtValue;
    block = document.querySelectorAll('.model'); // ✔
    input = document.getElementById('myInput'); // ✔
    filter = input.value.toUpperCase(); // ✔
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < block.length; i++) {
        a = block[i].getElementsByTagName('a')[0]
        txtValue = a.textContent || a.innerText ;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        block[i].style.display = "";
        } else {
        block[i].style.display = "none";
        }
    }
}
function  deleteAllItems(){
    let deleteItems = document.querySelectorAll('.delete')
    for (let i = 0; i < deleteItems.length; i++) {
        const el = deleteItems[i];

        deleteSpecificItems(el)        
    }

}

function deleteSpecificItems(el) {
    el.addEventListener('click', (click) => {
        let confirm = window.confirm('😮 es-tu sur de vouloir supprimer ce model ?')
        if(confirm === true) {
            let elToDel = click.path[1]
            let parentElToDel = elToDel.parentElement
            parentElToDel.removeChild(elToDel)
        }            
    })
}

function clearContainer(){
    document.querySelector('#container').innerHTML = null
}

if(localStorage.getItem('default') != undefined){
    if(localStorage.getItem('default') === "true"){
        document.querySelectorAll('.selectTypeModels')[0].click()
    }else{
        document.querySelectorAll('.selectTypeModels')[1].click()
    }
}
const textarea = document.getElementById("jsonArea");
textarea.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {  
        areaValidate(e);
    }
});
function areaValidate(e) {
    clearContainer()
    let area = JSON.parse(textarea.value);
    for (let i = 0; i < area.length; i++) {
        const el = area[i];

        let  name, chapter, deleteModel;
        deleteModel = "<span class='delete'>X</span>"
        name = el.title;
        image = el.image;
        link = el.link;
        chapter = el.actu;

        structurModel(name, image, link, chapter);
    }
    deleteAllItems();
    document.querySelector("#jsonArea").value = ""
}

function pasteArea() {
    navigator.clipboard.readText().then(text => document.querySelector('textarea').value = text);
}
function copyJson() {
    navigator.clipboard.writeText(
        JSON.stringify( createNewDatasSave() )
    )
    .then(
        success => infoBox('texte copié 👌'), 
        err => console.log("error copying text")
    );
}

