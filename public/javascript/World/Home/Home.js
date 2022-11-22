import * as THREE from 'three';
import * as JS from '../Helpers/JSElement.js';

import { hideHomeFloor,  showHomeFloor  } from '../Helpers/Animations.js';

import { showNavbarAndLinks, showHeroBanner } from '../Helpers/Animations.js';
import { getTime} from '../../Utils/Helpers.js';
import EventEmitter from '../../Utils/EventEmitter.js';
import Resources from '../../Resources.js';
import { data } from '../../Data.js';


export class Home extends EventEmitter{



    /**
     *      CONSTRUCTOR
     * @param {*} _options 
     */

    constructor(_options){

        super();

        //options

        this.scene = _options.scene;
        this.time= _options.time;
        _options.resources = data.region.home;

          this.resources = new Resources(_options, 'home');
        this.light = _options.light;


        this.params = {
            active: false,
            visible : true,
            initialized : false
        }



        this.startTime = new Date;

        //actions

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('world');
            this.debugFolder.open();

            this.resources.on('progress', (..._progress)=>{

                console.log('progress', _progress);
            })
        }
        
  

        this.resources.on('readyHome', ()=>{

            this.setTargetLight();
            this.setParams();
            this.setFloorMesh();
            this.setFloorPosition();
            this.animate();


        })




        getTime(this.startTime, new Date, 'load home');
   



    }




    /**
     * 
     */
    setTargetLight(){

        this.light[1].setTargetPosition({x:2, y:4, z:1});

    }



    /**
     *              FLOOR
     */

    setParams(){

        this.floorParams = {
            initialPosition : {
                x:  -6,
                y: -3,
                z: -5
            },
            finalPosition : {
                x: 2,
                y: 0,
                z: 0
            },
            //loaded: false,
            masked: true

        }

    }


    
    /**
     * 
     */
     animate(){


        this.light[1].setIntensity(800,2,0);
        this.showFloor();
        this.animateNavAndLinks();
        this.updateFloorPosition();
        this.floorParams.masked = false;

    }




    /**
     * 
     */
    setFloorMesh(){

        let floorGeometry = new THREE.PlaneBufferGeometry(8,12,1,50);


        this.generateMipMaps(this.resources.items.flouTexture, false);
        this.generateMipMaps(this.resources.items.basecolorTexture, false);


         this.floorMaterial = new THREE.MeshPhysicalMaterial({
            alphaMap: this.resources.items.flouTexture,
            map: this.resources.items.basecolorTexture,
            transparent: true,
            depthTest: true,
            opacity: 0

        })

       
        this.customUniforms = {
            uTime :{value :0},

        };


        // CUSTOMIZE MATERIAL

        this.floorMaterial.onBeforeCompile = (shader)=>{

            shader.uniforms.uTime = this.customUniforms.uTime;

            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>', 
                `#include <common>
                
                    uniform float uTime;`
                
                
                );

           shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>', 
            `#include <begin_vertex>
            
            
            transformed.z = (sin(uTime + transformed.y)) /4.;`

            );

        }


        //MESH
        this.floorMesh = new THREE.Mesh(floorGeometry, this.floorMaterial);
        this.floorMesh.name = "home floor";

        


    }

    /**
     * 
     */
    setFloorPosition(){

        // rotation
        this.floorMesh.rotateX(-Math.PI *0.4);
        this.floorMesh.rotateZ(-Math.PI *0.3);

        // position
        this.floorMesh.position.x = this.floorParams.initialPosition.x;
        this.floorMesh.position.y = this.floorParams.initialPosition.y;
        this.floorMesh.position.z = this.floorParams.initialPosition.z;


        //add to scene
        this.scene.add(this.floorMesh);



    }





    /**
     * 
     * @param {*} movement 
     */

    updateFloorPosition(movement){

        this.time.on('tick', ()=>{



            if(this.floorParams.masked == false && this.params.visible == true){

                
                JS.movement.x *=0.95;
                JS.movement.y *=0.95;
    
                this.customUniforms.uTime.value = this.time.elapsed / (3000);
    
                if (!this.floorParams.masked ) {
                    this.floorMesh.position.x = this.floorParams.finalPosition.x - JS.movement.x;
                    this.floorMesh.position.y = this.floorParams.finalPosition.y + JS.movement.y;
      
                }
    
    
    
                if (this.floorMaterial.opacity < 1) {
                    this.floorMaterial.opacity += 0.01;
                    this.floorMaterial.needsUpdate = true;
                }
    



            }

        }, 'home');

        
    }


    /**
     * 
     */
    removeTick(){


        this.time.offCallback('tick', 'home');



    }


    /**
     * 
     * @param {*} target 
     * @param {*} value 
     */
    generateMipMaps(target, value){


        target.generateMipMaps = value;


    }




    /**
     * 
     */
    showFloor(){

        this.floorMesh.visible = true;

        showHomeFloor(this.floorMesh, this.floorParams.initialPosition,  this.floorParams.finalPosition, null);


    }



    /**
     * 
     */
    hideFloor(){

        hideHomeFloor(this.floorMesh,  this.floorParams.finalPosition, this.floorParams.initialPosition, null);

        this.floorParams.masked = true;

 
    }



    /**
     *                      NAV AND LINKS
     */

    animateNavAndLinks(){

        //animate navbar and links
        showNavbarAndLinks();

        //animate title and subtitle
        showHeroBanner(
            ()=>{
               this.trigger('loaded');

               if (this.params.initialized == false) {
                
                    this.params.initialized = true;
                    this.trigger('initialized');
               }
            }

        );


    }



}