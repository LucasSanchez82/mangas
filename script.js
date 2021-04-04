fetch('data.json')
.then(response => response.json())
.then(data => {
    console.log(data);
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
        // document.querySelector('#container').innerHTML += '<br />';
        document.querySelector('#container').innerHTML += ` <div class="item"><h3> <a target="_blank"  href="${data[i].link}" > ${data[i].title} </a></h3> <h4><a target="_blank"  href="${data[i].linkactu}"> chapitre actuel</a> </h4 <br /> <img src="${data[i].image}" alt="image de ${data[i].titre}" /> </div `;
        // document.querySelector('#container').innerHTML += 'coucou';
    }
})
//////////
fetch("https://jikan1.p.rapidapi.com/meta/requests/anime/today", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "779ee9983dmsh39e183cab204769p12c4e2jsn602e9fa0d995",
		"x-rapidapi-host": "jikan1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
    response.json()
})
.then(data => {
    console.log('a venir');
	console.log(data);
})
// fetch("https://jikan1.p.rapidapi.com/meta/requests/anime/today", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "779ee9983dmsh39e183cab204769p12c4e2jsn602e9fa0d995",
// 		"x-rapidapi-host": "jikan1.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });