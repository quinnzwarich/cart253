class Wall extends Curtain {
  constructor(x, z, rotation) {
    super(x, z, rotation);
    this.polygons = (columns * 100);
  }
}
