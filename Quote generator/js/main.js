let next = document.getElementById('next');
let img = document.querySelector('img');
let quote = document.getElementById('quote');
let author = document.getElementById('author');
let twitter = document.querySelector('.twitter');




let imagesSrc = ['pexels-francesco-ungaro-1525040.jpg', 'pexels-pixabay-459225.jpg', 'pexels-stein-egil-liland-3374210.jpg', 'pexels-timson-foox-3127734.jpg'];
       
    let randomForPhoto =  Math.floor(Math.random()*imagesSrc.length);
    img.src = 'img/' + imagesSrc[randomForPhoto];
 

fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
.then(response => response.json())
.then((data) => {
  
    let randomNumber = Math.floor(Math.random()*data.quotes.length);
   
    quote.innerText = data.quotes[randomNumber].quote;
    author.innerText = '~ ' + data.quotes[randomNumber].author;

    const newQuote = () => {
  
        let randomNumber = Math.floor(Math.random()*data.quotes.length);
        quote.innerText = data.quotes[randomNumber].quote;
        author.innerText = '~ ' + data.quotes[randomNumber].author;

        let randomForPhoto =  Math.floor(Math.random()*imagesSrc.length);
        img.src = 'img/' + imagesSrc[randomForPhoto]; 
    }

    next.addEventListener('click', newQuote);
}); 
