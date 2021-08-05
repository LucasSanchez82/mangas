let defaultDatas;
function defaultModels() {
    // génerer le truc par defaut
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
        deleteItems();
    }else{
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
            defaultDatas = data;
            for (let i = 0; i < defaultDatas.length; i++) {
                contentLoop(defaultDatas[i]);
            }
            deleteItems();
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
    deleteItems();
}


function saveChange() {
    let texte = 'sauvegardé 👌';
    createNewDatasSave();
    strJson = JSON.stringify(datasSave);
    localStorage.setItem('theSave', strJson);
    document.querySelector('#pop-up-container').innerHTML = '<p id="pop-up">' + texte + '</p>'
    setTimeout(() => {
        document.querySelector('#pop-up-container').removeChild(document.querySelector('#pop-up'))
    }, 500);
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
            deleteItems();
            inputs[0].value = '';
            inputs[1].value = '';
            inputs[2].value = '';
            inputs[3].value = '';
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
function  deleteItems(){
    let deleteItems = document.querySelectorAll('.delete')
    for (let i = 0; i < deleteItems.length; i++) {
        const el = deleteItems[i];
                      
        el.addEventListener('click', (click) => {
            let confirm = window.confirm('😮 es-tu sur de supprimer ce model ?')
            if(confirm === true) {
                let elToDel = click.path[1]
                let parentElToDel = elToDel.parentElement
                parentElToDel.removeChild(elToDel)
            }            
        })
    }

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

////////////// TESTS ///////////////
/*
function otherSaves(){
    document.querySelector('#otherSaves').innerHTML = ''
    for (let i = 1; i < (localStorage.length - 1)/2; i++) {
        document.querySelector('#otherSaves').innerHTML += `<span> save${i}: ${localStorage.getItem(`save${i}date`)} </span>`;
        
    }
}
let counter = 1;
function saveChange() {
    createNewDatasSave();
    strJson = JSON.stringify(datasSave);
    localStorage.setItem('theSave', strJson);
    localStorage.setItem('save' + counter, strJson)
    localStorage.setItem('save' + counter + 'date', Date())
    otherSaves();
    return counter++
}
otherSaves();
*/
