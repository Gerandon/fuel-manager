import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import * as Three from 'three';

// https://medium.com/geekculture/hello-cube-your-first-three-js-scene-in-angular-176c44b9c6c0

@Component({
    selector: 'app-three-example',
    templateUrl: './three-example.component.html',
    styleUrls: ['./three-example.component.scss']
})
export class ThreeExampleComponent implements OnInit {

    @ViewChild('cubeCanvas', {static: true})
    private _canvas: ElementRef;

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.cube.rotation.y = event.x/800;
        this.cube.rotation.x = event.y/1000;
    }

    /**
     * Cube props
     */
    @Input() public rotationSpeedX: number = 0.02;
    @Input() public rotationSpeedY: number = 0.01;
    @Input() public size: number = 200;
    @Input() public texture: string = "/assets/images/forgalmi.jpg";

    /**
     * Stage Props
     */
    @Input() public cameraZ: number = 100;
    @Input() public fieldOfView: number = 1;
    @Input() public nearClippingPlane: number = 1;
    @Input() public farClippingPlane: number = 1000;

    /**
     * Helper props
     */
    private camera!: Three.PerspectiveCamera;

    private get canvas(): HTMLCanvasElement {
        return this._canvas.nativeElement;
    }

    private loader: Three.TextureLoader;
    //The rendered shape, boxGeometry is the most basic
    private readonly geometry: Three.BoxGeometry;
    /**
     * Texture, color, Opacity, etc.
     * MeshLambertMaterial - simpliest that cares about light
     */
    private readonly material: Three.MeshBasicMaterial;
    private readonly cube: Three.Mesh;
    private renderer!: Three.WebGLRenderer;
    private scene!: Three.Scene;

    constructor() {
        this.loader = new Three.TextureLoader();
        this.geometry = new Three.BoxGeometry(1, 1, 1);
        this.material = new Three.MeshBasicMaterial({map: this.loader.load(this.texture)});
        this.cube = new Three.Mesh(this.geometry, this.material);
    }

    ngOnInit(): void {
        this.createScene();
        this.startRenderingLoop();
    }

    private createScene() {
        this.scene = new Three.Scene();
        // this.scene.background = new Three.Color(0x000000);
        this.scene.add(this.cube);

        const aspectRatio = this.getAspectRatio();
        this.camera = new Three.PerspectiveCamera(
            this.fieldOfView,
            aspectRatio,
            this.nearClippingPlane,
            this.farClippingPlane
        );
        this.camera.position.z = this.cameraZ;
    }

    private startRenderingLoop() {
        this.renderer = new Three.WebGLRenderer({canvas: this.canvas, alpha: true});
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        const component: ThreeExampleComponent = this;

        (function render() {
            requestAnimationFrame(render);
            //component.animateCube();
            component.renderer.render(component.scene, component.camera);
        }());
    }

    private getAspectRatio(): number {
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }

    private animateCube() {
        this.cube.rotation.x += this.rotationSpeedX;
        this.cube.rotation.y += this.rotationSpeedY;
    }
}
