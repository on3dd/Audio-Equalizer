let song;
let fft;

let w;

function preload() {
  song = loadSound('assets/feint-time-bomb.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth - 400, 250);
  canvas.parent('canvas-holder');
  canvas.mouseClicked(togglePlay);
  song.setVolume(.1);
  song.play();
  fft = new p5.FFT(0.75, 1024);
  w = width / 64;
}

function draw(){
  background(0);

  // let spectrum = fft.analyze();
  fft.analyze();
  let spectrum = fft.linAverages(64);
  noStroke();
  fill(255,30,30); 
  for (let i = 0; i< spectrum.length; i++){
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    let h = -height + map(amp, 0, 255, height, 0);
    if (h >= -2) {
      h = -2;
    }
    rect(i * w, height, w - 3, h);
  }
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.loop();
    loop();
  }
}