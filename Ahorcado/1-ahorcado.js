document.addEventListener('DOMContentLoaded', () => { 
    const pantallaMenu = document.getElementById('pantalla-menu');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const selectorDificultad = document.getElementById('selector-dificultad');
    const botonJugar = document.getElementById('boton-jugar');
    const botonReiniciar = document.getElementById('boton-reiniciar');
    const botonVolver = document.getElementById('boton-volver');
    const lienzoAhorcado = document.getElementById('lienzoAhorcado');
    const palabraMostrada = document.getElementById('palabra-mostrada');
    const letrasDiv = document.getElementById('letras');
    const mensajeDiv = document.getElementById('mensaje');
    const nivelActual = document.getElementById('nivel-actual');
    const contexto = lienzoAhorcado.getContext('2d');

    let dificultadSeleccionada = '';
    let palabraElegida = '';
    let letrasAdivinadas = [];
    let fallos = 0;
    const maxFallos = 6;

    const palabras = {
        facil: [
            "luna", "fuego", "gato", "mar", "sol",
            "vino", "nube", "rio", "pan", "cielo",
            "flor", "taza", "paz", "tren", "luz",
            "pato", "llave", "fruta", "pez", "mano"
        ],
        medio: [
            "planeta", "avion", "tormenta", "escuela", "camiseta",
            "playa", "bosque", "puente", "carro", "zapato",
            "espejo", "ventana", "cuaderno", "montana", "pelota",
            "almohada", "sombrero", "ciudad", "carreta", "reloj"
        ],
        dificil: [
            "astronauta", "murcielago", "hipopotamo", "marioneta", "subterraneo",
            "telescopio", "arqueologia", "ornitorrinco", "psicologia", "anfitrion",
            "triciclo", "helicoptero", "escalofrio", "fotografia", "catarata",
            "biblioteca", "murmullo", "paralelepipedo", "microondas", "dragon"
        ]
    };

    selectorDificultad.addEventListener('click', (evento) => {
        if (evento.target.tagName === 'BUTTON') {
            dificultadSeleccionada = evento.target.dataset.dificultad;
            [...selectorDificultad.querySelectorAll('button')].forEach(btn => btn.classList.remove('active'));
            evento.target.classList.add('active');
        }
    });


    botonJugar.addEventListener('click', () => {
        if (dificultadSeleccionada) {
            pantallaMenu.style.display = 'none';
            pantallaJuego.style.display = 'block';
            iniciarJuego();
        } else {
            alert('Selecciona una dificultad antes de jugar.');
        }
    });

    botonReiniciar.addEventListener('click', () => {
        iniciarJuego();
        botonReiniciar.style.display = 'none';
        botonVolver.style.display = 'none';
    });

    botonVolver.addEventListener('click', () => {
        pantallaJuego.style.display = 'none';
        pantallaMenu.style.display = 'block';
        botonVolver.style.display = 'none';
        botonReiniciar.style.display = 'none';
        palabraMostrada.textContent = '';
        letrasDiv.innerHTML = '';
        mensajeDiv.textContent = '';
        nivelActual.textContent = '';
        contexto.clearRect(0, 0, lienzoAhorcado.width, lienzoAhorcado.height);
    });

    function iniciarJuego() {
        palabraElegida = palabras[dificultadSeleccionada][Math.floor(Math.random() * palabras[dificultadSeleccionada].length)];
        letrasAdivinadas = [];
        fallos = 0;

        nivelActual.textContent = `Dificultad: ${dificultadSeleccionada.toUpperCase()}`;
        mensajeDiv.textContent = '';
        dibujarAhorcado();
        mostrarPalabra();
        generarLetras();
    }

    function dibujarAhorcado() {
        contexto.clearRect(0, 0, lienzoAhorcado.width, lienzoAhorcado.height);
        contexto.beginPath();
        contexto.strokeStyle = '#00796b';
        contexto.lineWidth = 3;

        // Base
        contexto.moveTo(20, 380); contexto.lineTo(180, 380);
        contexto.moveTo(60, 380); contexto.lineTo(60, 50);
        contexto.moveTo(60, 50); contexto.lineTo(250, 50);
        contexto.moveTo(250, 50); contexto.lineTo(250, 100);
        contexto.stroke();

        contexto.strokeStyle = '#000000ff';

        if (fallos > 0) {
            contexto.beginPath();
            contexto.arc(250, 130, 30, 0, Math.PI * 2);
            contexto.stroke();
        }
        if (fallos > 1) {
            contexto.moveTo(250, 160); contexto.lineTo(250, 250);
            contexto.stroke();
        }
        if (fallos > 2) {
            contexto.moveTo(250, 180); contexto.lineTo(220, 220);
            contexto.stroke();
        }
        if (fallos > 3) {
            contexto.moveTo(250, 180); contexto.lineTo(280, 220);
            contexto.stroke();
        }
        if (fallos > 4) {
            contexto.moveTo(250, 250); contexto.lineTo(220, 300);
            contexto.stroke();
        }
        if (fallos > 5) {
            contexto.moveTo(250, 250); contexto.lineTo(280, 300);
            contexto.stroke();
        }
    }

    function mostrarPalabra() {
        let mostrar = '';
        for (let letra of palabraElegida) {
            mostrar += letrasAdivinadas.includes(letra) ? letra + ' ' : '_ ';
        }
        palabraMostrada.textContent = mostrar.trim();
    }

    function generarLetras() {
        letrasDiv.innerHTML = '';
        const abecedario = 'abcdefghijklmnopqrstuvwxyz';
        for (let letra of abecedario) {
            const boton = document.createElement('button');
            boton.textContent = letra;
            boton.addEventListener('click', () => verificarLetra(letra, boton));
            letrasDiv.appendChild(boton);
        }
    }

    function verificarLetra(letra, boton) {
        if (letrasAdivinadas.includes(letra)) return;

        letrasAdivinadas.push(letra);

        if (palabraElegida.includes(letra)) {
            boton.classList.add('correcta');
            mostrarPalabra();
            if (palabraElegida.split('').every(l => letrasAdivinadas.includes(l))) {
                mensajeDiv.textContent = 'Ganaste :D';
                deshabilitarLetras();
                botonReiniciar.style.display = 'inline-block';
                botonVolver.style.display = 'inline-block';
            }
        } else {
            boton.classList.add('incorrecta');
            fallos++;
            dibujarAhorcado();
            if (fallos >= maxFallos) {
                mensajeDiv.textContent = 'Perdiste mi bro la palabra era: ' + palabraElegida;
                deshabilitarLetras();
                botonReiniciar.style.display = 'inline-block';
                botonVolver.style.display = 'inline-block';
            }
        }
    }

    function deshabilitarLetras() {
        const botones = document.querySelectorAll('#letras button');
        botones.forEach(boton => boton.disabled = true);
    }
    dibujarAhorcado();
});