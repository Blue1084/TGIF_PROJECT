let members;



fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        method: "Get",
        headers: {
            "X-API-KEY": "dCpvKNKoJwqTIfHErrWzFSIUakuG3ZaTbcLxbu8k"
        }
    })
    .then(function (response) {
        return response.json()
        // return es para retornar la informacion de la sedunda promesa

    })
    .then(function (data) {
        data.results[0].members
        members = data.results[0].members;
        createtable(data.results[0].members);
        populateStates();
        loader();

        



    })
    .catch(function (error) {
        console.log(error);


    })


function createtable(array) {
    // getelement sirve para incluir los elementos, que se describan, en la id del html que le digamos. (donde debe colocarlo)
    let tabla = document.getElementById("datosdelsenado");
    tabla.innerHTML = "";
    // createElement se utiliza para decirle al documento (html) que debe crear el elemento que descibamos.(que debe construir)
    for (let i = 0; i < array.length; i++) {
        let tr = document.createElement("tr");
        let celdaNombre = document.createElement("td");
        let celdaparty = document.createElement("td");
        let celdastate = document.createElement("td");
        let celdaseniority = document.createElement("td");
        let celdavotes = document.createElement("td");
        let linktable = document.createElement("a");

        // innerHtml se utiliza para incorporar la informacion concreta en la variable que nos interese.(que informacion debe comprender lo que hemos construido y de donde tiene que cogerla)
        linktable.innerHTML = (array[i].first_name || "") + " " + (array[i].last_name || "") + " " + (array[i].middle_name || "");
        celdaparty.innerHTML = array[i].party;
        celdastate.innerHTML = array[i].state;
        celdaseniority.innerHTML = array[i].seniority;
        celdavotes.innerHTML = array[i].votes_with_party_pct + "%";

        let linka = document.createAttribute("href");
        linka.value = array[i].url;
        linktable.setAttributeNode(linka);
        linktable.setAttribute("target", "_blank")

        // append se utiliza para incorporar lo que hemos creado en donde corresponda.
        celdaNombre.append(linktable);
        tr.append(celdaNombre, celdaparty, celdastate, celdaseniority, celdavotes);
        tabla.append(tr);





    }

}







let variable1 = document.getElementById("Checkbox1")
variable1.addEventListener("click", filterbyparty);
// asi le decimos que teniendo la variable1 nos ejecute la funcion (filterbyparty) al hacer "click"

let variable2 = document.getElementById("Checkbox2")
variable2.addEventListener("click", filterbyparty);

let variable3 = document.getElementById("Checkbox3")
variable3.addEventListener("click", filterbyparty);

let varaible4 = document.getElementById('states');
varaible4.addEventListener('change', filterbyparty)



// function filterbyparty() {

//     let checkBoxes = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);

//     let members = data.results[0].members;
//     let filteredMembers = [];

//     for (let i = 0; i < members.length; i++) {
//         let member = members[i];

//         if (checkBoxes.includes(member.party)) {
//             filteredMembers.push(member);
//         }
//     }

//     if(checkBoxes.length == 0){
//         createtable(members);
//     }else{
//         createtable(filteredMembers)
//     }

// }

function filterbyparty(array) {

    let checkboxes = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);
    console.log(checkboxes);

    // array.form es para hacer un duplicado.
    // queryselectorall es para que me seleccione todos los elemenetos que le indiquemos entre los parentesis
    // con el type le indicamos que inputs tiene que seleccionar (checkbox) y le especificamos que coja los que esten chequeados (chequed)
    // .map 
    // let members = data.results[0].members;
    // para ahorrarnos escribir la array todo el tiempo

    let filteredMembers = [];
    // creamos una array vacia para llenarla de los nuevos elementos ya filtrados.

    for (let i = 0; i < members.length; i++) {
        // para recorrer la array. le especificamos que array concreta debe recorrer (members)
        let member = members[i]
        // para no poner members[i] todo el tiempo

        if (checkboxes.includes(member.party)) {
            filteredMembers.push(member);
            // si dentro de los checkboxes se encuentran los member.party (includes)
            // entonces lo colocara (push) en la variable vacia (filteredmembers)

        }



    }

    // para evitar que nos enseñe la tabla vacia cuando no haya ninguna opcion seleccionada deberemos darle una condicion 
    // que le diga que nos muestre la tabla completa.

    if (checkboxes.length == 0) {
        filterbystate(members);

        
    } else {
        filterbystate(filteredMembers);
        // para que filtre por partido y por estados

    }

    // esto dice que si no hay ningun elemento ([i]) dentro de la array filtrada (checkboxes) entonces me ponga la array entera (members)
    // en caso contrario, es decir, que si encuentra elementos en la array filtrada (filteredmembers),los imprima.



}
// no es necesario llamar a la funcion.




// let namestate1 = document.getElementById("state1")
// namestate1.addEventListener("click", filterbystate, false);



function filterbystate(filteredMembers) {
    // le damos un parametro para """enlazarlo""" con el otro filtro (filteredMembers);


    let filterstates = [];
    // variable vacia para que se llene con los elementos ya filtrados.
    let stateSelected = document.getElementById('states').value;
    // creamos una variable (starSelected) para linkarla o posicionarla en el html 
    // le indicamos que nos seleccione el value 

    for (let i = 0; i < filteredMembers.length; i++) {
        if (filteredMembers[i].state == stateSelected || stateSelected == "all") {
            // si los elementos ([i]) de la array  (filteredMembers, que es la array ya filtrada en el checkbox)
            // con el parametro "state"  es igual a el valor que esta seleccionado (stateSelected)
            filterstates.push(filteredMembers[i]);
            // entonces nos lo coloque (push) en la array vacia que hemos creado previamente 
        }
    }

    createtable(filterstates);
    // con esto le indicamos que nos cree la tabla con los parametros filtrados.

}

function populateStates() {
    // creamos esta funcion para rellenar las options del dropdown

    let estados = Array.from(new Set(members.map(m => m.state).sort()));
    // creamos una variable y le decimos que me haga una array sin duplicados (new Set) de la variable members pero le indicamos 
    // que transforme cada elemento de members en su parametro "state"(.map) y finalmente que la ordene alfabeticamente (.sort).
    // una vez tengamos esto le decimos que lo transforme en una array (array.form)

    let dropdown = document.getElementById("states");
    // creamos una variable para posicionarla en el html

    for (let i = 0; i < estados.length; i++) {
        // concretamos la array que queremos que recorra, en este caso la array "estados"
        let option = document.createElement("option");
        // creamos una variable y le decimos que nos cree un elemento concreto ("opcion")
        option.innerHTML = estados[i];
        // le decimos que este elemento concreto lo inserte en el html con el valor "estados[i]"
        dropdown.append(option);
        // y que el elemento "option" nos lo ponga dentro de la variable dropdown.
    }
}

function loader() {
    document.getElementById("loading").style.display = "none";



}