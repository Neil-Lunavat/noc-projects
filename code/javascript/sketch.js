// TODO: Make soft body simulation in Euler physics
let particles = [];
let springs = [];

function setup() {
    createCanvas(400, 400);
    particles[0] = new Particle(150, 350, 2, 0);
    particles[1] = new Particle(150, 250, 2, 0);
    particles[2] = new Particle(250, 250, 2, 0);
    particles[3] = new Particle(250, 350, 2, 0);

    gravity = createVector(0, 0.9);
    springs[0] = new Spring(particles[0], particles[1], 100, 4);
    springs[1] = new Spring(particles[1], particles[2], 100, 4);
    springs[2] = new Spring(particles[2], particles[3], 100, 4);
    springs[3] = new Spring(particles[3], particles[0], 100, 4);
}
function draw() {
    background(127);

    for (let s of springs) {
        s.update();
        s.display();
    }
    for (let p of particles) {
        if (mouseIsPressed) p.applyForce(createVector(0.5, 0));
        p.applyForce(gravity);
        p.collide(particles);
        p.bounce();
        p.display();
        p.update();
    }
}
