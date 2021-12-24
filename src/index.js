import {Scene, 
        WebGLRenderer,
        Mesh, 
        OrthographicCamera, 
        MeshNormalMaterial,
        BoxBufferGeometry,
        Color} from 'three'

function radToDeg(angle){return((angle*180)/Math.PI)}
function degToRad(angle){return((angle/180)*Math.PI)}


class World{
  constructor(){
    this.canvas = document.getElementById("glCanvas");
    this._viewport = {height: this.canvas.clientWidth / 2, 
                      width: this.canvas.clientHeight / 2,
                      aspect: this.canvas.clientWidth/this.canvas.clientHeight,
                      zoom: 2
                    };
    this.init();
    this.render();
  }
  
  init(){
    const isoAngle = 1.22474487139; 
    this.angleX = 0;
    this.scene = new Scene();
    this.scene.background = new Color( 0x101520 );
    this.geometry = new BoxBufferGeometry(2,2,2);
    this.material = new MeshNormalMaterial();
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.rotateY(0);
    this.camera = new OrthographicCamera( this._viewport.aspect * -this._viewport.zoom, 
                                          this._viewport.aspect * this._viewport.zoom, 
                                          this._viewport.zoom, 
                                          - this._viewport.zoom, 
                                          1, 1000);
    //this.camera.position.x = -6.143725; 
    this.camera.position.x = isoAngle*5
    //this.camera.position.y = 5; 
    this.camera.position.y = 5
    //this.camera.position.z = -6.143725;
    this.camera.position.z = isoAngle*5
    this.camera.lookAt(this.mesh.position);
    this.scene.add(this.camera);
    this.scene.add(this.mesh)

    this.renderer = new WebGLRenderer({
      antialias: false,
      canvas: this.canvas
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio/4);
  }

  render(){
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
    //this.mesh.rotateY(+0.01);
  }
}

new World();