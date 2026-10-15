function iniciarPastel() {
    const cv = document.getElementById('cPastel');
    const ctx = cv.getContext('2d');

    const $ = id => document.getElementById(id);

const TIEMPO_ANTES_DE_CLIC = 9;

// Tiempo desde que enciende la vela
// hasta que comienza el desvanecimiento
const TIEMPO_ESPERA_FINAL = 15;

// Duración del desvanecimiento
const TIEMPO_DESVANECER = 3;
    
/* =========================================
   CONFIGURACIÓN
========================================= */

const C = {
    pink: '#FFB6D9',
    hot: '#FF8FB5',
    cream: '#FFD6A5',
    amber: '#FFB347',
    brown: '#6B4E2E',
    blue: '#7AC7FF'
};

let start = performance.now();
let click = null;

/* =========================================
   ESTRELLAS DEL FONDO
========================================= */

const estrellas = document.getElementById("estrellasPastel");

for(let i = 0; i < 70; i++){

    const estrella = document.createElement("div");

    estrella.className = "estrellaPastel";

    if(Math.random() > 0.88){
        estrella.classList.add("grande");
    }

    estrella.style.left =
        `${Math.random() * 100}%`;

    estrella.style.top =
        `${Math.random() * 100}%`;

    estrella.style.animationDelay =
        `${Math.random() * -4}s`;

    estrella.style.animationDuration =
        `${2 + Math.random() * 4}s`;

    estrellas.appendChild(estrella);
}

/* =========================================
   FUNCIONES GENERALES
========================================= */

const clamp = (x, a = 0, b = 1) =>
    Math.min(b, Math.max(a, x));

function bounce(x) {

    const n = 7.5625;
    const d = 2.75;

    if (x < 1 / d)
        return n * x * x;

    if (x < 2 / d) {
        x -= 1.5 / d;
        return n * x * x + .75;
    }

    if (x < 2.5 / d) {
        x -= 2.25 / d;
        return n * x * x + .9375;
    }

    x -= 2.625 / d;
    return n * x * x + .984375;
}

const R = (x, y, w, h, c) => {

    ctx.fillStyle = c;

    ctx.fillRect(
        Math.round(x),
        Math.round(y),
        w,
        h
    );
};


/* =========================================
   PISOS DEL PASTEL
========================================= */

const tiers = [

    {
        w: 56,
        top: 70,
        h: 18,
        t0: 2,
        s: 0
    },

    {
        w: 40,
        top: 56,
        h: 14,
        t0: 3,
        s: 2
    },

    {
        w: 26,
        top: 44,
        h: 12,
        t0: 4,
        s: 4
    }

];


/* =========================================
   CREAR PISO
========================================= */

function tier(o, t, p) {

    if (t < o.t0)
        return;

    const dy =
        -110 *
        (1 - bounce(
            clamp(
                (t - o.t0) / .9
            )
        ));

    const x = 48 - o.w / 2;
    const y = o.top + dy;

    const w = o.w;
    const h = o.h;


    /* cuerpo */

    R(
        x + 1,
        y,
        w - 2,
        h,
        C.cream
    );

    R(
        x,
        y + 1,
        w,
        h - 2,
        C.cream
    );


    /* base dorada */

    R(
        x + 1,
        y + h - 2,
        w - 2,
        2,
        C.amber
    );


    /* detalles */

    for (
        let i = x + 4;
        i < x + w - 4;
        i += 4
    ) {

        R(
            i,
            y + h * .62,
            2,
            1,
            C.amber
        );

    }


    /* glaseado */

    for (
        let i = 0;
        i < w;
        i++
    ) {

        const wave =
            .5 +
            .5 *
            Math.sin(
                i * .8 + o.s
            );

        const L =
            Math.min(
                3 +
                Math.round(
                    p *
                    (1 + 4 * wave)
                ),
                h - 3
            );

        R(
            x + i,
            y,
            1,
            L,
            C.hot
        );

        R(
            x + i,
            y,
            1,
            2,
            C.pink
        );

    }

}


/* =========================================
   VELA
========================================= */

function candle(t) {

    if (t < 8)
        return;

    const dy =
        -60 *
        (
            1 -
            bounce(
                clamp(t - 8)
            )
        );


    for (
        let r = 0;
        r < 10;
        r++
    ) {

        R(
            47,
            34 + dy + r,
            3,
            1,
            (r >> 1) % 2
                ? '#fff'
                : C.blue
        );

    }

    R(
        48,
        33 + dy,
        1,
        1,
        C.brown
    );

}


/* =========================================
   LLAMA
========================================= */

function flame(f, tt) {

    const h =
        Math.round(
            3 +
            7 * f +
            Math.sin(tt * 6) * .5
        );

    const hw = f * 1.6;


    for (
        let k = 0;
        k < h;
        k++
    ) {

        const s =
            Math.sin(
                Math.PI *
                Math.pow(
                    (k + 1) /
                    (h + 1),
                    .75
                )
            );

        const half =
            Math.round(
                hw * s * .9
            );

        const y = 32 - k;


        R(
            48 - half,
            y,
            2 * half + 1,
            1,
            C.amber
        );


        if (half >= 1) {

            R(
                48 - half + 1,
                y,
                2 * half - 1,
                1,
                '#FFDD77'
            );

        }


        if (half >= 2) {

            R(
                48 - half + 2,
                y,
                2 * half - 3,
                1,
                '#FFF6CC'
            );

        }

    }

}


/* =========================================
   DESTELLO
========================================= */

function spark(c) {

    const s =
        clamp(
            1 -
            Math.abs(c - 1.5) * 1.6
        );

    if (s <= 0)
        return;


    ctx.globalAlpha = s;


    R(
        48,
        31,
        1,
        1,
        '#FFF6CC'
    );

    R(
        47,
        31,
        1,
        1,
        C.amber
    );

    R(
        49,
        31,
        1,
        1,
        C.amber
    );

    R(
        48,
        30,
        1,
        1,
        C.amber
    );

    R(
        48,
        32,
        1,
        1,
        C.amber
    );


    ctx.globalAlpha = 1;

}


/* =========================================
   BRILLO
========================================= */

function glow(g) {

    const gr =
        ctx.createRadialGradient(
            48,
            30,
            0,
            48,
            44,
            52
        );

    gr.addColorStop(
        0,
        `rgba(255,170,60,${.5 * g})`
    );

    gr.addColorStop(
        1,
        'rgba(255,140,40,0)'
    );


    ctx.fillStyle = gr;

    ctx.fillRect(
        0,
        0,
        96,
        96
    );

}


/* =========================================
   LUZ
========================================= */

function light(g) {

    ctx.globalCompositeOperation =
        'lighter';


    const gr =
        ctx.createRadialGradient(
            48,
            34,
            0,
            48,
            50,
            34
        );


    gr.addColorStop(
        0,
        `rgba(255,150,40,${.2 * g})`
    );

    gr.addColorStop(
        1,
        'rgba(255,150,40,0)'
    );


    ctx.fillStyle = gr;

    ctx.fillRect(
        0,
        0,
        96,
        96
    );


    ctx.globalCompositeOperation =
        'source-over';

}


/* =========================================
   CHISPAS
========================================= */

const sp =
    [...Array(14)]
    .map((_, i) => ({

        x: 10 + ((i * 37) % 76),

        y: 12 + ((i * 53) % 60),

        c:
            [
                C.amber,
                C.hot,
                C.blue
            ][i % 3],

        o: i

    }));


function sparks(g, now) {

    sp.forEach(s => {

        const a =
            g *
            clamp(
                Math.sin(
                    now / 500 +
                    s.o * 1.7
                ) *
                .8 +
                .4
            );


        if (a <= 0)
            return;


        ctx.globalAlpha = a;


        R(
            s.x,
            s.y,
            1,
            1,
            s.c
        );


        if (s.o % 3 === 0) {

            R(
                s.x - 1,
                s.y,
                1,
                1,
                s.c
            );

            R(
                s.x + 1,
                s.y,
                1,
                1,
                s.c
            );

            R(
                s.x,
                s.y - 1,
                1,
                1,
                s.c
            );

            R(
                s.x,
                s.y + 1,
                1,
                1,
                s.c
            );

        }

    });


    ctx.globalAlpha = 1;

}

/* =========================================
   ANIMACIÓN PRINCIPAL
========================================= */

function loop(now) {

    const t =
        (now - start) / 1000;

    const c =
        click == null
            ? -1
            : (now - click) / 1000;


    /*
       Después de 90 segundos
       de haber encendido la vela.
    */

    ctx.clearRect(
        0,
        0,
        96,
        96
    );


    ctx.save();

    ctx.translate(
        0,
        5
    );


    const g =
        c < 0
            ? 0
            : clamp(
                (c - 4) / 4
            ) *
            (
                .9 +
                .1 *
                Math.sin(
                    now / 300
                )
            );


    if (g > 0)
        glow(g);


    tiers.forEach(o =>
        tier(
            o,
            t,
            clamp(
                (t - 5) / 3
            )
        )
    );


    candle(t);


    /*
       La llama solamente aparece
       después del clic.
    */

    if (c >= 1) {

        spark(c);


        const f =
            c < 2
                ? .25
                : .25 +
                  .75 *
                  clamp(
                      (c - 2) / 2
                  );


        flame(
            f,
            now / 1000
        );

    }


    if (g > 0) {

        light(g);

        if (c > 8)
            sparks(g, now);

    }


    ctx.restore();

    /*
       Desaparición del pastel
       justo antes de cambiar.
    */

const fade =
    click !== null
        ? clamp(
            (c - TIEMPO_ESPERA_FINAL) /
            TIEMPO_DESVANECER
        )
        : 0;

// Bajar el volumen junto con la desaparición del pastel.
if (window.musicaFondo) {
    window.musicaFondo.volume = 0.15 * (1 - fade);
}

    cv.style.opacity =
        1 - fade;


    /*
       Indicación
    */

    $('hintPastel').style.opacity =
        (
            t >= TIEMPO_ANTES_DE_CLIC &&
            click === null
        )
            ? clamp(
                t -
                TIEMPO_ANTES_DE_CLIC
            )
            : 0;


    /*
       Felicitación
    */

    $('titlePastel').style.opacity =
        click === null
            ? 0
            : clamp(
                (c - 8) / 3
            ) *
            (1 - fade);


const brilloEstrellas =
    click === null
        ? 0.28
        : 0.28 +
          clamp(c / TIEMPO_ESPERA_FINAL) * 0.45;

$('estrellasPastel').style.opacity =
    brilloEstrellas;

if (
    click !== null &&
    c >= TIEMPO_ESPERA_FINAL + TIEMPO_DESVANECER
) {
    window.location.href = "final.html";
    return;
}

    requestAnimationFrame(loop);

} // Cierra loop()


/* =========================================
   CLIC SOBRE LA VELA
========================================= */

cv.addEventListener(
    'click',
    e => {

        const tiempoActual =
            (performance.now() - start) / 1000;

        if (
            click !== null ||
            tiempoActual < TIEMPO_ANTES_DE_CLIC
        ) {
            return;
        }

        const rect =
            cv.getBoundingClientRect();

        const x =
            (e.clientX - rect.left) /
            rect.width *
            96;

        const y =
            (e.clientY - rect.top) /
            rect.height *
            96;

        const velaX =
            x >= 43 &&
            x <= 53;

        const velaY =
            y >= 28 &&
            y <= 48;

        if (
            velaX &&
            velaY
        ) {
            click = performance.now();
        }

    }
);


/* =========================================
   INICIAR
========================================= */

requestAnimationFrame(loop);
}