import THREE, { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TextureLoader, Vector3, WebGLRenderer } from "three";
import { GUI } from 'dat.gui';
import Grid from "./Grid";


export class App
{
    private camera: PerspectiveCamera;
    private scene: Scene;
    private grid: Grid;
    private renderer: WebGLRenderer;

    /**
     * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
     */
    constructor()
    {
        this.scene = new Scene();
        this.camera = this.setupCamera();
        this.renderer = this.setupRenderer();
        this.setupGUI();
        this.grid = this.setupGrid();
        this.animate();
    }

    private setupGrid() {
        const grid = new Grid(new Vector3(0, 0, 0), 11, 11, 1);
        this.scene.add(grid.group);
        return grid;
    }

    private setupRenderer() {
        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0); // the default
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        return renderer;
    }

    private setupCamera() {
        const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;
        window.addEventListener("resize", this.onWindowResize.bind(this), false);
        return camera;
    }

    private setupGUI() {
        const gui = new GUI()
        const cubeFolder = gui.addFolder("Cube")
        cubeFolder.add(this.camera.position, "x", -50, 50, 0.1)
        cubeFolder.add(this.camera.position, "y", -50, 50, 0.1)
        cubeFolder.add(this.camera.position, "z", -50, 50, 0.1)
        cubeFolder.open()
    }

    private onWindowResize(): void
    {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate(): void
    {
        requestAnimationFrame(this.animate.bind(this));
        this.grid.group.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
}

new App();