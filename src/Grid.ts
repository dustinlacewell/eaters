import { BoxGeometry, Color, Group, Mesh, MeshBasicMaterial, MeshNormalMaterial, SphereGeometry, Vector3 } from "three";
import { Cell } from "./Cell";

export default class Grid {
  width: number;
  height: number;
  size: number;

  position: Vector3;
  group: Group;
  cells: Cell[] = [];

  constructor(
    position: Vector3,
    width: number,
    height: number,
    size: number = 1
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.size = size;

    this.group = new Group();
    this.cells = this.generate();
    this.addSphere();

  }

  private addSphere() {
    const geometry = new BoxGeometry(1, 1, 2);
    geometry.center();
    const material = new MeshBasicMaterial({ color: 'black'});
    const sphere = new Mesh(geometry, material);
    this.group.add(sphere);
  }

  public generate() {
    const grid = [];
    const offset = new Vector3((this.width - 1) * 0.5 * this.size, (this.height - 1) * 0.5 * this.size, 0.0);
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const pos = new Vector3(x * this.size, y * this.size, 0).sub(offset);
        const color = new Color();
        color.setHSL(Math.random(), 1, .5)
        const newCell = new Cell(pos, this.size, color);
        this.group.add(newCell.mesh);
        grid.push(newCell);
      }
    }
    return grid;
  }

  public getCell(x: number, y: number) {
    return this.cells[y * this.width + x];
  }
}
