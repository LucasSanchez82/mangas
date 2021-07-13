function defaultModels() {
    // générer le truc par defaut
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const el = data[i];

            let newDiv, htmlLink, htmlName, htmlImage, htmlChapter, name, chapter, deleteModel;
            deleteModel = "<span class='delete'>X</span>"
            name = el.title;
            image = el.image;
            link = el.link;
            chapter = el.actu;
            newDiv = document.querySelector('#container').appendChild(document.createElement('div'))
            newDiv.className += 'model'
            
            htmlName = `<h2 class='title'> ${name} </h2>`;
            htmlImage = `<img class='illustration' src='${image}' alt="${name}" />`;
            htmlChapter = `<input class='chapter' value='${chapter}' type="text">`;
            htmlLink = `<a class='link' href='${link}' target='_blank'> ${htmlName} ${htmlImage} </a>`;
            newDiv.innerHTML = deleteModel + htmlLink + htmlChapter;
        }
        deleteItems();
    });
}

function addModel(name, link, image, chapter){
    let localisation, createDiv, newDiv;
    localisation = document.querySelector('#container');
    createDiv = document.createElement('div');   
    newDiv = localisation.appendChild(createDiv)
    newDiv.className += 'model new-model'
    
    let htmlLink, htmlName, htmlImage, htmlChapter;
    htmlName = `<h2 class='title'> ${name} </h2>`;
    htmlImage = `<img class='illustration' src='${image}' alt="${name}" />`;
    htmlChapter = `<input class='chapter' value=${chapter} type="number">`;
    htmlLink = `<a class='link' href='${link}' target='_blank'> ${htmlName} ${htmlImage} </a>`;
    newDiv.innerHTML = htmlLink + htmlChapter;
}

function everyInputsAreOk(){
    let inputs = document.querySelectorAll('.add-model-input');
    let numberOfOkInput = 0;
    for (let i = 0; i < inputs.length; i++) {
        const el = inputs[i].value;
        if(el == ''){
            console.log('not ok');
        }else{
            console.log('ok');
            numberOfOkInput++
        }
        if(numberOfOkInput === 4) addModel(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
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
        // console.log('title: ', title, '// \\link: ', link, '// \\image: ', image, '// \\chapitre actuelle: ', actu)
    }
    console.log(json)
    let strJson, jsonFinal
    strJson = JSON.stringify(json)
    console.log(strJson)
    jsonFinal = JSON.parse(strJson)
    console.log(jsonFinal)


    
  
    // console.log('ok')

    
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
function deleteItems(){
    let deleteItems = document.querySelectorAll('.delete')
    console.log(deleteItems)
    for (let i = 0; i < deleteItems.length; i++) {
        const el = deleteItems[i];
        el.addEventListener('click', (click) => {
            let elToDel = click.path[1]
            let parentElToDel = elToDel.parentElement
            parentElToDel.removeChild(elToDel)
        })
        
    }

}
defaultModels();

