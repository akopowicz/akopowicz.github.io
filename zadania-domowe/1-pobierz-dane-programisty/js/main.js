let button = document.querySelector('button');
let div = document.createElement('div');
div.setAttribute('id', 'dane-programisty');
button.insertAdjacentElement('afterend', div);


const programmerData = () => {
    fetch('https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php')
        .then(response => response.json())
        .then((data) => {
          
            div.insertAdjacentHTML('beforeend', 'Imię: ' + data.imie + '<br>' + 'Nazwisko: ' + data.nazwisko + '<br>' + 'Zawód: ' + data.zawod + '<br>' + 'Firma: ' + data.firma + '<br>');
        });
};


button.addEventListener('click', programmerData);



