let pracownicy = document.querySelectorAll('div#pracownicy > div[id]:not([id=title])');


function liczenieWynagrodzen() {
    let posortowaniPracownicy = [];
    let najlepsiPracownicy = document.getElementById('najlepsi-pracownicy');

    for (let pracownik of pracownicy) {
        let godziny = pracownik.querySelector('.czas').value;
        let stawka = pracownik.querySelector('.stawka').value;

        let iloscWyplaty = pracownik.querySelector('.wyplata');
        let godzinyNumber = parseInt(godziny);

        if (godziny > 160) {
            let nadgodziny = godziny - 160;
            let stawkaZaNadgodziny = stawka * 2;
            let premia = nadgodziny * stawkaZaNadgodziny;
            let wyplata = 160 * stawka + premia;
            iloscWyplaty.innerText = wyplata;
        } else {
            let wyplata = godziny * stawka;
            iloscWyplaty.innerText = wyplata;
        }

        if (godziny < 100) {
            pracownik.classList.add('red-background');
        }

        posortowaniPracownicy.push(godzinyNumber);
    }

    posortowaniPracownicy.sort((a, b) => (a > b) ? -1 : 1);

    for (let i = 0; i < pracownicy.length; i++) {
        let godzinyBezWartosci = document.querySelectorAll('.czas');
        if (posortowaniPracownicy[0] == godzinyBezWartosci[i].value) {
            najlepsiPracownicy.insertAdjacentHTML('afterbegin', godzinyBezWartosci[i].previousElementSibling.innerText)
        }

        if (posortowaniPracownicy[1] == godzinyBezWartosci[i].value) {
            najlepsiPracownicy.insertAdjacentHTML('beforeend', ", " + godzinyBezWartosci[i].previousElementSibling.innerText)
        }

        if (posortowaniPracownicy[2] == godzinyBezWartosci[i].value) {
            najlepsiPracownicy.insertAdjacentHTML('beforeend', ", " + godzinyBezWartosci[i].previousElementSibling.innerText)
        }
    }
}


let button = document.getElementById('oblicz');

button.addEventListener('click', liczenieWynagrodzen);
