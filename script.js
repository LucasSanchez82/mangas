function findClickItem() {
    document.querySelector('#container').addEventListener('click', (click) => {
        console.log(click);
        console.log('')
        console.log(click.path[0])

        let items = document.querySelectorAll('.item');
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let numberOfItemInList = i + 1;
            
            if(item === click.path[0]){
                // console.log('✔', numberOfItemInList);
                return numberOfItemInList
            }
        }

    });
};
function createPage() {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            
            document.querySelector('#container').innerHTML += (
                `<div class="item">
                <h2> <a 
                target="_blank"  
                href="${data[i].link}" > 
                ${data[i].title} </a> 
                </h2> 
                <br /> 
                <a 
                target="_blank"  
                href="${data[i].link}" > 
                <img 
                src="${data[i].image}" 
                alt="image de ${data[i].titre}" />    
                </a> 
                <h3>${data[i].actu}</h3>
                </div `)
                // document.querySelector('#container').innerHTML += 'coucou';
            }
        })
        findClickItem();
        console.log('👋numberOfItemInList👋: ', numberOfItemInList)

}
createPage();
// console.log(
//     fetch('data.json').then(response => response.json().then(data => {
//         data[0].actu = '4';
//         console.log(data);
//     }) )
//     )

