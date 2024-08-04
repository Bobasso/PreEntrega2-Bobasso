const listaGastos = [];
let totalGastos = 0;
const sumatoriaGastos = document.querySelector("#total-gastos");

const botonSubmit = document.querySelector("#btn-submit");
const agregarLocal = document.querySelector("#local");
const agregarMonto = document.querySelector("#monto");

const tablaGastos = document.querySelector("#tabla-gasto");

const crearLista = document.querySelector("#crear-lista");

crearLista.addEventListener("submit", (e) => {
    e.preventDefault();

    totalGastos += parseInt(agregarMonto.value); // Voy sumando el monto del gasto a un total

    let gasto = {};
    gasto.local = agregarLocal.value;
    gasto.monto = parseInt(agregarMonto.value);

    const crearGasto = document.createElement("tr");

    const tdLocal = document.createElement("td");
    tdLocal.innerText = gasto.local;
    crearGasto.append(tdLocal);

    const tdMonto = document.createElement("td");
    tdMonto.innerText = "$" + gasto.monto;
    crearGasto.append(tdMonto);

    tablaGastos.append(crearGasto);
    listaGastos.push(gasto);

    // crearLista.reset();
    agregarLocal.focus();

    console.log(listaGastos);
    sumatoriaGastos.innerText = `Usted gasto en total: $${totalGastos}`
});