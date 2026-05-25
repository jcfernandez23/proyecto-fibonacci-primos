document.addEventListener("DOMContentLoaded", function () {
    const formPrimos = document.getElementById("form-primos");
    const formFibonacci = document.getElementById("form-fibonacci");
    const formCombinado = document.getElementById("form-combinado");

    const diaInicioPrimo = document.getElementById("diaInicioPrimo");
    const diaFinPrimo = document.getElementById("diaFinPrimo");
    const nombreCicloPrimo = document.getElementById("nombreCicloPrimo");

    const capacidadBaseFibo = document.getElementById("capacidadBaseFibo");
    const etapasFibo = document.getElementById("etapasFibo");
    const valorUnidadFibo = document.getElementById("valorUnidadFibo");

    const baseMixta = document.getElementById("baseMixta");
    const terminosMixtos = document.getElementById("terminosMixtos");
    const valorUnidadMixta = document.getElementById("valorUnidadMixta");

    if (formPrimos) {
        formPrimos.addEventListener("submit", function (event) {
            event.preventDefault();
            analizarDiasPrimos();
        });
    }

    if (formFibonacci) {
        formFibonacci.addEventListener("submit", function (event) {
            event.preventDefault();
            generarFibonacci();
        });
    }

    if (formCombinado) {
        formCombinado.addEventListener("submit", function (event) {
            event.preventDefault();
            analizarFibonacciConPrimos();
        });
    }

    if (diaInicioPrimo && diaFinPrimo && nombreCicloPrimo) {
        [diaInicioPrimo, diaFinPrimo, nombreCicloPrimo].forEach(function (input) {
            input.addEventListener("input", actualizarVistaPrimos);
        });
        actualizarVistaPrimos();
    }

    if (capacidadBaseFibo && etapasFibo && valorUnidadFibo) {
        [capacidadBaseFibo, etapasFibo, valorUnidadFibo].forEach(function (input) {
            input.addEventListener("input", actualizarVistaFibonacci);
        });
        actualizarVistaFibonacci();
    }

    if (baseMixta && terminosMixtos && valorUnidadMixta) {
        [baseMixta, terminosMixtos, valorUnidadMixta].forEach(function (input) {
            input.addEventListener("input", actualizarVistaCombinada);
        });
        actualizarVistaCombinada();
    }
});

function mostrarResultado(elemento, mensajeHTML, esExito) {
    elemento.innerHTML = mensajeHTML;
    elemento.classList.remove("success", "error");

    if (esExito) {
        elemento.classList.add("success");
    } else {
        elemento.classList.add("error");
    }
}

function esPrimo(numero) {
    if (!Number.isInteger(numero) || numero < 2) {
        return false;
    }

    for (let i = 2; i * i <= numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }

    return true;
}

function actualizarVistaPrimos() {
    const inicio = document.getElementById("diaInicioPrimo").value;
    const fin = document.getElementById("diaFinPrimo").value;
    const nombre = document.getElementById("nombreCicloPrimo").value.trim();
    const caja = document.getElementById("previewPrimos");

    caja.innerHTML = `
        <strong>Vista previa:</strong> ${nombre || "Calendario de revisión"}<br>
        Se analizarán los días desde <strong>${inicio || "?"}</strong> hasta <strong>${fin || "?"}</strong>.
    `;
}

function actualizarVistaFibonacci() {
    const base = document.getElementById("capacidadBaseFibo").value;
    const etapas = document.getElementById("etapasFibo").value;
    const valor = document.getElementById("valorUnidadFibo").value;
    const caja = document.getElementById("previewFibonacci");

    caja.innerHTML = `
        <strong>Vista previa:</strong><br>
        Capacidad inicial: <strong>${base || "?"}</strong> ·
        Etapas: <strong>${etapas || "?"}</strong> ·
        Valor por unidad: <strong>${valor || "?"}</strong>
    `;
}

function actualizarVistaCombinada() {
    const base = document.getElementById("baseMixta").value;
    const terminos = document.getElementById("terminosMixtos").value;
    const valor = document.getElementById("valorUnidadMixta").value;
    const caja = document.getElementById("previewCombinado");

    caja.innerHTML = `
        <strong>Vista previa:</strong><br>
        Capacidad inicial: <strong>${base || "?"}</strong> ·
        Términos: <strong>${terminos || "?"}</strong> ·
        Valor por unidad: <strong>${valor || "?"}</strong>
    `;
}

function analizarDiasPrimos() {
    const diaInicio = parseInt(document.getElementById("diaInicioPrimo").value, 10);
    const diaFin = parseInt(document.getElementById("diaFinPrimo").value, 10);
    const nombreCiclo = document.getElementById("nombreCicloPrimo").value.trim();
    const salida = document.getElementById("resultadoPrimos");

    if (!Number.isInteger(diaInicio) || !Number.isInteger(diaFin)) {
        mostrarResultado(salida, "Ingresa días válidos para el análisis.", false);
        return;
    }

    if (diaInicio < 1 || diaFin < 1) {
        mostrarResultado(salida, "Los días deben ser mayores que 0.", false);
        return;
    }

    if (diaInicio > diaFin) {
        mostrarResultado(salida, "El día inicial no puede ser mayor que el día final.", false);
        return;
    }

    if (diaFin > 365) {
        mostrarResultado(salida, "Usa un rango máximo de 365 días.", false);
        return;
    }

    const diasPrimos = [];

    for (let i = diaInicio; i <= diaFin; i++) {
        if (esPrimo(i)) {
            diasPrimos.push(i);
        }
    }

    const html = `
        <strong>${nombreCiclo || "Calendario de revisión"}:</strong><br>
        Rango analizado: del día ${diaInicio} al día ${diaFin}.<br><br>
        <strong>Días primos detectados:</strong><br>
        ${diasPrimos.length > 0 ? diasPrimos.join(", ") : "No se encontraron días primos en ese rango."}<br><br>
        <strong>Total de días primos encontrados:</strong> ${diasPrimos.length}
    `;

    mostrarResultado(salida, html, true);
}

function generarFibonacci() {
    const capacidadBase = parseInt(document.getElementById("capacidadBaseFibo").value, 10);
    const etapas = parseInt(document.getElementById("etapasFibo").value, 10);
    const valorUnidad = parseInt(document.getElementById("valorUnidadFibo").value, 10);
    const salida = document.getElementById("resultadoFibonacci");

    if (![capacidadBase, etapas, valorUnidad].every(Number.isInteger)) {
        mostrarResultado(salida, "Ingresa valores enteros válidos.", false);
        return;
    }

    if (capacidadBase < 0 || etapas < 1 || valorUnidad < 0) {
        mostrarResultado(salida, "Los valores no pueden ser negativos y las etapas deben ser mayores que 0.", false);
        return;
    }

    if (etapas > 30) {
        mostrarResultado(salida, "Usa un máximo de 30 etapas para mantener la lectura clara.", false);
        return;
    }

    let a = 0;
    let b = 1;
    const secuencia = [];
    let totalIncremento = 0;

    for (let i = 1; i <= etapas; i++) {
        const c = a + b;
        a = b;
        b = c;

        secuencia.push(c);
        totalIncremento += c;
    }

    const capacidadFinal = capacidadBase + totalIncremento;
    const costoEstimado = totalIncremento * valorUnidad;

    const html = `
        <strong>Secuencia generada:</strong><br>
        ${secuencia.join(", ")}<br><br>
        <strong>Capacidad inicial:</strong> ${capacidadBase}<br>
        <strong>Aumento acumulado:</strong> ${totalIncremento.toLocaleString("es-BO")}<br>
        <strong>Capacidad final estimada:</strong> ${capacidadFinal.toLocaleString("es-BO")}<br>
        <strong>Valor estimado por unidades:</strong> ${costoEstimado.toLocaleString("es-BO")}
    `;

    mostrarResultado(salida, html, true);
}

function analizarFibonacciConPrimos() {
    const baseMixta = parseInt(document.getElementById("baseMixta").value, 10);
    const terminos = parseInt(document.getElementById("terminosMixtos").value, 10);
    const valorUnidad = parseInt(document.getElementById("valorUnidadMixta").value, 10);
    const salida = document.getElementById("resultadoCombinado");

    if (![baseMixta, terminos, valorUnidad].every(Number.isInteger)) {
        mostrarResultado(salida, "Ingresa valores enteros válidos.", false);
        return;
    }

    if (baseMixta < 0 || terminos < 1 || valorUnidad < 0) {
        mostrarResultado(salida, "Los valores no pueden ser negativos y la cantidad de términos debe ser mayor que 0.", false);
        return;
    }

    if (terminos > 30) {
        mostrarResultado(salida, "Usa un máximo de 30 términos para mantener el análisis legible.", false);
        return;
    }

    let a = 0;
    let b = 1;
    const fibonacci = [];
    const fibonacciPrimos = [];
    let suma = 0;

    for (let i = 1; i <= terminos; i++) {
        const c = a + b;
        a = b;
        b = c;

        fibonacci.push(c);
        suma += c;

        if (esPrimo(c)) {
            fibonacciPrimos.push(c);
        }
    }

    const capacidadFinal = baseMixta + suma;
    const costoEstimado = suma * valorUnidad;

    let html = `<strong>Secuencia Fibonacci:</strong><br>${fibonacci.join(", ")}<br><br>`;

    if (fibonacciPrimos.length > 0) {
        html += `<strong>Valores de Fibonacci que también son primos:</strong><br>${fibonacciPrimos.join(", ")}<br><br>`;
    } else {
        html += `<strong>Valores de Fibonacci que también son primos:</strong> Ninguno en este rango.<br><br>`;
    }

    html += `
        <strong>Suma total de la secuencia:</strong> ${suma.toLocaleString("es-BO")}<br>
        <strong>Capacidad inicial:</strong> ${baseMixta.toLocaleString("es-BO")}<br>
        <strong>Capacidad final estimada:</strong> ${capacidadFinal.toLocaleString("es-BO")}<br>
        <strong>Costo estimado del plan:</strong> ${costoEstimado.toLocaleString("es-BO")}
    `;

    mostrarResultado(salida, html, true);
}