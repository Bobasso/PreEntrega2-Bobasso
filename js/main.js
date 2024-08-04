const listaGastos = [];
let totalGastos = 0;
const sumatoriaGastos = document.querySelector("#total-gastos");

const botonSubmit = document.querySelector("#btn-submit"); // Boton que envia el formulario
const agregarLocal = document.querySelector("#local"); // Local que ingresa en el input
const agregarMonto = document.querySelector("#monto"); // Monto que ingresa en el input

const tablaGastos = document.querySelector("#tabla-gasto");

const crearLista = document.querySelector("#crear-lista");

crearLista.addEventListener("submit", (e) => {
    e.preventDefault();

    const crearGasto = document.createElement("tr");

    const tdLocal = document.createElement("td");
    tdLocal.innerText = agregarLocal.value;
    crearGasto.append(tdLocal);

    const tdMonto = document.createElement("td");
    tdMonto.innerText = "$" + agregarMonto.value;
    totalGastos += parseInt(agregarMonto.value);
    crearGasto.append(tdMonto);

    tablaGastos.append(crearGasto);

    crearLista.reset();
    agregarLocal.focus();

    sumatoriaGastos.innerText = `Usted gasto en total: $${totalGastos}`
});