// Creo lista vacia para sumar el objeto que sería gasto
const listaGastos = [];

// Creo un monto que empieza en 0 y después va sumando para devolver el total
let totalGastos = 0;
const sumatoriaGastos = document.querySelector("#total-gastos");
const mayorGasto = document.querySelector("#mayor-gasto");

const botonSubmit = document.querySelector("#btn-submit");
const agregarLocal = document.querySelector("#local");
const agregarMonto = document.querySelector("#monto");

const tablaGastos = document.querySelector("#tabla-gasto");

const crearLista = document.querySelector("#crear-lista");

crearLista.addEventListener("submit", (e) => {
    e.preventDefault();

    if(totalGastos < 0){
        alert("No podes tener gastos negativos!! Fijate si estas poniendo bien los números. Si te equivocaste podes refrescar la página y volver a ingresar los números.");
    }

    totalGastos += parseInt(agregarMonto.value); //! Voy sumando el monto del gasto a un total

    let gasto = {};
    gasto.local = agregarLocal.value;
    gasto.monto = parseInt(agregarMonto.value);
    apareceLista(gasto);

    crearLista.reset();
    agregarLocal.focus();

    sumatoriaGastos.innerText = `Usted gasto en total: $${totalGastos}`;

    const localMayorGasto = listaGastos.reduce((max, item) => (item.monto > max.monto ? item : max), listaGastos[0]);
    mayorGasto.innerText = `Local con el mayor gasto este mes: ${localMayorGasto.local}`;
})

function apareceLista(objeto){
    const listaLocal = listaGastos.map(item => item.local);
    if(listaLocal.includes(objeto.local)){
        const index = listaGastos.findIndex(item => item.local == objeto.local);
        if (index !== -1) {
            const numFinal = listaGastos[index].monto += objeto.monto;
            const cambiarNum = document.querySelector(`#monto-${objeto.local}`);
            cambiarNum.innerText = numFinal
        }
    }else{
        listaGastos.push(objeto);

        const crearGasto = document.createElement("tr");

        const tdLocal = document.createElement("td");
        tdLocal.id = objeto.local;
        tdLocal.innerText = objeto.local;
        crearGasto.append(tdLocal);
    
        const tdMonto = document.createElement("td");
        tdMonto.id = `monto-${objeto.local}`;
        tdMonto.innerText = objeto.monto;
        crearGasto.append(tdMonto);
    
        tablaGastos.append(crearGasto);
    }
}