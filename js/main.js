const containerLogin = document.querySelector("#container-login"); // Id del primer Div
const containerTabla = document.querySelector("#container-tabla"); // Id del segundo Div

const txtHola = document.querySelector("#txt-hola"); // Agrego texto a un h2 donde saluda al usuario

// Chequeo que si existe un nombre guardado en el Local Storage
const personaLocalStorage = localStorage.getItem("persona");
const personaObjeto = JSON.parse(personaLocalStorage);

if(personaLocalStorage !== null){
    containerLogin.classList.add("desaparecer");
    containerTabla.classList.remove("desaparecer");

    txtHola.innerText = `Bienvenido ${personaObjeto.nombre} ${personaObjeto.apellido}. Agregue los gastos que tuvo durante todo el mes y vea cuánto gastó en total`;
}

// Pedir nombre y guardar
const pedirNombre = document.querySelector("#pedir-nombre"); // Id del formulario
const nombrePersona = document.querySelector("#nombre"); // Id input donde ingresa el nombre
const apellidoPersona = document.querySelector("#apellido"); // Id input donde ingresa el apellido

pedirNombre.addEventListener("submit", (e) =>{
    e.preventDefault();

    let persona = {};
    persona.nombre = (nombrePersona.value).trim();
    persona.apellido = (apellidoPersona.value).trim();
    localStorage.setItem("persona", JSON.stringify(persona));

    containerLogin.classList.add("desaparecer");
    containerTabla.classList.remove("desaparecer");

    txtHola.innerText = `Bienvenido ${persona.nombre} ${persona.apellido}. Agregue los gastos que tuvo durante todo el mes y vea cuánto gastó en total`;

    pedirNombre.reset();
});


// Tabla de gastos
const listaGastos = []; //! Creo lista vacia para sumar el objeto que sería gasto

let totalGastos = 0; //! Creo un monto que empieza en 0 y después va sumando para devolver el total
const sumatoriaGastos = document.querySelector("#total-gastos");
const mayorGasto = document.querySelector("#mayor-gasto");
const menorGasto = document.querySelector("#menor-gasto");

const tablaGastos = document.querySelector("#tabla-gasto"); // Id de toda la tabla
const contenidoTabla = document.querySelector("#contenido-tabla") // Id donde va la info agregada por el usuario

const crearLista = document.querySelector("#crear-lista"); // Id del formulario
const botonSubmit = document.querySelector("#btn-submit");
const agregarLocal = document.querySelector("#local"); // Id input donde ingresa el local
const agregarMonto = document.querySelector("#monto"); // Id input donde ingresa el monto gastado

crearLista.addEventListener("submit", (e) => {
    e.preventDefault();

    // Uso Operador Avanzado AND
    totalGastos < 0 && alert("No podes tener gastos negativos!! Fijate si estas poniendo bien los números.");

    totalGastos += parseFloat(agregarMonto.value); //! Voy sumando el monto del gasto a un total

    let gasto = {};
    gasto.local = (agregarLocal.value).trim();
    gasto.monto = parseFloat(agregarMonto.value);
    apareceLista(gasto);
    localStorage.setItem("gastos", JSON.stringify(listaGastos));

    crearLista.reset();
    agregarLocal.focus();

    sumatoriaGastos.innerText = `Usted gasto en total: $${totalGastos}`;

    const localMayorGasto = listaGastos.reduce((max, item) => (item.monto > max.monto ? item : max), listaGastos[0]);
    mayorGasto.innerText = `Local con el mayor gasto este mes: ` + localMayorGasto.local[0].toUpperCase() + localMayorGasto.local.substring(1);

    const localMenorGasto = listaGastos.reduce((min, item) => (item.monto < min.monto ? item : min), listaGastos[0]);
    menorGasto.innerText = `Local con el menor gasto este mes: ` + localMenorGasto.local[0].toUpperCase() + localMenorGasto.local.substring(1);
})

function apareceLista(objeto){
    const listaLocal = listaGastos.map(item => item.local);
    if(listaLocal.includes(objeto.local.toLowerCase())){
        const index = listaGastos.findIndex(item => item.local == objeto.local.toLowerCase());
        if (index !== -1) {
            const numFinal = listaGastos[index].monto += objeto.monto;
            const idMonto = objeto.local.replace(" ", "-"); // Borro los espacio para el id del monto del local para que no tire error el programa
            const cambiarNum = document.querySelector(`#monto-${idMonto.toLowerCase()}`);
            cambiarNum.innerText = `$${numFinal.toString()}`;
        }
    }else{

        listaGastos.push({
            local: objeto.local.toLowerCase(), // Agrego el Local en minus a la lista para poder comparar más fácil
            monto: objeto.monto
        });

        const crearGasto = document.createElement("tr");

        const tdLocal = document.createElement("td");
        tdLocal.id = objeto.local;
        tdLocal.innerText = (objeto.local[0].toUpperCase() + objeto.local.substring(1).toLowerCase()).trim();
        crearGasto.append(tdLocal);
    
        const tdMonto = document.createElement("td");
        const idMonto = objeto.local.replace(" ", "-"); // Borro los espacio para el id del monto del local para que no tire error el programa
        tdMonto.id = `monto-${idMonto.toLowerCase()}`;
        tdMonto.innerText = `$${objeto.monto}`;
        crearGasto.append(tdMonto);

        const tdEliminar = document.createElement("td");
        tdEliminar.className = "td-eliminar";
        tdEliminar.innerText = "❌";
        tdEliminar.addEventListener("click", ()=>{
            crearGasto.remove();
            const index = listaGastos.findIndex(item => item.local == objeto.local.toLowerCase());
            if (index !== -1) {
                totalGastos -= listaGastos[index].monto;
                sumatoriaGastos.innerText = `Usted gasto en total: $${totalGastos}`;
                listaGastos.splice(index, 1);

                if(listaGastos.length > 0){
                    const localMayorGasto = listaGastos.reduce((max, item) => (item.monto > max.monto ? item : max), listaGastos[0]);
                    mayorGasto.innerText = `Local con el mayor gasto este mes: ` + localMayorGasto.local[0].toUpperCase() + localMayorGasto.local.substring(1);

                    const localMenorGasto = listaGastos.reduce((min, item) => (item.monto < min.monto ? item : min), listaGastos[0]);
                    menorGasto.innerText = `Local con el menor gasto este mes: ` + localMenorGasto.local[0].toUpperCase() + localMenorGasto.local.substring(1);
                }else{
                    mayorGasto.innerText = `Local con el mayor gasto este mes: `;
                    menorGasto.innerText = `Local con el mayor gasto este mes: `;
                }
            }
        });

        crearGasto.append(tdEliminar);
        contenidoTabla.append(crearGasto);
    }
}

const limpiarLista = document.querySelector("#btn-limpiar");
limpiarLista.addEventListener("click", ()=>{
    listaGastos.splice(0, listaGastos.length); // Vacio la lista para que pueda repetir nombres sin problema
    tablaGastos.querySelector("tbody").innerHTML = ""; // Borro el contenido del html la tabla menos los títulos.
    
    totalGastos = 0; // Reset del total
    sumatoriaGastos.innerText = ``; // 
    mayorGasto.innerText = ``;      // -> Limpio los textos de abajo de la tabla
    menorGasto.innerText = ``;      //
});

// Función para cerrar sesión
const cerrarSesion = document.querySelector("#btn-cerrar");

cerrarSesion.addEventListener("click", ()=>{
    localStorage.removeItem("persona");
    localStorage.removeItem("gastos");

    containerLogin.classList.remove("desaparecer");
    containerTabla.classList.add("desaparecer");
});