import { BoxGeometry, Color, Mesh, MeshBasicMaterial, Vector3 } from "three";

export class Cell
{
  geometry: BoxGeometry;
  material: MeshBasicMaterial;
  mesh: Mesh;

  constructor(position: Vector3, size: number, color: Color)
  {
    this.geometry = new BoxGeometry(size, size, size);
    this.geometry.center();
    this.material = new MeshBasicMaterial({ color });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, position.y, position.z);
  }
 }