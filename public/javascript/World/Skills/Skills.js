import * as THREE from 'three';

import * as JS from '../Helpers/JSElement';
import EventEmitter from '../../Utils/EventEmitter';

import { getTime, removeObject3D } from '../../Utils/Helpers';
import { showSkills } from '../Helpers/Animations';
import { data } from '../../Data.js';
import Resources from '../../Resources.js';





export  class Skills extends EventEmitter{

    constructor(_options){

            super();

            //options
            this.options = _options
            this.config = _options.config;
            this.debug = _options.debug;
            this.scene = _options.scene;
            this.time = _options.time;
            this.data = _options.data;
            this.light = _options.light;

            _options.resources = data.region.skills;
            this.resources = new Resources(_options, 'skills');


            this.startTime = new Date;

            //params
            this.params ={
                initialSkillsLeftPosition:{
                    x:  0,
                    y: -2,
                    z: -3
                },
                finalSkillsLeftPosition:{
                    x: -3,
                    y: -0.5,
                    z: -1
                },

                initialSkillsMiddlePosition:{
                    x:  0,
                    y: -2,
                    z: -3
                },
                finalSkillsMiddlePosition:{
                    x: 0,
                    y: -1.5,
                    z: 0
                },

                initialSkillsRightPosition:{
                    x:  0,
                    y: -2,
                    z: -3
                },
                finalSkillsRightPosition:{
                    x: 3,
                    y: -0.5,
                    z: 1
                },

                initialContainerPosition:{
                    x:  0,
                    y:  -4,
                    z:  -6
                },
                finalContainerPosition:{
                    x: 0,
                    y: 0,
                    z: 0
                },
                size : 0.2,
                visible : false,
                active : false,
                updateRotation: false,
                downLight : false,
                downUp: false,
                containerRotation:0,
                initialized: false,
                ready: false

            }


                    
            // Set up
            this.container = new THREE.Object3D();
            this.container.name = 'skills container';


            this.container.position.x =  this.params.initialContainerPosition.x;
            this.container.position.y =  this.params.initialContainerPosition.y;
            this.container.position.z =  this.params.initialContainerPosition.z;

            this.container.rotation.y = 0.15;

            if (screen.width <= 1200) {
                
                this.container.scale.set(0.8,0.8,0.8);

            }

            if (screen.width <= 1600 && screen.width >= 1201) {
                
                this.container.scale.set(0.95,0.95,0.95);

            }


          
            
            // Debug
            if(this.debug)
            {
                this.debugFolder = this.debug.addFolder('world');
                this.debugFolder.open();

                this.resources.on('progress', (..._progress)=>{

                    console.log('progress', _progress);
                })
            }
        

            this.resources.on('readySkills', ()=>{

                this.initScene();
                this.params.initialized = true;
   
               
            })



            getTime(this.startTime, new Date, 'load skills');
                
           // })

    }


    

    /**
     * 
     */
        setTargetLight(){

            this.light[1].setTargetPosition({x:0, y:0, z:0});

        }
    


    /**
     * 
     */
    addTick(){

        this.time.on('tick', ()=>{this.updateAnimation()}, 'skills');

    }



    /**
     * 
     */
    removeTick(){

        this.time.offCallback('tick', 'skills');


    }










    /**
     * 
     */
    initScene(){

        this.animationsClipLeft = [];
        this.animationsClipMiddle = [];
        this.animationsClipRight = [];


        this.skillsMiddle = this.resources.items.skills.scenes[1];
        this.skillsScene = this.skillsMiddle.clone();

        this.skillsScene2 = this.resources.items.skills.scenes[0];
        this.skillsLeft =  this.skillsScene2.clone();

        this.skillsScene3 = this.resources.items.skills.scenes[2];
        this.skillsRight = this.skillsScene3.clone();


        this.skillsMiddle.scale.set(0.03,0.03,0.03);
        this.skillsMiddle.rotation.set(0, - Math.PI * 0.5, 0);
        this.skillsMiddle.position.set(this.params.initialSkillsMiddlePosition);

        this.skillsLeft.scale.set(0.03,0.03,0.03);
        this.skillsLeft.rotation.set(0, - Math.PI * 0.25, 0);
        this.skillsLeft.position.set(this.params.initialSkillsLeftPosition);

        this.skillsRight.scale.set(0.03,0.03,0.03);
        this.skillsRight.rotation.set(0, -Math.PI * 0.75, 0);
        this.skillsRight.position.set(this.params.initialSkillsRightPosition);

        this.container.add(this.skillsLeft, this.skillsMiddle, this.skillsRight);

        this.scene.add(this.container);



        //  ANIMATION
        this.mixerMiddle = new THREE.AnimationMixer(this.skillsMiddle);
        this.mixerLeft = new THREE.AnimationMixer(this.skillsLeft);
        this.mixerRight = new THREE.AnimationMixer(this.skillsRight);

       
        let tempAnimationArray;


        tempAnimationArray = [...this.resources.items.skills.animations];


        this.animationsClipLeft = tempAnimationArray.slice(0,12);
        this.animationsClipMiddle = tempAnimationArray.slice(12,34);
        this.animationsClipRight = tempAnimationArray.slice(34,46)


        this.mixerMiddle.addEventListener( 
            'finished', 

            (e)=>{

                this.inUseActions++;

                if (this.inUseActions == 22) {
                    this.trigger('loaded');
                    this.updateRotation = true;

                }

            
            
            });


    }



    /**
     * 
     */
    animate(){


        this.inUseActions = 0;
        this.light[1].setIntensityStraight(1000);


        showSkills(this.skillsLeft, this.params.initialSkillsLeftPosition, this.params.finalSkillsLeftPosition, 1,0, JS.easings.Power2Out, null,
 
            ()=>this.startAnimation( this.animationsClipLeft, this.mixerLeft));
            


        showSkills(this.skillsMiddle, this.params.initialSkillsMiddlePosition, this.params.finalSkillsMiddlePosition, 1,0.2, JS.easings.Power2Out, null,
            ()=> this.startAnimation( this.animationsClipMiddle, this.mixerMiddle)); 



        showSkills(this.skillsRight, this.params.initialSkillsRightPosition, this.params.finalSkillsRightPosition, 1,0.5, JS.easings.Power2Out, null, 
            ()=>this.startAnimation( this.animationsClipRight, this.mixerRight))



    }



    /**
     * 
     */
    updateAnimation(){

        if (this.params.visible == true && this.params.initialized) {


            this.mixerMiddle.update(this.time.delta /750);
            this.mixerLeft.update(this.time.delta /1000);
            this.mixerRight.update(this.time.delta /1000);

            this.skillsMiddle.rotation.y -= 0.005;
            this.skillsLeft.rotation.y += 0.003;
            this.skillsRight.rotation.y += 0.004;
        

            if (this.updateRotation) {

                this.container.rotation.y +=0.002;
                this.params.containerRotation = this.container.rotation.y % (Math.PI * 2);


                this.light[1].setIntensityStraight(1000 -950 * (1 - Math.abs((Math.pow(Math.cos(this.params.containerRotation - 0.30), 6)))));
                
 
            }

        }

    }


    /**
     * 
     * @param {*} clipAnimations 
     * @param {*} mixer 
     */
    startAnimation(clipAnimations, mixer){

        clipAnimations.forEach((animation)=>{

            const action = mixer.clipAction(animation);
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;
            action.play();


        })





    }


    /**
     * 
     */
    stopAnimation(){


        this.animationsClipLeft.forEach((animation)=>{

            const action = this.mixerLeft.clipAction(animation);
            action.stop();
        })

        this.animationsClipMiddle.forEach((animation)=>{

            const action = this.mixerMiddle.clipAction(animation);
            action.stop();
        })

        this.animationsClipRight.forEach((animation)=>{

            const action = this.mixerRight.clipAction(animation);
            action.stop();
        })

        this.updateRotation = false;
        this.container.rotation.y = 0.15;

      

    }


    /**
     * 
     */
    destroy(){



        this.animationsClipLeft = null;
        this.animationsClipMiddle = null;
        this.animationsClipRight = null;


        this.mixerLeft = null;
        this.mixerMiddle = null;
        this.mixerRight = null;



        removeObject3D(this.skillsLeft);
        removeObject3D(this.skillsMiddle);
        removeObject3D(this.skillsRight);

        
    }




}

