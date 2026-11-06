const titulos = [
    "Periódico",
    "Bordes",
    "Cambio de fondo",
    "Captcha",
    "Historia",
    "Encuesta",
    "Proyecto",
    "Registro de estudiantes",
    "Elimina imágenes",
    "Agrega imagen",
    "Vídeo",
    "Tarjetas en 3 d",
    "Práctica",
    "Menú de comida preferida",
    "Reproductor de música",
    "Tamaño de texto",
    "Traductor",
    "Juego",
    "Agrega info",
    "Carrusel de efecto",
    "Agrega 5 imágenes",
    "Infografía xp"
];

const contenedor = document.getElementById("hojas");
const cubierta = document.getElementById("cubierta");
const libro = document.getElementById("libro");

const TOTAL_HOJAS = 12;
let hojas = [];
let posicion = 0;

function crearIndice() {
    return `
        <h2>ÍNDICE DE PRÁCTICAS</h2>
        <div class="indice">
            ${titulos.map((titulo, i) => `
                <div class="indice-item">
                    ${i + 1}. ${titulo}
                </div>
            `).join("")}
        </div>
    `;
}

function crearPagina(numero) {
    const titulo = titulos[numero - 1];

    return `
        <h2>${titulo}</h2>
        <div class="contenedor-imagen">
            <img
                src="./img/img-${numero}.jpeg"
                alt="${titulo}"
                loading="eager"
                onerror="this.parentElement.innerHTML='<p style=&quot;color:#9b2452;text-align:center;font-size:13px&quot;>No se pudo cargar img-${numero}.jpeg</p>'"
            >
        </div>
        <div class="numero-pagina">
            Página ${numero}
        </div>
    `;
}

function crearLibro() {
    for (let i = 0; i < TOTAL_HOJAS; i++) {
        let frente = "";
        let reverso = "";

        if (i === 0) {
            frente = `
                <div class="final">
                    <h2>¡BIENVENIDO!</h2>
                    <p>Mi libro de prácticas digitales</p>
                    <p>✦ ✧ ✦</p>
                </div>
            `;
            reverso = crearIndice();
        } else {
            const numero1 = (i * 2) - 1;
            const numero2 = i * 2;

            frente = crearPagina(numero1);
            reverso = crearPagina(numero2);
        }

        const hoja = document.createElement("div");
        hoja.className = "hoja";

        hoja.innerHTML = `
            <div class="cara frente">${frente}</div>
            <div class="cara reverso">${reverso}</div>
        `;

        contenedor.appendChild(hoja);
        hojas.push(hoja);
    }

    actualizarHojas();
}

function actualizarHojas() {
    hojas.forEach((hoja, i) => {
        if (i < posicion) {
            hoja.classList.add("volteada");
            hoja.style.zIndex = i + 1;
        } else {
            hoja.classList.remove("volteada");
            hoja.style.zIndex = TOTAL_HOJAS - i;
        }
    });
}

cubierta.addEventListener("click", function() {
    if (posicion === 0) {
        cubierta.classList.add("abierta");
        posicion = 1;

        setTimeout(() => {
            cubierta.style.zIndex = 0;
            actualizarHojas();
        }, 600);
    }
});

libro.addEventListener("click", function(event) {
    if (event.target.closest("#cubierta")) return;
    if (!cubierta.classList.contains("abierta")) return;

    const rect = libro.getBoundingClientRect();
    const mitad = rect.left + rect.width / 2;

    if (event.clientX > mitad) {
        avanzar();
    } else {
        regresar();
    }
});

function avanzar() {
    if (posicion < TOTAL_HOJAS) {
        hojas[posicion].classList.add("volteada");
        posicion++;
        actualizarHojas();
    } else {
        cerrarLibro();
    }
}

function regresar() {
    if (posicion > 1) {
        posicion--;
        hojas[posicion].classList.remove("volteada");
        actualizarHojas();
    }
}

function cerrarLibro() {
    posicion = 0;

    hojas.forEach(hoja => {
        hoja.classList.remove("volteada");
    });

    cubierta.style.display = "block";
    cubierta.style.zIndex = 100;
    cubierta.classList.remove("abierta");

    actualizarHojas();
}

crearLibro();