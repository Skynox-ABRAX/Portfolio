
import * as THREE from 'three';
import gsap from 'gsap';
import * as JS from '../javascript/World/Helpers/JSElement';


export default class Light{


    constructor(_options){


        //options
        this.debug= _options.debug;
        this.scene = _options.scene;
        this.config = _options.config;

        //set up
        this.instances = [];

        this.parameters = {};
        this.parameters.ambient={};
        this.parameters.spotLight ={};
        this.parameters.directional ={};


        //colors
        this.parameters.ambient.color = 0xffffff;
        this.parameters.spotLight.color = 0xffffff;


         // Debug
         if(this.debug)
         {
             this.debugFolder = this.debug.addFolder('lights');
             this.debugFolder.open()
         }

         

        _options.lights.forEach((element) => {
            
            switch (element){
     
                case 'ambient':

                this.setAmbientLight();
                break;


                case 'spot':
    
                this.setSpotLight();
                break;
                
                case 'hemisphere':
    
                this.setHemisphereLight();
                break;
                
                case 'directional':
    
                this.setDirectionalLight();
                break;

                default:
                    break;


            }

        });

     


    }



    /*
    *  Ambient Light
    */
    setAmbientLight(){

        this.ambient ={};


        //set up
        this.ambient.instance = new THREE.AmbientLight(this.parameters.ambient.color, 2);

        if (this.config.lights.ambientLight.IsActive) {
            
            this.instances.push(this.ambient.instance);
        }



        //update
        this.ambient.update = () => {

            this.ambient.instance.color = new THREE.Color( this.parameters.ambient.color)

        }

        this.ambient.update();


        // Debug
        if(this.debug)
        {

            this.ambient.instance.IsActive = this.config.lights.ambientLight.IsActive;

            this.debugFolderAmbient = this.debugFolder.addFolder('ambientLight');
            //this.debugFolderAmbient.open()


            this.debugFolderAmbient.addColor(this.parameters.ambient, 'color').onChange(this.ambient.update);
            this.debugFolderAmbient.add(this.ambient.instance, 'intensity').min(0).max(20)
        }




    }

    /*
    *  Spot Light
    */

    setSpotLight(){

        this.spotLight ={};
        this.spotLightHelper ={};



        //set up
        this.spotLight.instance = new THREE.SpotLight(0xffffff, 100);

        
        this.spotLight.instance.setIntensity = (intensity, duration =1, delay=0)=>{


            gsap.to( this.spotLight.instance, {

                intensity : intensity,
                duration: duration,
                delay: delay,
                ease: JS.easings.CircEaseOut
               
            })

   
        }
        
        this.spotLight.instance.setIntensityStraight = (intensity)=>{


            this.spotLight.instance.intensity = intensity;
   
        }



        this.spotLight.instance.setPosition = (position, delay=0)=>{


            gsap.to( this.spotLight.instance.position, {

                x : position.x,
                y : position.y,
                z : position.z,
                duration: 1,
                delay: delay,
                ease: JS.easings.CircEaseOut
               
            })

   
        }

        
        //params target
        this.spotLight.instance.targets = {};
        this.spotLight.instance.targets.params = {
            introPosition :{
                x:0,
                y:0,
                z:0
            },

            homePosition:{
                x: 2,
                y: 1,
                z: 0
            }
        }

        this.spotLight.instance.position.x = 0;
        this.spotLight.instance.position.y = 4;
        this.spotLight.instance.position.z = 6;

        this.spotLight.instance.angle = 0.9;
        this.spotLight.instance.distance = 20;

        this.spotLight.instance.penumbra = 0.5;
        //this.spotLight.instance.power = 10000;


        this.spotLight.instance.castShadow = true;

        this.spotLight.instance.shadow.mapSize.width = 2048;
        this.spotLight.instance.shadow.mapSize.height = 2048;

        this.spotLight.instance.shadow.camera.near = 0.001;
        this.spotLight.instance.shadow.camera.far = 500;
        this.spotLight.instance.shadow.camera.fov = 5;

        this.instances.push(this.spotLight.instance);

        this.scene.add(this.spotLight.instance.target);

    
        //helper
        this.spotLightHelper.instance = new THREE.SpotLightHelper(this.spotLight.instance);
        this.spotLightHelper.instance.debug = true;
        this.spotLightHelper.instance.IsActive = this.config.lights.spotLightHelper.IsActive;

        this.spotLight.instance.setParams = ( distance, angle, intensity) =>{
          
            if (distance) {
                
                this.spotLight.instance.distance = distance;
            }

            if (angle) {
                this.spotLight.instance.angle = angle;
            }

            if (intensity) {
                this.spotLight.instance.intensity = intensity;
            }

        }


        this.spotLight.instance.setTargetPosition = (target)=>{
  
            this.spotLight.instance.target.position.x = target.x;
            this.spotLight.instance.target.position.y = target.y;
            this.spotLight.instance.target.position.z = target.z;
            this.spotLight.instance.target.needsUpdate = true;



        }


        this.spotLight.instance.updateMatrices = () =>{
          
            this.spotLight.instance.updateMatrix();
            this.spotLight.instance.updateMatrixWorld();
            this.spotLight.instance.target.updateMatrixWorld();

        }



        //update
        this.spotLight.instance.update = () => {

            this.spotLight.instance.color = new THREE.Color( this.parameters.spotLight.color);


            if(this.debug){

                if (this.spotLightHelper.instance.IsActive) {
                        
                    this.scene.remove( this.spotLightHelper.instance);
                    this.spotLightHelper.instance.IsActive = false;
                }else{
    
                    this.scene.add( this.spotLightHelper.instance);
                    this.spotLightHelper.instance.IsActive = true;
                }
    

            }
           
            //update the helper on next frame not on same frame
            window.requestAnimationFrame(()=>{

                this.spotLightHelper.instance.update();
              
            });

        }

       this.spotLight.instance.update();


        // Debug
        if(this.debug)
        {
            this.debugFolderSpot = this.debugFolder.addFolder('spotLight');
           // this.debugFolderSpot.open()

            this.debugFolderSpot.addColor( this.parameters.spotLight, 'color').onChange(this.spotLight.update);
            this.debugFolderSpot.add( this.spotLight.instance, 'intensity').min(0).max(1000)
            this.debugFolderSpot.add( this.spotLight.instance.position, 'x').min(-10).max(10).step(0.01).name('position - x');
            this.debugFolderSpot.add( this.spotLight.instance.position, 'y').min(-10).max(10).step(0.01).name('position - y');
            this.debugFolderSpot.add( this.spotLight.instance.position, 'z').min(-10).max(10).step(0.01).name('position - z');
            this.debugFolderSpot.add( this.spotLight.instance, 'angle').min(0).max(1).step(0.01).name('angle').onChange(this.spotLight.instance.update);
            this.debugFolderSpot.add( this.spotLight.instance, 'distance').min(0).max(500).step(0.1).name('distance').onChange(this.spotLight.instance.update);
            this.debugFolderSpot.add( this.spotLight.instance, 'castShadow').name('castShadow');
            this.debugFolderSpot.add(this.spotLightHelper.instance, 'debug').name('Helper - active').onChange(this.spotLight.instance.update)
        }










    }


    /**
     * 
     */

    setHemisphereLight(){

        this.hemisphereLight = {};

        this.hemisphereLight.instance = new THREE.HemisphereLight( 0xffffff, 0xffffff, 20 );

        this.instances.push(this.hemisphereLight.instance);
        

    }


    /**
     * 
     */
    setDirectionalLight(){

        this.directionalLight = {};

        this.directionalLight.instance = new THREE.DirectionalLight( 0xffffff, 2000 );

        
        const light = new THREE.DirectionalLight( 0xFFFFFF );

        light.position.set(0,2,4);

        const helper = new THREE.DirectionalLightHelper( light, 2000 );       
        
        this.scene.add(helper);



    }







}