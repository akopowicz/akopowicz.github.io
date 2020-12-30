let imageContainer1 = document.querySelector('.img-1');
let imageContainer2 = document.querySelector('.img-2');
let quote1 = document.querySelector('.quote');
let quote2 = document.querySelector('.quote-2');
let author1 = document.querySelector('.author');
let author2 = document.querySelector('.author-2');
let nextPhotoButton = document.getElementById('next');
let quoteDiv = document.querySelectorAll('.quote-div');
let quoteHolder = document.querySelector('.quote-holder');
let twitter = document.querySelector('.twitter');
let quoteDiv1 = document.querySelector('.quote-div-1');
let quoteDiv2 = document.querySelector('.quote-div-2');

let imagesSrc = ['pexels-francesco-ungaro-1525040.jpg', 'pexels-pixabay-459225.jpg', 'pexels-stein-egil-liland-3374210.jpg', 'pexels-timson-foox-3127734.jpg'];

imageContainer1.classList.add('visible');
imageContainer1.src = 'img/' + imagesSrc[1];

fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
.then(response => response.json())
.then((data) => {

    let randomNumber = Math.floor(Math.random()*data.quotes.length);

    quote1.innerText = data.quotes[randomNumber].quote;
    author1.innerText = '~ ' + data.quotes[randomNumber].author;
    quoteHolder.style.height = quoteDiv[0].offsetHeight + 'px'

    let quoteUri = encodeURI(quote1.innerText);
    let authorUri = encodeURI(author1.innerText);
    
    twitter.setAttribute('href', `https://twitter.com/share?text=${quoteUri}${authorUri}`);
  
    let i = 0;

    const showNext = () => {

        let imgNextPhoto = document.querySelector("img:not(.visible)");
        imgNextPhoto.src = 'img/' + imagesSrc[i % imagesSrc.length];

        imageContainer1.classList.toggle('visible');
        imageContainer2.classList.toggle('visible');
    
        let randomNumber = Math.floor(Math.random()*data.quotes.length);

        let nextQuote = document.querySelector(".quote-div:not(.quote-div-visible)");

        nextQuote.innerHTML = ` <i class="fas fa-quote-left"></i>` + `<span class="quote">${data.quotes[randomNumber].quote}</span>` + `<div class="author">~ ${data.quotes[randomNumber].author}</div>`;
    
        let quoteUri = encodeURI(data.quotes[randomNumber].quote);
        let authorUri = encodeURI(data.quotes[randomNumber].author);

        twitter.setAttribute('href', `https://twitter.com/share?text=${quoteUri}${authorUri}`);

        quoteHolder.style.height = quoteDiv[0].offsetHeight + 'px';

        quoteDiv1.classList.toggle('quote-div-visible');
        quoteDiv2.classList.toggle('quote-div-visible');
   
        let quoteDivVisible = document.querySelector('.quote-div-visible');

        quoteHolder.style.height = quoteDivVisible.offsetHeight + 'px';
    
        i++ 
    }

    nextPhotoButton.addEventListener('click', showNext);
})