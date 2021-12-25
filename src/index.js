import {Scene, 
        WebGLRenderer,
        Mesh, 
        OrthographicCamera, 
        MeshPhysicalMaterial,
        BoxGeometry,
        Color,
        SpotLight,
        AmbientLight,
        TextureLoader,
        NearestFilter} from 'three'

function radToDeg(angle){return((angle*180)/Math.PI)}
function degToRad(angle){return((angle/180)*Math.PI)}


class World{
  constructor(){
    this.canvas = document.getElementById("glCanvas");
    this._viewport = {height: this.canvas.clientWidth / 2, 
                      width: this.canvas.clientHeight / 2,
                      aspect: this.canvas.clientWidth/this.canvas.clientHeight,
                      zoom: 1
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
    this.renderer.setPixelRatio(window.devicePixelRatio/8);
  }

  initScene(){
    const isoAngle = 1.22474487139; 
    this.texture = new TextureLoader().load("src/checker.png");
    this.texture.minFilter = NearestFilter; 
    this.texture.magFilter = NearestFilter; 
    this.scene = new Scene();
    this.scene.background = new Color( 0x151515 );
    //this.geometry = new IcosahedronGeometry(1,1);
    this.geometry = new BoxGeometry();
    this.material = new MeshPhysicalMaterial({
      map: this.texture,
      color: 0x888888,
      flatShading: true,
      roughness: 0.3,
      reflectivity: 1,
    });
    this.mesh = new Mesh(this.geometry, this.material)
    this.spotlight1 = new SpotLight(0xff8f47, 3);
    this.spotlight2 = new SpotLight(0x7ec4f1, 3);
    this.ambientlight1 = new AmbientLight(0x455045);
    this.camera = new OrthographicCamera( this._viewport.aspect * -this._viewport.zoom, 
                                          this._viewport.aspect * this._viewport.zoom, 
                                          this._viewport.zoom, 
                                          - this._viewport.zoom, 
                                          1, 1000);
    this.camera.position.x = isoAngle*5
    this.camera.position.y = 5
    this.camera.position.z = isoAngle*5
    this.camera.lookAt(this.mesh.position);
    this.scene.add(this.camera, this.mesh, this.spotlight1, this.spotlight2, this.spotlight3, this.ambientlight1);
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
    this.spotlight1.position.x=(Math.sin(this.time)*3);
    this.spotlight1.position.z=(Math.cos(this.time)*3);
    this.spotlight2.position.x=(Math.sin(this.time+3.14)*3);
    this.spotlight2.position.z=(Math.cos(this.time+3.14)*3);
  }
}

new World();