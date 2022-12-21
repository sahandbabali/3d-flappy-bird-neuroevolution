// based on
// video link: https://youtu.be/cXgA1d_E-jY& by // Daniel Shiffman // http://codingtra.in

// refactoring to three.js by Sahand Babali // sahandbabali.com

function Pipe(bird) {
  this.spacing = 250;
  this.top = Math.random() * 200 + 400;
  this.bottom = this.top - 300 - this.spacing;
  this.x = width;
  this.w = 60;
  this.speed = 2;


  this.hits = function (bird) {
    if (bird.y > this.top - 150 - 20 || bird.y < this.bottom + 150 + 20) {
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
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(this.w, 300, 60),
      new THREE.MeshLambertMaterial({
        color: "#75c00e",
      })
    );
    box.name = "boxema";
    if (this.highlight) {
      box.material.color = "red";
    }

    box.position.set(this.x, this.top, 0);

    const box2 = new THREE.Mesh(
      new THREE.BoxGeometry(this.w, 300, 60),
      new THREE.MeshLambertMaterial({
        color: "#75c00e",
      })
    );

    scene.add(box, box2);
    box2.position.set(this.x, this.bottom, 0);
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
