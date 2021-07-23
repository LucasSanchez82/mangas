function defaultModels() {
    // générer le truc par defaut
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const el = data[i];

            let  name, chapter, deleteModel;
            deleteModel = "<span class='delete'>X</span>"
            name = el.title;
            image = el.image;
            link = el.link;
            chapter = el.actu;

            structurModel(name, image, link, chapter);
        }
        deleteItems();
    });
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
    htmlImage = `<img class='illustration' src='${image}' alt="${name}" />`;
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
            inputs[0].value = 'undefined';
            inputs[1].value = 'undefined';
            inputs[2].value = 'undefined';
            inputs[3].value = 'undefined';
        }
    };
};

function downloadJson() {
    let json, model, title, link, image, actu;
    model = document.querySelectorAll('.model')
    json = []
    for (let i = 0; i < model.length; i++) {
        let el = model[i];
        title = document.querySelectorAll('.title')[i].innerText;
        link = document.querySelectorAll('.link')[i].href;
        image = document.querySelectorAll('.illustration')[i].src;
        actu = document.querySelectorAll('.chapter')[i].value;
        
        json.push({'title': title, 'link': link, 'image': image, 'actu': actu})
    }
    let strJson, jsonFinal
    strJson = JSON.stringify(json)
    jsonFinal = JSON.parse(strJson)

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
defaultModels();

