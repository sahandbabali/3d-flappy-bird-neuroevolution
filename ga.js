function nextGeneration() {
//   generation++;
//   document.getElementById("generationcounter").innerText = generation;

  calculateFitness();
  console.log("next generation");
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
}

function pickOne() {
  let index = 0;
  let r = Math.random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += bird.score;
  }
  for (let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}
