const ocenyKoncowe = () => {
    let uczniowie = document.querySelectorAll('div#pracownicy > div[id]:not([id=title])');
  
    for (uczen of uczniowie) {
  
      let przedmioty = uczen.querySelectorAll('input[type=number]');
      let zajeciaDodatkowe = uczen.querySelector('.zajecia-dodatkowe');
      let oceny = uczen.querySelector('.srednia');
      let imie = uczen.querySelector('.uczen');
  
      let wszystkieZajeciaDodatkowe = zajeciaDodatkowe.value.split(', ');
  
      let sumaKoncowa = 0;
  
      for (przedmiot of przedmioty) {
  
        if (wszystkieZajeciaDodatkowe.includes(przedmiot.className) && przedmiot.value < 6) {
          let ocenaDodatkowa = parseFloat(przedmiot.value) + 0.5;
          przedmiot.setAttribute('value', ocenaDodatkowa);
        }
  
  
        if (przedmiot.value == 1) {
          uczen.classList.add('zli-uczniowie')
        }
  
        sumaKoncowa += parseFloat(przedmiot.value);
      }
      
      let sredniaKoncowa = (sumaKoncowa / 7).toFixed(2);
      oceny.innerText = sredniaKoncowa;
  
      if (Number(sredniaKoncowa) >= 4.75) {
        uczen.classList.add('najlepsi-uczniowie')
      }
    }
  }
  
  let button = document.getElementById('oblicz');
  
  button.addEventListener('click', ocenyKoncowe);