import THREE, { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from "three";
import { GUI } from 'dat.gui';


export class App
{
    private camera: PerspectiveCamera;
    private scene: Scene;
    private mesh: Mesh;
    private renderer: WebGLRenderer;

    /**
     * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
     */
    constructor()
    {
        this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 400;

        this.scene = new Scene();

        const texture = new TextureLoader().load("images/textures/crate.gif");
        const geometry = new BoxGeometry(200, 200, 200);
        const material = new MeshBasicMaterial({ map: texture });

        this.mesh = new Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearColor(0x000000, 0); // the default
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        this.setupGUI();

        window.addEventListener("resize", this.onWindowResize.bind(this), false);

        this.animate();
    }

    private setupGUI() {
        const gui = new GUI()
        const cubeFolder = gui.addFolder("Cube")
        cubeFolder.add(this.mesh.position, "x", -50, 50, 0.1)
        cubeFolder.add(this.mesh.position, "y", -50, 50, 0.1)
        cubeFolder.add(this.mesh.position, "z", -50, 50, 0.1)
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

        this.mesh.rotation.x += 0.005;
        this.mesh.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }
}

new App();