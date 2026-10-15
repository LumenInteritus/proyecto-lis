/* =========================================
   CREAR FLORES
   ========================================= */

document.querySelectorAll(".flower-container").forEach((el) => {

    el.innerHTML = `
        <div class="flower-top">

            <div class="flower-petal flower-petal__1"></div>
            <div class="flower-petal flower-petal__2"></div>
            <div class="flower-petal flower-petal__3"></div>
            <div class="flower-petal flower-petal__4"></div>
            <div class="flower-petal flower-petal__5"></div>
            <div class="flower-petal flower-petal__6"></div>
            <div class="flower-petal flower-petal__7"></div>
            <div class="flower-petal flower-petal__8"></div>

            <div class="flower-circle"></div>

            <div class="flower-light flower-light__1"></div>
            <div class="flower-light flower-light__2"></div>
            <div class="flower-light flower-light__3"></div>
            <div class="flower-light flower-light__4"></div>
            <div class="flower-light flower-light__5"></div>
            <div class="flower-light flower-light__6"></div>
            <div class="flower-light flower-light__7"></div>
            <div class="flower-light flower-light__8"></div>

        </div>

        <div class="flower-bottom">

            <div class="flower-stem"></div>

            <div class="flower-leaf flower-leaf__1"></div>
            <div class="flower-leaf flower-leaf__2"></div>
            <div class="flower-leaf flower-leaf__3"></div>
            <div class="flower-leaf flower-leaf__4"></div>
            <div class="flower-leaf flower-leaf__5"></div>
            <div class="flower-leaf flower-leaf__6"></div>

            <div class="flower-grass flower-grass__1"></div>
            <div class="flower-grass flower-grass__2"></div>
            <div class="flower-grass flower-grass__3"></div>
            <div class="flower-grass flower-grass__4"></div>

        </div>
    `;

});


/* =========================================
   ANIMACIÓN DE LAS FLORES
   ========================================= */

const flowers = Array.from(
    document.querySelectorAll(".flower-container")
);

const animatedClass = "animate";


/* Primera flor */

if (flowers.length > 0) {
    flowers[0].classList.add(animatedClass);
}


/* Después aparecen algunas flores */

setTimeout(() => {

    for (
        let i = 1;
        i <= 2 && i < flowers.length;
        i++
    ) {

        flowers[i].classList.add(animatedClass);

    }


    /* Después aparecen las demás
       una por una */

    let remaining = flowers.slice(3);

    const interval = setInterval(() => {

        if (remaining.length === 0) {

            clearInterval(interval);
            return;

        }

        const randomIndex =
            Math.floor(
                Math.random() * remaining.length
            );

        const flower =
            remaining.splice(randomIndex, 1)[0];

        flower.classList.add(animatedClass);

    }, 400);

}, 2500);


/* =========================================
   CORAZONES FLOTANTES
   ========================================= */

const canvas =
    document.getElementById("hearts-canvas");

const ctx =
    canvas.getContext("2d");


let width =
    canvas.width =
    window.innerWidth;

let height =
    canvas.height =
    window.innerHeight;


/* Ajustar al cambiar tamaño */

window.addEventListener("resize", () => {

    width =
        canvas.width =
        window.innerWidth;

    height =
        canvas.height =
        window.innerHeight;

});


/* =========================================
   PARTÍCULAS
   ========================================= */

const particles = [];


const heartColors = [
    "#ff0c46",
    "#ff4d79",
    "#ff7597",
    "#ff2a5f",
    "#ff85a2",
    "#ff0038"
];


/* =========================================
   CLASE DE CORAZÓN
   ========================================= */

class HeartParticle {

    constructor(x, y, isBurst = false) {

        this.x =
            x !== undefined
                ? x
                : Math.random() * width;

        this.y =
            y !== undefined
                ? y
                : height + Math.random() * 40;


        this.size =
            isBurst
                ? Math.random() * 12 + 10
                : Math.random() * 10 + 12;


        this.color =
            heartColors[
                Math.floor(
                    Math.random() *
                    heartColors.length
                )
            ];


        this.alpha =
            isBurst
                ? 1
                : Math.random() * 0.6 + 0.35;


        this.speedY =
            isBurst
                ? (Math.random() - 0.7) * 4
                : Math.random() * 1.2 + 0.7;


        this.speedX =
            isBurst
                ? (Math.random() - 0.5) * 4
                : (Math.random() - 0.5) * 0.6;


        this.wobble =
            Math.random() *
            Math.PI *
            2;


        this.wobbleSpeed =
            Math.random() * 0.04 +
            0.02;


        this.rotation =
            (Math.random() - 0.5) * 0.4;


        this.isBurst =
            isBurst;

    }


    update() {

        this.y -= this.speedY;

        this.wobble +=
            this.wobbleSpeed;

        this.x +=
            this.speedX +
            Math.sin(this.wobble) * 0.6;


        if (this.isBurst) {

            this.alpha -= 0.015;

        }
        else if (this.y < -40) {

            this.y =
                height + 20;

            this.x =
                Math.random() * width;

            this.alpha =
                Math.random() * 0.6 +
                0.35;

        }

    }


    draw() {

        if (this.alpha <= 0)
            return;


        ctx.save();


        ctx.translate(
            this.x,
            this.y
        );


        ctx.rotate(
            this.rotation +
            Math.sin(this.wobble) *
            0.15
        );


        ctx.globalAlpha =
            this.alpha;


        ctx.fillStyle =
            this.color;


        ctx.shadowColor =
            this.color;


        ctx.shadowBlur =
            12;


        const s =
            this.size;


        ctx.beginPath();


        ctx.moveTo(
            0,
            -s * 0.2
        );


        ctx.bezierCurveTo(
            -s * 0.5,
            -s * 0.6,
            -s * 0.9,
            -s * 0.1,
            0,
            s * 0.7
        );


        ctx.bezierCurveTo(
            s * 0.9,
            -s * 0.1,
            s * 0.5,
            -s * 0.6,
            0,
            -s * 0.2
        );


        ctx.closePath();


        ctx.fill();


        ctx.restore();

    }

}


/* =========================================
   CORAZONES INICIALES
   ========================================= */

for (let i = 0; i < 18; i++) {

    particles.push(
        new HeartParticle(
            Math.random() * width,
            Math.random() * height
        )
    );

}


/* =========================================
   GENERAR NUEVOS CORAZONES
   ========================================= */

setInterval(() => {

    if (particles.length < 22) {

        const flowerX =
            width / 2 +
            (Math.random() - 0.5) *
            (width * 0.5);


        const flowerY =
            height * 0.75 +
            (Math.random() - 0.5) *
            80;


        particles.push(
            new HeartParticle(
                flowerX,
                flowerY
            )
        );

    }

}, 1200);


/* =========================================
   EXPLOSIÓN DE CORAZONES
   ========================================= */

function spawnBurst(
    x,
    y,
    count = 20
) {

    for (let i = 0; i < count; i++) {

        particles.push(
            new HeartParticle(
                x,
                y,
                true
            )
        );

    }

}


/* =========================================
   ANIMACIÓN DEL CANVAS
   ========================================= */

function animateCanvas() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            particles[i];


        particle.update();
        particle.draw();


        if (
            particle.isBurst &&
            particle.alpha <= 0
        ) {

            particles.splice(i, 1);

        }

    }


    requestAnimationFrame(
        animateCanvas
    );

}


animateCanvas();


/* =========================================
   CLICK = EXPLOSIÓN
   ========================================= */

window.addEventListener(
    "click",
    (event) => {

        spawnBurst(
            event.clientX,
            event.clientY,
            16
        );

    }
);