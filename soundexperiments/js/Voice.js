class Voice {
  constructor() {
    this.melodyFrequency = 0;
    this.harmonyFrequency = [65.41, 73.41, 82.41, 87.31, 98, 110, 123.97, 130.81, 146.83, 164.81, 174.61];
    this.numChords = 7;
    this.modDepth = 150;
    this.harmony;
    this.modulator;
  }

  harmonies(pitch) {
    this.harmony = new p5.Oscillator(`sine`);
    this.harmony.freq(pitch);
    // this.harmony.freq(this.modulator);
  }

  modulator() {
    this.modulator = new p5.Oscillator(784, `sine`);
    this.modulator.amp(this.modDepth);
    this.modulator.disconnect();
  }

  // melody() {
  //   let envelope = new p5.Envelope();
  //   let melodicVoice = new p5.Oscillator(`triangle`);
  //
  //   envelope.setADSR(0.001, 0.25, 0, 0.5);
  //
  //   melodicVoice.amp(envelope);
  //   melodicVoice.freq(this.melodyFrequency);
  // }
}
