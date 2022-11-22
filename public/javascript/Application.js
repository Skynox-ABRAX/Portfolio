import * as THREE from 'three';
//import * as dat from 'dat.gui';


import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import World from './World/_World.js';
import Camera from './Camera.js';
import Light from './Light.js';
import Scene from './Scene.js';

import { data } from './Data.js';


//import { datGUI } from './Utils/datGUI.js';
import { getTime } from './Utils/Helpers.js';


export default class Application{

    constructor(_options){


        //options
        this.$canvas = _options.$canvas;

        // Set up
        this.time = new Time();
        this.sizes = new Sizes();
        this.data = data;

        this.startTime = new Date;

        this.setConfig();
        this.setDebug();
        this.setScene();
        this.setLight();
        this.setRenderer();
        this.setCamera();

        //getTime(this.startTime, new Date, 'load config');

        this.setWorld();

        this.time.on('tick', () =>
            {

                this.renderer.render(this.scene, this.camera.instance);

            
            }, 'application')


          //datGUI();

    }


    /**
     * Set config
     */
    setConfig()
    {
        this.config = {};
        this.config.debug = window.location.hash === '#debug';


        //axis helpers
        this.config.axisHelper =  {};
        this.config.axisHelper.IsActive = true;


        //camera helpers
        this.config.cameraHelper= {};
        this.config.cameraHelper.IsActive = true;


        //lights helpers
        this.config.lights = {}
        this.config.lights.spotLightHelper = {};
        this.config.lights.spotLightHelper.IsActive = false;

        this.config.lights.ambientLight = {};
        this.config.lights.ambientLight.IsActive = true;


    }

    /**
     * Set debug
     */
    setDebug()
    {
        // if(this.config.debug)
        // {
        //     this.debug = new dat.GUI({ width: 300 });
        // }

    }



     /**
     * Set Scene
     */

     setScene(){

        //set up
        this.scene = new Scene({
            debug: this.debug
        }).instance;



        //grid Helper

        if (this.debug) {

            const size = 100;
            const divisions = 100;

            this.gridHelper = new THREE.GridHelper( size, divisions );
            this.gridHelper.IsActive = true;

            this.gridHelper.update = ()=> {

                if (!this.gridHelper.IsActive) {
                    
                    this.scene.remove( this.gridHelper );
                }else{

                    this.scene.add( this.gridHelper);
                }

            }

           
            this.scene.debugSceneFolder.add(this.gridHelper, 'IsActive').name('Grid Helper - active').onChange(this.gridHelper.update);
            this.scene.add( this.gridHelper );

        }


    
     }


     /**
      *         set light
      */

     setLight(){

        this.lights = new Light({
            debug: this.debug,
            lights: ['ambient', 'spot'],
            scene: this.scene,
            config: this.config
        }).instances;


        this.lights.forEach((light) => {
            
            if (!light.debug) {

                this.scene.add(light);
            }


        })


    }


     /**
     * Set renderer
     */
      setRenderer()
      {
         
  
          // Renderer
          this.renderer = new THREE.WebGLRenderer({
              canvas: this.$canvas,
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance'
              
          });




          
          this.renderer.setClearColor(0x000000, 0);
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height);
          this.renderer.physicallyCorrectLights = true;
          this.renderer.gammaOutPut = true;
          this.renderer.outputEncoding = THREE.sRGBEncoding;
          this.renderer.autoClear = false;
          this.renderer.shadowMap.enabled = true;
 
          // Resize event
          this.sizes.on('resize', () =>
          {
            
              //console.log(this.sizes);
              this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height);

          })



      }
  
    /**
     * Set camera
     */
     setCamera()
     {
         this.camera = new Camera({
             time: this.time,
             sizes: this.sizes,
             renderer: this.renderer,
             debug: this.debug,
             config: this.config
         });
 
         this.scene.add(this.camera.container);


     }

    /**
     * Set axis
     */
    
    setAxes(){

        this.axis = new THREE.AxesHelper();
        this.axis.IsActive = this.config.axisHelper.IsActive;

        //debug
        if (this.debug) {
        
            this.axis.update = ()=>{

            if (!this.axis.IsActive) {
                    
                this.scene.remove( this.axis );
            }else{

                this.scene.add( this.axis);
            }

            this.scene.debugSceneFolder.add(this.axis, 'IsActive').name('Axis Helper - active').onChange(this.axis.update);

            }
        
            this.axis.update();
        }

    }






    /**
     * Set world
     */
    setWorld()
    {
        this.world = new World({
            config: this.config,
            debug: this.debug,
            resources: this.resources,
            time: this.time,
            light: this.lights,
            sizes: this.sizes,
            camera: this.camera,
            scene: this.scene,
            renderer: this.renderer,
            data : this.data

        });


        this.scene.add(this.world.container);

    }


    /**
     * Set title
     */
    setTitle()
    {
        this.title = {};
        this.title.frequency = 300;
        this.title.width = 20;
        this.title.position = 0;
        this.title.$element = document.querySelector('title');
        this.title.absolutePosition = Math.round(this.title.width * 0.25);


        window.setInterval(() =>
        {
            this.title.position = Math.round(this.title.absolutePosition % this.title.width);

            document.title = `____Test Three JS___`;
        }, this.title.frequency)

    }

     
    /**
     * Destructor
     */
    destructor()
    {
        this.time.off('tick')
        this.sizes.off('resize')

        this.camera.orbitControls.dispose()
        this.renderer.dispose()
        this.debug.destroy()
    }


}