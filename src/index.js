import {Scene, 
        WebGLRenderer,
        Mesh, 
        OrthographicCamera, 
        MeshStandardMaterial,
        BoxGeometry,
        IcosahedronGeometry,
        PlaneGeometry,
        Color,
        PointLight,
        AmbientLight,
        TextureLoader,
        NearestFilter,
      } from 'three'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';

function radToDeg(angle){return((angle*180)/Math.PI)}
function degToRad(angle){return((angle/180)*Math.PI)}


class World{
  constructor(){
    this.canvas = document.getElementById("glCanvas");
    this._viewport = {height: this.canvas.clientWidth / 2, 
                      width: this.canvas.clientHeight / 2,
                      aspect: this.canvas.clientWidth/this.canvas.clientHeight,
                      zoom: 4
                    };
    this.time = 0; 
    this.init();
    this.render();
    //this.initEventHandlers();
  }
  
  init(){
    this.initScene();
    this.renderer = new WebGLRenderer({
      antialias: false,
      canvas: this.canvas
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio/2);
    this.renderer.shadowMap.enabled = true;

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
  }

  initScene(){
    const isoAngle = 1.22474487139; 
    this.texture = new TextureLoader().load("src/checker.png");
    this.texture.minFilter = NearestFilter; 
    this.texture.magFilter = NearestFilter; 
    this.scene = new Scene();
    this.scene.background = new Color( 0x151515 );
    this.geometry1 = new BoxGeometry();
    this.geometry2 = new PlaneGeometry(4,4);
    this.geometry3 = new IcosahedronGeometry(0.7);
    this.material1 = new MeshStandardMaterial({
      map: this.texture,
      color: 0xc0ff60,
      flatShading: true,
    });
    this.material2 = new MeshStandardMaterial({
      map: this.texture,
      color: 0xbc3a3a,
      flatShading: true,
    });
    this.material3 = new MeshStandardMaterial({
      color: 0x404040,
      flatShading: true,
    });
    this.mesh1 = new Mesh(this.geometry1, this.material2);
    this.mesh1.castShadow = true;
    this.mesh1.receiveShadow = true;
    this.mesh1.position.z = -0.5;
    this.mesh1.position.x = -0.5;
    this.mesh2 = new Mesh(this.geometry2, this.material1);
    this.mesh2.castShadow = true;
    this.mesh2.receiveShadow = true;
    this.mesh2.rotateX(degToRad(270));
    this.mesh2.position.y = -0.5;
    this.mesh3 = new Mesh(this.geometry3, this.material3);
    this.mesh3.castShadow = true;
    this.mesh3.receiveShadow = true;
    this.mesh3.position.z = -1;
    this.mesh3.position.x = 1;
    this.light1 = new PointLight(0xff8f47, 1.5);
    this.light2 = new PointLight(0x7ec4f1, 1.5);
    this.light1.castShadow = true;
    this.light1.position.y = 5;
    this.light2.castShadow = true;
    this.light2.position.x = 0;
    this.light2.position.y = 5;
    this.light2.position.z = 10;
    this.ambientlight1 = new AmbientLight(0x455045);
    this.camera = new OrthographicCamera( this._viewport.aspect * -this._viewport.zoom, 
                                          this._viewport.aspect * this._viewport.zoom, 
                                          this._viewport.zoom, 
                                          - this._viewport.zoom, 
                                          1, 1000);
    this.camera.position.x = isoAngle*5
    this.camera.position.y = 5
    this.camera.position.z = isoAngle*5
    this.camera.lookAt(0,0,0);
    this.scene.add(this.camera, this.mesh1, this.mesh2, this.mesh3, this.light1, this.light2, this.ambientlight1);
  }

  initEventHandlers(){
    window.addEventListener('resize', () => {
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
      this.camera.updateProjectionMatrix();
      
    })
  }

  render(){
    this.time+=0.03; 
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
    this.light1.position.x=(Math.sin(this.time)*4);
    this.light1.position.z=(Math.cos(this.time)*4);
    //this.light2.position.x=(Math.sin(this.time+3.14)*4);
    //this.light2.position.z=(Math.cos(this.time+3.14)*4);
  }
}

new World()