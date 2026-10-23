/* =========================================
   ESTRELLAS
   ========================================= */

const contenedorEstrellas =
    document.querySelector(".estrellas");

const cantidadEstrellas = 500;


for (let i = 0; i < cantidadEstrellas; i++) {

    const estrella =
        document.createElement("div");

    estrella.classList.add("estrella");


    /* Posición */

    const posicionX =
        Math.random() * 100;

    const posicionY =
        Math.random() * 100;


    estrella.style.left =
        `${posicionX}%`;

    estrella.style.top =
        `${posicionY}%`;


    /* Tamaño */

    const tamanio =
        Math.random() * 2 + 0.6;


    estrella.style.width =
        `${tamanio}px`;

    estrella.style.height =
        `${tamanio}px`;


    /* Animaciones desfasadas */

    estrella.style.animationDelay =
        `${Math.random() * -18}s, ${Math.random() * -4}s`;


    /* Estrellas especiales */

    const tipo =
        Math.random();


    if (tipo > 0.90) {

        estrella.classList.add("grande");

    }


    if (tipo > 0.96) {

        estrella.classList.add("destello");

    }


    contenedorEstrellas.appendChild(
        estrella
    );

}


/* =========================================
   CONTADOR
   ========================================= */

/*
   Cumpleaños de Lis:
   16 de octubre de 2026
*/

const fechaCumple =
    new Date("2026-10-23T01:00:00");


const dias =
    document.getElementById("dias");

const horas =
    document.getElementById("horas");

const minutos =
    document.getElementById("minutos");

const segundos =
    document.getElementById("segundos");


function actualizarContador() {

    const ahora =
        new Date();


    const diferencia =
        fechaCumple - ahora;


    if (diferencia <= 0) {

        dias.textContent = "00";
        horas.textContent = "00";
        minutos.textContent = "00";
        segundos.textContent = "00";

        return;

    }


    const totalSegundos =
        Math.floor(
            diferencia / 1000
        );


    const cantidadDias =
        Math.floor(
            totalSegundos / 86400
        );


    const cantidadHoras =
        Math.floor(
            (totalSegundos % 86400) / 3600
        );


    const cantidadMinutos =
        Math.floor(
            (totalSegundos % 3600) / 60
        );


    const cantidadSegundos =
        totalSegundos % 60;


    dias.textContent =
        String(cantidadDias)
            .padStart(2, "0");


    horas.textContent =
        String(cantidadHoras)
            .padStart(2, "0");


    minutos.textContent =
        String(cantidadMinutos)
            .padStart(2, "0");


    segundos.textContent =
        String(cantidadSegundos)
            .padStart(2, "0");

}


actualizarContador();


setInterval(
    actualizarContador,
    1000
);


/* =========================================
   ELEMENTOS
   ========================================= */

const portada =
    document.getElementById("portada");

const transicion =
    document.getElementById("transicion");

const carta =
    document.getElementById("carta");

const botonAbrir =
    document.getElementById("botonAbrir");

const botonCosas =
    document.getElementById("botonCosas");

const lluviaSnoopy =
    document.getElementById("lluviaSnoopy"); 
    console.log("LLUVIA SNOOPY:", lluviaSnoopy);

const mensajes = document.getElementById("mensajes");

const botonPastel = document.getElementById("botonPastel");

/* =========================================
   TARJETAS DE MENSAJES
   ========================================= */

const tarjetasMensaje =
    document.querySelectorAll(".tarjeta-mensaje");


tarjetasMensaje.forEach((tarjeta) => {

    tarjeta.addEventListener("click", () => {

        tarjeta.classList.toggle("abierta");

    });

});

/* =========================================
   ABRIR PASTEL INTEGRADO
========================================= */

botonPastel.addEventListener("click", () => {
    document.getElementById("pagina").style.display = "none";

    const escena = document.getElementById("escenaPastel");
    escena.style.display = "flex";

    if (window.musicaFondo) {
        window.musicaFondo.volume = 0.15;
        window.musicaFondo.play().catch(() => {});
    }

    iniciarPastel();
});


/* =========================================
   MODO DE PRUEBA
   ========================================= */

/*
   true:
   La transición aparece automáticamente
   después de unos segundos.

   false:
   La página esperará hasta el cumpleaños.
*/

const modoPrueba = true;


/* =========================================
   ACTIVAR TRANSICIÓN
   ========================================= */

function activarTransicion() {

    portada.classList.add("oculta");

    setTimeout(() => {

        transicion.classList.add("activa");

    }, 1200);

}


/* =========================================
   PRUEBA
   ========================================= */

if (modoPrueba) {

    setTimeout(() => {

        activarTransicion();

    }, 3000);

}


/* =========================================
   ABRIR CARTA
   ========================================= */

botonAbrir.addEventListener(
    "click",
    () => {

        /* Quitamos transición */

        transicion.classList.remove(
            "activa"
        );


        /* Mostramos carta */

        setTimeout(() => {

            carta.classList.add(
                "visible"
            );

        }, 1000);

    }
);

/* =========================================
   LLUVIA DE SNOOPY
   ========================================= */

const imagenesSnoopy = [

    "img/snoopy-lluvia-1.png",
    "img/snoopy-lluvia-2.png",
    "img/snoopy-lluvia-3.png",
    "img/snoopy-lluvia-4.png",
    "img/snoopy2.png",
    "img/snoopy-joe-cool.png",
    "img/stitch.png",
    "img/stitch2.png",
    "img/stitch3.png",
    "img/stitch4.png",
    "img/stitch5.png",
];


function crearLluviaSnoopy() {

    lluviaSnoopy.innerHTML = "";


    const ancho =
        window.innerWidth;

    const alto =
        window.innerHeight;


    /*
       Cuanto menor sea la celda,
       más Snoopys tendremos.
    */

    const tamanoCelda = 100;


    const columnas =
        Math.ceil(ancho / tamanoCelda) + 3;


    const filas =
        Math.ceil(alto / tamanoCelda) + 3;


    const espacioX =
        ancho / columnas;


    const espacioY =
        alto / filas;


    /*
       Creamos una cuadrícula completa.
       Los Snoopys se superponen para
       evitar espacios vacíos.
    */

    for (
        let fila = 0;
        fila < filas;
        fila++
    ) {

        for (
            let columna = 0;
            columna < columnas;
            columna++
        ) {

            const snoopy =
                document.createElement("img");


            /*
               Imagen aleatoria
            */

            const indice =
                Math.floor(
                    Math.random() *
                    imagenesSnoopy.length
                );


            snoopy.src =
                imagenesSnoopy[indice];


            snoopy.classList.add(
                "snoopy-lluvia"
            );


            /*
               Tamaño
            */

            const escala =
                1.3 +
                Math.random() * 0.8;


            const anchoSnoopy =
                espacioX * escala;


            snoopy.style.width =
                `${anchoSnoopy}px`;


            /*
               Posición
            */

            const x =
                columna * espacioX
                -
                anchoSnoopy * 0.2
                +
                (Math.random() - 0.5)
                *
                espacioX
                *
                0.5;


            const y =
                fila * espacioY
                -
                anchoSnoopy * 0.2
                +
                (Math.random() - 0.5)
                *
                espacioY
                *
                0.5;


            snoopy.style.left =
                `${x}px`;

            snoopy.style.top =
                `${y}px`;


            /*
               Rotación aleatoria
            */

            const rotacion =
                -25 +
                Math.random() * 50;


            snoopy.style.transform =
                `rotate(${rotacion}deg)`;


            /*
               Entrada ligeramente
               desfasada
            */

            snoopy.style.animationDelay =
                `${Math.random() * 0.35}s`;

                snoopy.style.setProperty(
    "--retraso-salida",
    `${(filas - fila) * 0.08 + Math.random() * 0.15}s`
);

            lluviaSnoopy.appendChild(
                snoopy
            );

        }

    }

}


/* =========================================
   ACTIVAR LLUVIA
   ========================================= */

botonCosas.addEventListener("click", () => {

    crearLluviaSnoopy();

    botonCosas.style.opacity = "0";
    botonCosas.style.pointerEvents = "none";

    lluviaSnoopy.classList.remove("saliendo");
    lluviaSnoopy.classList.add("activa");

    setTimeout(() => {
        lluviaSnoopy.classList.add("saliendo");
    }, 2500);

setTimeout(() => {
    lluviaSnoopy.classList.remove("activa", "saliendo");
    lluviaSnoopy.innerHTML = "";
    mensajes.classList.add("visible");
}, 5500);

});

