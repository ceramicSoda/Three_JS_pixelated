import {Scene, 
        WebGLRenderer,
        Mesh, 
        OrthographicCamera, 
        MeshNormalMaterial,
        BoxBufferGeometry,
        Color} from 'three'

class World{
  
  constructor(){
    this.canvas = document.getElementById("glCanvas");
    this._viewport = {height: this.canvas.clientWidth / 2, 
                      width: this.canvas.clientHeight / 2,
                      aspect: this.canvas.clientWidth/this.canvas.clientHeight,
                      zoom: 3
                    };
    this.init();
    this.render();
  }

  initEventListeners() {
    window.addEventListener('resize', () => {
      this._viewport.width = window.innerWidth
      this._viewport.height = window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this._viewport.width, this._viewport.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
  }
  
  init(){
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
    this.camera.position.x = Math.sqrt(2)*100; 
    this.camera.position.y = 100; 
    this.camera.position.z = Math.sqrt(2)*100;
    this.camera.lookAt(this.mesh.position);
    this.scene.add(this.camera);
    this.scene.add(this.mesh)

    this.renderer = new WebGLRenderer({
      antialias: false,
      canvas: this.canvas
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio/8);
  }

  render(){
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
    //this.mesh.rotateX(+0.01);
  }
}

new World();