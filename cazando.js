let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

const ANCHO_GATO = 50;
const ALTO_GATO = 50;
const ANCHO_COMIDA = 20;
const ALTO_COMIDA = 20;

let puntos = 0;
let tiempo = 10;
let intervaloTiempo;

function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    graficarGato();
    graficarComida();

    intervaloTiempo = setInterval(restarTiempo, 1000);
}

function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "blue");
}

function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "red");
}

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moverIzquierda() {
    if (tiempo > 0 && puntos < 6) {
        gatoX -= 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverDerecha() {
    if (tiempo > 0 && puntos < 6) {
        gatoX += 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverArriba() {
    if (tiempo > 0 && puntos < 6) {
        gatoY -= 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverAbajo() {
    if (tiempo > 0 && puntos < 6) {
        gatoY += 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function detectarColision() {
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {
        
        puntos += 1;
        cambiarTexto("puntos", puntos);
        
        if (puntos >= 6) {
            clearInterval(intervaloTiempo);
            alert("¡Eres el GANADOR!");
            return;
        }
        
        generarComidaAleatoria();
    }
}

function generarComidaAleatoria() {
    comidaX = Math.floor(Math.random() * (canvas.width - ANCHO_COMIDA));
    comidaY = Math.floor(Math.random() * (canvas.height - ALTO_COMIDA));
    limpiarCanva();
    graficarGato();
    graficarComida();
}

function restarTiempo() {
    tiempo -= 1;
    cambiarTexto("tiempo", tiempo);

    if (tiempo <= 0) {
        clearInterval(intervaloTiempo);
        alert("GAME OVER");
    }
}