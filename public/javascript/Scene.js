import * as THREE from 'three';
import gsap from 'gsap';


export default class Scene{


    constructor(_options){


        //options
        this.debug = _options.debug;


        //parameters
        this.color = 0x141414;
        this.parameters = {};
        this.parameters.color =  this.color;
        this.parameters.fog = {};
        this.parameters.fog.color = this.color;
        this.parameters.fog.density = 0.2;

        //set up
        this.instance = new THREE.Scene();


        this.instance.fog = new THREE.FogExp2(this.parameters.fog.color, this.parameters.fog.density);
        


        //options
        this.instance.background = new THREE.Color( this.parameters.color);

        //update
        this.updateColor = () => {

            this.instance.background = new THREE.Color( this.parameters.color);
        }
        
        this.updateColor();


        // Debug
        if(this.debug)
        {
            this.instance.debugSceneFolder = this.debug.addFolder('scene')
            this.instance.debugSceneFolder.open()

            this.instance.debugSceneFolder.addColor(this.parameters, 'color').onChange(this.updateColor)

        }


        this.instance.animateBackgroundColor = (index)=>{

            gsap.to(this.instance.background, {

                r: 1,
                g: 0,
                b: 0,
                duration: 2
    
    
            })

        }


        this.instance.animateFogColor = (index)=>{

            gsap.to(this.instance.fog.color, {

                r: 1,
                g: 0,
                b: 0,
                duration: 2,
                onUpdate: ()=>{
                    this.instance.fog = new THREE.FogExp2(this.parameters.fog.color, this.parameters.fog.density);
                }
    
    
            })
    

        }

        this.instance.animateFogDensity = (index)=>{


            gsap.to(this.parameters.fog, {

                density: 0,
                duration: 2,
                onUpdate: ()=>{
                    this.instance.fog = new THREE.FogExp2(this.parameters.fog.color, this.parameters.fog.density);

                }
    
    
            })
    

        }







    }



}