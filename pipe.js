// based on
// video link: https://youtu.be/cXgA1d_E-jY& by // Daniel Shiffman // http://codingtra.in

// refactoring to three.js by Sahand Babali // sahandbabali.com

function Pipe(bird) {
  this.spacing = 250;
  this.top = randomInt(this.spacing, height);
  this.bottom = this.top - this.spacing;
  this.x = width;
  this.w = 60;
  this.speed = 2;

  this.hits = function (bird) {
    if (bird.y > this.top - 20 || bird.y < this.bottom + 20) {
      if (
        bird.x > this.x - this.w / 2 - 20 &&
        bird.x < this.x + this.w / 2 + 20
      ) {
        return true;
      }
    }

    return false;
  };

  this.show = function () {
    // top side of the pipes
    let boxtopheight = height - this.top;
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(this.w, boxtopheight, 60),
      new THREE.MeshLambertMaterial({
        color: "#75c00e",
      })
    );
    box.name = "boxema";
    if (this.highlight) {
      box.material.color = "red";
    }

    box.position.set(this.x, (this.top + height) / 2, 0);

    // bottom side of the pipes

    const box2 = new THREE.Mesh(
      new THREE.BoxGeometry(this.w, this.bottom, 60),
      new THREE.MeshLambertMaterial({
        color: "#75c00e",
      })
    );

    box2.position.set(this.x, this.bottom / 2, 0);
    scene.add(box, box2);
  };

  this.update = function () {
    this.x -= this.speed;
  };

  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  };
}
