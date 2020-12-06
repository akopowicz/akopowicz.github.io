$(document).ready(function(){
    $('#hamburger').click(function() {
        $('.side-menu').toggleClass('visible');
    })
})


let arrayQuotes = ['„Ja mogę żyć tylko sercem, wy zaś żyjecie według zasad.”', '„Może dlatego wydaję ci się szczęśliwy, ponieważ cieszę się tym, co mam, a nie tęsknię za tym, czego nie mam.”', '„Nie wiadomo, dlaczego wszyscy mówią do kotów „ty”, choć jako żywo żaden kot nigdy z nikim nie pił bruderszaftu.”'];
let arrayAutor = ['Lew Tołstoj', 'Lew Tołstoj', 'Michaił Bułchakow'];


let arrayQuotesRus = ['„Я могу жить только сердцем, вы зато живете согласно правилом”', "„соклунир рап ”", "„рприто пнт пр рпр”"];
let arrayAutorRus = ['Лев Толстой', 'bla', 'М Б'];

let quotes = document.getElementById('quote');
let autor = document.getElementById('autor');



let randomNumber = Math.floor(Math.random()*3);

quotes.innerText = arrayQuotes[randomNumber];
autor.innerText = '- ' + arrayAutor[randomNumber];

let quotesRus = document.getElementById('quotes-rus');
let quoteRus = document.getElementById('quote-rus');
let autorRus = document.getElementById('autor-rus');


quotes.addEventListener("mouseover", function() {
    quotes.innerHTML = arrayQuotesRus[randomNumber];
autor.innerText = '- ' + arrayAutorRus[randomNumber];
})

quotes.addEventListener("mouseout", function() {
    quotes.innerText = arrayQuotes[randomNumber];
autor.innerText = '- ' + arrayAutor[randomNumber];
})

