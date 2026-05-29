document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("siteNav");

    const formPrimos = document.getElementById("form-primos");
    const formFibonacci = document.getElementById("form-fibonacci");
    const formCodigos = document.getElementById("form-codigos");

    const primosInputs = [
        document.getElementById("diaInicioPrimo"),
        document.getElementById("diaFinPrimo"),
        document.getElementById("nombreCicloPrimo")
    ];

    const fiboInputs = [
        document.getElementById("capacidadBaseFibo"),
        document.getElementById("etapasFibo"),
        document.getElementById("valorUnidadFibo")
    ];

    const codigoInputs = [
        document.getElementById("cantidadCodigos"),
        document.getElementById("longitudCodigo"),
        document.getElementById("semillaCodigo"),
        document.getElementById("prefijoCodigo")
    ];

    // Menú responsive
    if (navToggle && siteNav) {
        navToggle.addEventListener("click", function () {
            const isOpen = siteNav.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        siteNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                siteNav.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Vistas previas dinámicas
    primosInputs.forEach(function (input) {
        input.addEventListener("input", actualizarVistaPrimos);
    });

    fiboInputs.forEach(function (input) {
        input.addEventListener("input", actualizarVistaFibonacci);
    });

    codigoInputs.forEach(function (input) {
        input.addEventListener("input", actualizarVistaCodigos);
    });

    actualizarVistaPrimos();
    actualizarVistaFibonacci();
    actualizarVistaCodigos();

    // Formularios
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

    if (formCodigos) {
        formCodigos.addEventListener("submit", function (event) {
            event.preventDefault();
            generarCodigosSeguros();
        });
    }
});

function mostrarResultado(elemento, mensajeHTML, esExito) {
    if (!elemento) return;

    elemento.innerHTML = mensajeHTML;
    elemento.classList.remove("success", "error", "animate");

    if (esExito) {
        elemento.classList.add("success");
    } else {
        elemento.classList.add("error");
    }

    void elemento.offsetWidth;
    elemento.classList.add("animate");
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

function nthPrime(n) {
    let count = 0;
    let candidate = 1;

    while (count < n) {
        candidate++;
        if (esPrimo(candidate)) {
            count++;
        }
    }

    return candidate;
}

function fibonacciByIndex(index) {
    if (index <= 0) return 0;
    if (index === 1) return 1;

    let a = 0;
    let b = 1;

    for (let i = 2; i <= index; i++) {
        const c = a + b;
        a = b;
        b = c;
    }

    return b;
}

function sanitizarPrefijo(valor) {
    const limpio = String(valor || "")
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 4);

    return limpio || "AC";
}

function formatearCodigo(base) {
    const bloques = base.match(/.{1,4}/g);
    return bloques ? bloques.join("-") : base;
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

function actualizarVistaCodigos() {
    const cantidad = document.getElementById("cantidadCodigos").value;
    const longitud = document.getElementById("longitudCodigo").value;
    const semilla = document.getElementById("semillaCodigo").value;
    const prefijo = document.getElementById("prefijoCodigo").value.trim();
    const caja = document.getElementById("previewCodigos");

    caja.innerHTML = `
        <strong>Vista previa:</strong><br>
        Cantidad: <strong>${cantidad || "?"}</strong> ·
        Longitud: <strong>${longitud || "?"}</strong> ·
        Semilla: <strong>${semilla || "?"}</strong> ·
        Prefijo: <strong>${prefijo || "AC"}</strong>
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

function generarCodigosSeguros() {
    const cantidad = parseInt(document.getElementById("cantidadCodigos").value, 10);
    const longitud = parseInt(document.getElementById("longitudCodigo").value, 10);
    const semilla = parseInt(document.getElementById("semillaCodigo").value, 10);
    const prefijo = sanitizarPrefijo(document.getElementById("prefijoCodigo").value);
    const salida = document.getElementById("resultadoCodigos");

    if (![cantidad, longitud, semilla].every(Number.isInteger)) {
        mostrarResultado(salida, "Ingresa valores numéricos válidos.", false);
        return;
    }

    if (cantidad < 1 || cantidad > 12) {
        mostrarResultado(salida, "La cantidad debe estar entre 1 y 12.", false);
        return;
    }

    if (longitud < 6 || longitud > 24) {
        mostrarResultado(salida, "La longitud debe estar entre 6 y 24 caracteres.", false);
        return;
    }

    if (semilla < 1) {
        mostrarResultado(salida, "La semilla debe ser un número mayor que 0.", false);
        return;
    }

    const lista = [];
    const detalle = [];

    for (let i = 0; i < cantidad; i++) {
        const fib = fibonacciByIndex(i + 5);
        const prime = nthPrime(i + 1);
        const baseValue = (semilla + fib) * prime + (i + 1) * 17;

        let cuerpo = (
            baseValue.toString(36).toUpperCase() +
            (fib * prime + semilla).toString(36).toUpperCase() +
            (prime + i).toString(36).toUpperCase()
        ).replace(/[^A-Z0-9]/g, "");

        while (cuerpo.length < longitud) {
            cuerpo += ((baseValue + fib + prime) * 7).toString(36).toUpperCase();
        }

        cuerpo = cuerpo.slice(0, longitud);
        const codigo = `${prefijo}-${formatearCodigo(cuerpo)}`;

        lista.push(codigo);
        detalle.push(`<li><code>${codigo}</code><span>F${i + 1}: ${fib} · P${i + 1}: ${prime}</span></li>`);
    }

    const html = `
        <strong>Códigos generados:</strong><br>
        <ul class="code-list">
            ${detalle.join("")}
        </ul>
    `;

    mostrarResultado(salida, html, true);
}