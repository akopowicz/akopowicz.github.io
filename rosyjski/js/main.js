$(document).ready(function(){
    $('#hamburger').click(function() {
        $('.side-menu').toggleClass('visible');
    });
});

let arrayQuotes = ['„Bez znajomości języków obcych człowiek czuje się jak bez paszportu.”', '„Ja mogę żyć tylko sercem, wy zaś żyjecie według zasad.”', '„Może dlatego wydaję ci się szczęśliwy, ponieważ cieszę się tym, co mam, a nie tęsknię za tym, czego nie mam.”', '„Nie wiadomo, dlaczego wszyscy mówią do kotów „ty”, choć jako żywo żaden kot nigdy z nikim nie pił bruderszaftu.”', '„Ludzie śmieją się tylko z tego, co śmieszne, albo z tego, czego nie rozumieją.”'];
let arrayAutor = ['Anton Czechow', 'Lew Tołstoj', 'Lew Tołstoj', 'Michaił Bułchakow', 'Anton Czechow'];


let arrayQuotesRus = ['„Без знания языков чувствуешь себя, как без паспорта.”', '„Я не могу иначе жить, как по сердцу, а вы живете по правилам”', '„Я наверное кажусь тебе счастливым потому, что радуюсь тем что у меня есть а не скучаю за тем чего у меня нет”', '„Котам обычно почему-то говорят "ты", хотя ни один кот никогда ни с кем не пил брудершафта”', "„Люди смеются только над тем, что смешно, или тем чего не понимают”"];
let arrayAutorRus = ['Антон Павлович Чехов', 'Лев Николаевич Толсто́й', 'Лев Николаевич Толсто́й', 'Михаи́л Афана́сьевич Булга́ков', 'Антон Павлович Чехов'];

let quote = document.getElementById('quote');
let autor = document.getElementById('autor');
let quotes = document.getElementById('quotes-pl')


let randomNumber = Math.floor(Math.random()*5);

quote.innerText = arrayQuotes[randomNumber];
autor.innerText = '- ' + arrayAutor[randomNumber];

let quotesRus = document.getElementById('quotes-rus');
let quoteRus = document.getElementById('quote-rus');
let autorRus = document.getElementById('autor-rus');

quoteRus.innerText = arrayQuotesRus[randomNumber];
autorRus.innerText = '- ' + arrayAutorRus[randomNumber];


quotesRus.addEventListener("mouseover", function() {
    quotesRus.classList.add('visible');
});

quotesRus.addEventListener("mouseout", function() {
    quotesRus.classList.remove('visible');
});
