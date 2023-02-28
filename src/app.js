
const dolgozoTorzs = document.querySelector("#dolgozoTorzs");
const nameInput = document.querySelector("#nameInput");
const cityInput = document.querySelector("#cityInput");
const salaryInput = document.querySelector("#salaryInput");
const addButtonSave = document.querySelector("#addButtonSave");

const modIdInput = document.querySelector("#modIdInput");
const modNameInput = document.querySelector("#modNameInput");
const modCityInput = document.querySelector("#modCityInput");
const modSalaryInput = document.querySelector("#modSalaryInput");


const host = 'http://localhost:3000/';
const endpoint = 'employees';
const url = host + endpoint;

getEmployees();

function getEmployees() {
    fetch(url)
        .then((res) => (res.json())
            .then(result => {
                console.log(result);
                loadEmployees(result);
            })
            .catch(err => console.log(err)));
}


function loadEmployees(dolgozoLista) {
    dolgozoLista.forEach((dolgozo) => {

        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCity = document.createElement('td');
        let tdSalary = document.createElement('td');

        tdId.textContent = dolgozo.id;
        dolgozoTorzs.append(tr);
        tr.append(tdId);

        tdName.textContent = dolgozo.name;
        dolgozoTorzs.append(tr);
        tr.append(tdName);

        tdCity.textContent = dolgozo.city;
        dolgozoTorzs.append(tr);
        tr.append(tdCity);

        tdSalary.textContent = dolgozo.salary;
        dolgozoTorzs.append(tr);
        tr.append(tdSalary);

        tr.append(generateDeleteButton(dolgozo.id));

    });
};

function generateDeleteButton(id) {

    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = 'Törlés';
    button.classList = 'btn btn-danger';
    button.addEventListener('click', () => {
        console.log("működik " + id);
        deleteEmployee(id);
        dolgozoTorzs.textContent = '';
        getEmployees();
    })
    td.append(button);
    return td;
}

function generateModifyButton(dolgozo) {

    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = 'Szerkesztés';
    button.classList = 'btn btn-success';
    button.addEventListener('click', () => {
        console.log("működik " + id);
        
        modIdInput.value = dolgozo.id;
        modNameInput.value = dolgozo.name;
        modCityInput.value = dolgozo.city;
        modNameInput.value = dolgozo.salary;

        dolgozoTorzs.textContent = '';
        getEmployees();
    })
    td.append(button);
    return td;
}

function deleteEmployee(id) {
    let fullUrl = url + '/' + id;

    fetch(fullUrl, {
        method: 'DELETE'
    })
        .catch(err => console.log(err));
    
}

addButonSave.addEventListener('click', () => {
    console.log("Hozzáadás...");
    addEmployee();
    clearInputElements();
    dolgozoTorzs.textContent = '';
    getEmployees();
})

function addEmployee() {
    let name = nameInput.value;
    let city = cityInput.value;
    let salary = salaryInput.value;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            "name": name,
            "city": city,
            "salary": salary
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch(err => console.log(err))
        ;
}

function clearInputElements() {
    nameInput.value = '';
    cityInput.value = '';
    salaryInput.value = '';
}
