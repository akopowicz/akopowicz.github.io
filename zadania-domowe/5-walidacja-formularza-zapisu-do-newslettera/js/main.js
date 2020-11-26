let form = document.getElementById('form');
let allAgreeChx = document.getElementById('all-agreement');

const validate = (event) => {
    let txtName = document.getElementById('name');
    let txtEmail = document.getElementById('email');
    let agree1 = document.getElementById('first-agreement');
    let errors = document.getElementById('errors');

    

    errors.innerHTML = '';

    if (txtName.value.trim() === '') {
        let liError = document.createElement('li');
        liError.innerText = 'Wpisz imię i nazwisko';
        errors.appendChild(liError);
    }

    if (txtEmail.value.trim() === '') {
        let liError = document.createElement('li');
        liError.innerText = 'Wpisz adres e-mial';
        errors.appendChild(liError);
    }

    if (!txtEmail.value.includes('@')) {
        let liError = document.createElement('li');
        liError.innerText = 'Adres e-mail musi zawierać @';
        errors.appendChild(liError);
    }

    if (!agree1.checked) {
        let liError = document.createElement('li');
        liError.innerText = 'Nie wyrażono pierwszej zgody';
        errors.appendChild(liError);
    }

    if (errors.children.length > 0) {
        event.preventDefault();
    }
}

const allAgree = (event) => {
    let agree1 = document.getElementById('first-agreement');
    let agree2 = document.getElementById('second-agreement');

    agree1.checked = event.target.checked;
    agree2.checked = event.target.checked;

    agree1.disabled = event.target.checked;
    agree2.disabled = event.target.checked;
}

form.addEventListener('submit', validate);

allAgreeChx.addEventListener('change', allAgree);