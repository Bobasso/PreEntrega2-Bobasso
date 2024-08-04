// Creo lista vacia para sumar el objeto que sería gasto
const listaGastos = [];

// Creo un monto que empieza en 0 y después va sumando para devolver el total
let totalGastos = 0;
const sumatoriaGastos = document.querySelector("#total-gastos");

const botonSubmit = document.querySelector("#btn-submit");
const agregarLocal = document.querySelector("#local");
const agregarMonto = document.querySelector("#monto");

const tablaGastos = document.querySelector("#tabla-gasto");

const crearLista = document.querySelector("#crear-lista");

crearLista.addEventListener("submit", (e) => {
    e.preventDefault();

    let gasto = {};
    gasto.local = agregarLocal.value;
    gasto.monto = parseInt(agregarMonto.value);
    apareceLista(gasto);

    crearLista.reset();
    agregarLocal.focus();

    totalGastos += parseInt(agregarMonto.value); //! Voy sumando el monto del gasto a un total
    sumatoriaGastos.innerText = `Usted gasto en total: $${totalGastos}`;
    console.log(listaGastos);
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
        tdLocal.innerText = objeto.local;
        crearGasto.append(tdLocal);
    
        const tdMonto = document.createElement("td");
        tdMonto.id = `monto-${objeto.local}`;
        tdMonto.innerText = objeto.monto;
        crearGasto.append(tdMonto);
    
        tablaGastos.append(crearGasto);
    }
}