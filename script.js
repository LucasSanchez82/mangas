fetch('data.json')
.then(response => response.json())
.then(data => {
    // console.log(data);
    // console.log(data.length);
    for (let i = 0; i < data.length; i++) {
        // document.querySelector('#container').innerHTML += '<br />';
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