let pracownicy = document.querySelectorAll('div#pracownicy > div[id]:not([id=title])');

function liczenieWynagrodzen() {
    let posortowaniPracownicy = [];
    let najlepsiPracownicy = document.getElementById('najlepsi-pracownicy');

    for (let pracownik of pracownicy) {
        let godziny = pracownik.querySelector('.czas').value;
        let stawka = pracownik.querySelector('.stawka').value;
        let iloscWyplaty = pracownik.querySelector('.wyplata');
        let godzinyCalyElement = pracownik.querySelector('.czas');

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

        posortowaniPracownicy.push(godzinyCalyElement);
    }

    posortowaniPracownicy.sort((a, b) => b.value - a.value);

    najlepsiPracownicy.insertAdjacentHTML('afterbegin', posortowaniPracownicy[0].previousElementSibling.innerText + ", " + posortowaniPracownicy[1].previousElementSibling.innerText + ", " + posortowaniPracownicy[2].previousElementSibling.innerText);
}

let button = document.getElementById('oblicz');

button.addEventListener('click', liczenieWynagrodzen);