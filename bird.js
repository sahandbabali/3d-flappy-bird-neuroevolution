// based on
// video link: https://youtu.be/cXgA1d_E-jY& by // Daniel Shiffman // http://codingtra.in

// refactoring to three.js by Sahand Babali // sahandbabali.com

function Bird(brain) {
  this.y = height/2;
  this.x = 64;

  this.gravity = - 0.7;
  this.lift = 20;
  this.velocity = 0;
  this.score = 0;
  this.fitness = 0


  if(brain){
    this.brain = brain.copy()
  } else {
    this.brain = new NeuralNetwork(5,5,1);

  }


  this.think = function(pipes){
    let inputs = []
    inputs[0] = this.y / height;
    inputs[1] = this.velocity;
    inputs[2] = pipes[0].top / height
    inputs[3] = pipes[0].bottom / height
    inputs[4] = pipes[0].x / width



    let output = this.brain.predict(inputs)
   // console.log(output[0] )
    if(output[0] > 0.5) {
      this.up()
    }


  }


this.mutate = function (){
  this.brain.mutate(0.1)

}


  this.show = function() {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(20, 4, 4),
      new THREE.MeshBasicMaterial({
        color: '#e1cf0b',
      })
    )

    sphere.name = "player";
    // sphere.position.y = 3
    scene.add(sphere)
    sphere.position.set(this.x, this.y, 0)
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.score++;
  
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    // if (this.y > height) {
    //   this.y = height;
    //   this.velocity = 0;
    // }

    // if (this.y < 0) {
    //   this.y = 0;
    //   this.velocity = 0;
    // }

  }

}
