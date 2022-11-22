import * as THREE from 'three';

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import EventEmitter from './Utils/EventEmitter';


import { moveEaseCamera } from './World/Helpers/Animations';

export default class Camera extends EventEmitter{

        constructor(_options){


        super();

        // Options
        this.time = _options.time;
        this.sizes = _options.sizes;
        this.renderer = _options.renderer;
        this.debug = _options.debug;
        this.config = _options.config;

        // Set up
        this.container = new THREE.Object3D();
        this.container.name = 'camera container';
        this.container.matrixAutoUpdate = false;

        this.target = new THREE.Vector3(0, 0, 0);
        this.targetEased = new THREE.Vector3(0, 0, 0);
        this.easing = 0.15;


        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('camera');
            //this.debugFolder.open()
        }


        this.setAngle();
        this.setInstance();
        this.setZoom();
        //this.setOrbitControls();



        }


        setAngle(){

            // Set up
            this.angle = {};


        }

        setZoom(){





        }


        setInstance()
        {
            



            this.fov = 40;
            this.aspect = this.sizes.viewport.width / this.sizes.viewport.height;
            this.near = 1;
            this.far = 20;


            // Set up
            this.instance = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
            this.instance.position.set(0,1,6);
            this.instance.zoom = 1;
            this.instance.lookAt(0,0,0);

            this.container.add(this.instance)

            //params camera position

            this.instance.params={
                homePosition: {
                    x: 0,
                    y: 1,
                    z: 6
                },
                workPosition:{
                    x: 0,
                    y: 5,
                    z: 10
                },
                contactPosition:{
                    x: 0,
                    y: -1,
                    z: 0
                },
                nearPosition: {
                    x: 0,
                    y: 1,
                    z: 6
                },
                farPosition:{
                    x: 0,
                    y: 2,
                    z: 10
                }

            };

    
            // // Resize event
            this.sizes.on('resize', () =>
            {
                this.instance.aspect = this.sizes.viewport.width / this.sizes.viewport.height;
                this.instance.updateProjectionMatrix();
                
            })
    
            this.instance.update = ()=>{

                this.instance.updateProjectionMatrix();


                if(this.cameraHelper){

                    if (!this.cameraHelper.instance.IsActive) {
                        
                        this.container.remove( this.cameraHelper.instance);
                    }else{
        
                        this.container.add( this.cameraHelper.instance);
                    }

                }
            }

            
            this.instance.update();



            if(this.debug){

                this.cameraHelper = {};
                this.cameraHelper.instance = new THREE.CameraHelper(this.instance);
                this.cameraHelper.instance.IsActive = this.config.cameraHelper.IsActive;
                this.container.add(this.cameraHelper.instance);


                this.debugFolder.add(this.instance, 'zoom').min(-10).max(10).step(0.01).name('zoom').onChange(this.instance.update);
                this.debugFolder.add(this.instance.position, 'x').min(-50).max(50).step(0.001).name('position - x').onChange(this.instance.update);
                this.debugFolder.add(this.instance.position, 'y').min(-50).max(50).step(0.001).name('position - y').onChange(this.instance.update);
                this.debugFolder.add(this.instance.position, 'z').min(-50).max(50).step(0.001).name('position - z').onChange(this.instance.update);
                this.debugFolder.add(this.instance, 'fov').min(0).max(80).step(0.001).name('fov').onChange(this.instance.update);
                this.debugFolder.add(this.instance, 'near').min(0).max(20).step(0.001).name('near').onChange(this.instance.update);
                this.debugFolder.add(this.instance, 'far').min(0).max(4000).step(1).name('far').onChange(this.instance.update);
                this.debugFolder.add(this.cameraHelper.instance, 'IsActive').name('Helper').onChange(this.instance.update);



            }


        /**
         *                  MOVE CAMERA
         */

        this.instance.moveCamera = (target, position, duration, delay, ease, startCallback, updateCallback, completeCallback)=>{


            moveEaseCamera(target, position, duration, delay, ease,startCallback,updateCallback,completeCallback)
            

            }

        }








        /**
         *                  ORBIT CONTROLS
         */


        setOrbitControls()
        {
            // Set up
            this.orbitControls = new OrbitControls(this.instance, this.renderer.domElement);
            this.orbitControls.enabled = true;
            this.orbitControls.enableKeys = false;
            this.orbitControls.zoomSpeed = 0.5;
            this.orbitControls.enableDamping = true;

            this.orbitControls.target.set(0,0,0);

    
            // Debug
            if(this.debug)
            {
                this.debugFolderOrbit =  this.debugFolder.addFolder('orbitControls');
                //this.debugFolderOrbit.open();
                this.debugFolderOrbit.add(this.orbitControls, 'enabled').name('orbitControlsEnabled');
                this.debugFolderOrbit.add(this.orbitControls.target, 'x').min(-10).max(10).step(0.01).name('position - x')
                this.debugFolderOrbit.add(this.orbitControls.target, 'y').min(-10).max(10).step(0.01).name('position - y')
                this.debugFolderOrbit.add(this.orbitControls.target, 'z').min(-10).max(10).step(0.01).name('position - z')


            }
        }



}