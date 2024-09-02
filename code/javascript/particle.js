function Particle(x, y, m, ms) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.max_speed = ms;

    this.update = () => {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.max_speed ? this.vel.limit(this.max_speed) : this.vel.mult(0.996);
        this.acc.mult(0);
    };
    this.collide = (particles) => {
        for (p of particles) {
            if (this != p) {
                posdiff = p5.Vector.sub(p.pos, this.pos);
                extension = (this.mass + p.mass) * 5 - posdiff.mag();
                if (extension > 0) {
                    p.pos.add(p5.Vector.setMag(posdiff, extension / 2));
                    this.applyForce(p5.Vector.setMag(posdiff, extension / 2));

                    veldiff = p5.Vector.sub(p.vel, this.vel);
                    m = (2 * p.mass) / (this.mass + p.mass);
                    c = posdiff.mult(
                        (p5.Vector.dot(veldiff, posdiff) * m) /
                            Math.pow(posdiff.mag(), 2)
                    );

                    this.vel.add(c);

                    m = (2 * this.mass) / (this.mass + p.mass);
                    c = posdiff.mult(
                        (p5.Vector.dot(veldiff, posdiff) * m) /
                            Math.pow(posdiff.mag(), 2)
                    );

                    p.vel.sub(c);
                }
            }
        }
    };
    this.display = () => {
        strokeWeight(3);
        circle(this.pos.x, this.pos.y, this.mass * 10);
    };
    this.applyForce = (f) => {
        this.acc.add(p5.Vector.div(f, this.mass));
    };
    this.bounce = () => {
        if (this.pos.x < this.mass * 5) {
            this.pos.x = this.mass * 5;
            this.vel.x *= -1;
        }
        if (this.pos.x > width - this.mass * 5) {
            this.pos.x = width - this.mass * 5;
            this.vel.x *= -1;
        }
        if (this.pos.y < this.mass * 5) {
            this.pos.y = this.mass * 5;
            this.vel.y *= -1;
        }
        if (this.pos.y > height - this.mass * 5) {
            this.pos.y = height - this.mass * 5;
            this.vel.y *= -1;
        }
    };
}

function Spring(p1, p2, l, k) {
    this.p1 = p1;
    this.p2 = p2;
    this.restlen = l;
    this.k = k;

    this.display = () => {
        push();
        strokeWeight(4);
        stroke(240, 60, 0);
        line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
        pop();
    };
    this.update = () => {
        posdiff = p5.Vector.sub(this.p1.pos, this.p2.pos);
        if (posdiff.mag() < this.restlen) {
            this.p1.applyForce(posdiff.setMag(k));
            this.p2.applyForce(posdiff.mult(-1));
        } else if (posdiff.mag() > this.restlen) {
            this.p1.applyForce(posdiff.setMag(-k));
            this.p2.applyForce(posdiff.mult(-1));
        }
    };
}
