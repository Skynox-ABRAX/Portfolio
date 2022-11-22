import * as THREE from 'three';
import * as JS from '../Helpers/JSElement.js';
import gsap from 'gsap';

import EventEmitter from '../../Utils/EventEmitter.js';

import { data } from '../../Data.js';
import Resources from '../../Resources.js';

import { showHideAboutDetailsParagraph } from '../Helpers/Animations.js';
import { backAboutClickListener } from '../Helpers/Listener.js';
import { removeObject3D } from '../../Utils/Helpers.js';



export class About extends EventEmitter{

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
            this.tempCamera = _options.camera;
            this.camera = _options.camera.instance;


            _options.resources = data.region.about;
            this.resources = new Resources(_options, 'about');




            //params
            this.params ={
                initialPosition:{
                    x:  0,
                    y: -4,
                    z: -8
                },

                finalPosition:{
                    x:  0,
                    y:  0,
                    z:  0
                },
                item0: {
                    area : {
                        xStart: -2.7,
                        xEnd : -2.15,
                        yStart: 0.7,
                        yEnd : 1.2,
                        zStart: 4.2,
                        zEnd : 4.9,

                    },
                    position: {
                        x: -2.475,
                        y: 1,
                        z: 4.23
                    },
                    rotation : {

                        forward:{
                            x: -Math.PI,
                            y: -Math.PI /2,
                            z: -Math.PI
                        },
                        backward:{
                            x: -Math.PI,
                            y: -Math.PI /4,
                            z: -Math.PI
                        }
         
                    },
                    initialPosition: {},
                    initialRotation: {}
                },
                item1: {
                    area : {
                        xStart: -0.25,
                        xEnd : 0.25,
                        yStart: 0.7,
                        yEnd : 1.2,
                        zStart: 1.3,
                        zEnd : 2.1,
             

                    },
                    position: {
                        x: 0,
                        y: 1,
                        z: 1.685
                    },
                    rotation : {

                        forward : {
                            x: -Math.PI,
                            y: Math.PI /4,
                            z: -Math.PI

                        },
                        backward : {
                            x: -Math.PI,
                            y: -Math.PI /4,
                            z: -Math.PI

                        }

        
                    },                    
                    initialPosition: {},
                    initialRotation: {}
                },
                item2: {
                    area : {
                        xStart: 2,
                        xEnd : 2.6,
                        yStart: 0.7,
                        yEnd : 1.2,
                        zStart: 3.2,
                        zEnd : 3.9,

                    },
                    position: {
                        x: 2.297,
                        y: 1,
                        z: 3.60
                    },
                    rotation : {

                        forward :{
                            x: -Math.PI,
                            y: Math.PI / 4,
                            z: -Math.PI

                        },
                        backward:{
                            x: -Math.PI,
                            y: Math.PI / 2,
                            z: -Math.PI
                        }
          
                    },
                    initialPosition: {},
                    initialRotation: {}
                },
                size : 0.2,
                active: false,
                updateVelocity : false,
                visible : false,
                animationFinished: false

            }




                                
            // Set up
            this.container = new THREE.Object3D();
            this.container.name = 'about container';


            this.container.position.x =  this.params.initialPosition.x;
            this.container.position.y =  this.params.initialPosition.y;
            this.container.position.z =  this.params.initialPosition.z;

            
            if (window.innerWidth <= 1200) {
                
                this.container.scale.set(0.8,0.8,0.8);

            }

            if (window.innerWidth <= 1400 && window.innerWidth >= 1201) {
                
                this.container.scale.set(0.9,0.9,0.9);


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
                  

            this.resources.on('readyAbout', ()=>{

                this.setAboutListener();

            })

            this.scene.add(this.container);

            
                         


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


        this.time.on('tick', ()=>{this.updateAnimation()}, 'about');


    }

    /**
     * 
     */
    removeTick(){


        this.time.offCallback('tick', 'about');


    }









    /**
     * 
     */
    setAboutListener(){

        backAboutClickListener(() => {this.hideDetails()})

    }


    
    /**
     * 
     */
     initScene(){


        this.inMove = false;
        this.index = 0;
        this.tempObject = {};
        this.tempObject.name = '';
        this.intersects = {};
        this.objectsToIntersects =[];
        this.cloneObjectsToIntersects =[];
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();


        this.aboutScene = this.resources.items.about.scene.clone();

        this.aboutScene.scale.set(0.6,0.6,0.6);

        this.animationsClip = [...this.resources.items.about.animations];

        this.mixer = new THREE.AnimationMixer(this.aboutScene);

        this.aboutScene.traverse((obj)=>{

            if (obj instanceof THREE.Mesh) {
                
                obj.material.opacity = 0;
                obj.material.transparent = true;
                obj.material.needsUpdate = true;
            }


        })


        this.aboutScene.rotation.y = 0.15;
        this.aboutScene.rotation.x = -0.10;
        this.aboutScene.position.set(0,-0.5,0.5);



        //ITEMS
        this.career = this.aboutScene.getObjectByName('career');
        this.trainings = this.aboutScene.getObjectByName('trainings');
        this.about = this.aboutScene.getObjectByName('about');

        this.cloneCareer = this.aboutScene.getObjectByName('career').clone();
        this.cloneTrainings = this.aboutScene.getObjectByName('trainings').clone();
        this.cloneAbout = this.aboutScene.getObjectByName('about').clone();

        this.params.item0.initialPosition = this.career.position.clone();
        this.params.item1.initialPosition = this.trainings.position.clone();
        this.params.item2.initialPosition = this.about.position.clone();
        
        this.params.item0.initialRotation = this.career.rotation.clone();
        this.params.item1.initialRotation = this.trainings.rotation.clone();
        this.params.item2.initialRotation = this.about.rotation.clone();

        this.objectsToIntersects.push(this.career);
        this.objectsToIntersects.push(this.trainings);
        this.objectsToIntersects.push(this.about);

        this.cloneObjectsToIntersects = [...this.objectsToIntersects];

         
        //CAREER
        this.career.userData.velocity = new THREE.Vector3();
        this.career.userData.velocity.y = Math.random() * 0.003;
        this.career.userData.velocity.x = Math.random() * 0.003;
        this.career.userData.velocity.z = Math.random() * 0.003;


        // TRAININGS
        this.trainings.userData.velocity = new THREE.Vector3();
        this.trainings.userData.velocity.y = Math.random() * 0.003;
        this.trainings.userData.velocity.x = Math.random() * 0.003;
        this.trainings.userData.velocity.z = Math.random() * 0.003;

        
        //ABOUT
        this.about.userData.velocity = new THREE.Vector3();
        this.about.userData.velocity.y = Math.random() * 0.003;
        this.about.userData.velocity.x = Math.random() * 0.003;
        this.about.userData.velocity.z = Math.random() * 0.003;

        this.container.add(this.aboutScene);

 
     }




     /**
      * 
      */
     switchPositionItems(direction){




        if (direction == 'forward') {
            
            gsap.to(this.objectsToIntersects[0].position, {

                x:this.params.item1.position.x,
                y:this.params.item1.position.y,
                z:this.params.item1.position.z,
                duration: 1.5,
                ease: JS.easings.CircEaseIn,
                onStart: ()=>{
                    this.inMove = true;
                }


            })
            gsap.to(this.objectsToIntersects[1].position, {

                x:this.params.item2.position.x,
                y:this.params.item2.position.y,
                z:this.params.item2.position.z,
                duration: 1.5,
                ease: JS.easings.CircEaseIn


            })
            gsap.to(this.objectsToIntersects[2].position, {

                x:this.params.item0.position.x,
                y:this.params.item0.position.y,
                z:this.params.item0.position.z,
                duration: 1.5,
                ease: JS.easings.CircEaseIn


            })
            gsap.to(this.objectsToIntersects[0].rotation, {

                y: '+=' + this.params.item1.rotation.forward.y,
                duration: 1.5,
                ease: JS.easings.CircEaseIn


            })
            gsap.to(this.objectsToIntersects[1].rotation, {

                y:'+=' + this.params.item2.rotation.forward.y,
                duration: 1.5,
                ease: JS.easings.CircEaseIn


            })
            gsap.to(this.objectsToIntersects[2].rotation, {

                y:'+=' + this.params.item0.rotation.forward.y,
                duration: 1.5,
                ease: JS.easings.CircEaseIn,
                onComplete: ()=>{
                    
                    this.inMove = false;

                }


            })

            //UPDATE ARRAY OF ITEMS
            const temp0 = this.objectsToIntersects[0];
            const temp1 = this.objectsToIntersects[1];
            const temp2 = this.objectsToIntersects[2];

            this.objectsToIntersects[1] = temp0;
            this.objectsToIntersects[2] = temp1;
            this.objectsToIntersects[0] = temp2;

  
        }else if (direction =='backward') {


            gsap.to(this.objectsToIntersects[0].position, {

                x:this.params.item2.position.x,
                y:this.params.item2.position.y,
                z:this.params.item2.position.z,
                duration: 1.5,
                ease: JS.easings.CircEaseIn,
                onStart: ()=>{
                    this.inMove = true;
                }


            })
            gsap.to(this.objectsToIntersects[1].position, {

                x:this.params.item0.position.x,
                y:this.params.item0.position.y,
                z:this.params.item0.position.z,
                duration: 1.5,
                ease: JS.easings.CircEaseIn


            })
            gsap.to(this.objectsToIntersects[2].position, {

                x:this.params.item1.position.x,
                y:this.params.item1.position.y,
                z:this.params.item1.position.z,
                duration: 1.5,
                ease: JS.easings.CircEaseIn


            })
            gsap.to(this.objectsToIntersects[0].rotation, {

                y: '+=' + this.params.item2.rotation.backward.y,
                duration: 1.5,
                ease: JS.easings.CircEaseIn


            })
            gsap.to(this.objectsToIntersects[1].rotation, {

                y:'+=' + this.params.item0.rotation.backward.y,
                duration: 1.5,
                ease: JS.easings.CircEaseIn


            })
            gsap.to(this.objectsToIntersects[2].rotation, {

                y:'+=' + this.params.item1.rotation.backward.y,
                duration: 1.5,
                ease: JS.easings.CircEaseIn,
                onComplete: ()=>{
                    
                    this.inMove = false;

                }


            })


                //UPDATE ARRAY OF ITEMS

                const temp0 = this.objectsToIntersects[0];
                const temp1 = this.objectsToIntersects[1];
                const temp2 = this.objectsToIntersects[2];
    
                this.objectsToIntersects[1] = temp2;
                this.objectsToIntersects[2] = temp0;
                this.objectsToIntersects[0] = temp1;
    
    
            
        }


     }


     /**
      * 
      * @param {*} target 
      * @param {*} IsUpdate 
      */
     setUpdateMatrix(IsUpdated){


        this.container.children[0].children.forEach((child)=>{


            if (child instanceof THREE.Group) {

                child.matrixAutoUpdate = IsUpdated;
                child.matrixWorldNeedsUpdate = IsUpdated
            
                

                child.traverse((subchild)=>{

                    if (subchild instanceof THREE.Mesh) {
                        
                        subchild.matrixAutoUpdate = IsUpdated;
                        subchild.matrixWorldNeedsUpdate = IsUpdated;

                    }
                })


            }

        })


     }







     /**
      * 
      */
     animate(objectName){


        this.toggleAsideVisibility(true);


        switch (objectName) {
            case 'about':

                this.index = 2
                showHideAboutDetailsParagraph(JS.asideAboutDetailsParagraph,  0,1, 
                    'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)', 'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)',
                    0.5, 0.6,
                    JS.easings.Power2InOut,
                    0.05,
                    ()=>{
                        JS.asideAboutDetails.style.display = 'block'
                    })
                        
                break;
            

            case 'career':

            
            this.index = 0
            showHideAboutDetailsParagraph(JS.asideAboutCareerGroupContent,  0,1, 
                    'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)', 'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)',
                    0.5, 0.6,
                    JS.easings.Power2InOut,
                    0.05,
                    ()=>{
                        JS.asideAboutCareer.style.display = 'block'
                    })
                        
                break;

            case 'trainings':

            
            this.index = 1
            showHideAboutDetailsParagraph(JS.asideAboutTrainingsGroupContent,  0,1, 
                    'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)', 'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)',
                    0.5, 0.6,
                    JS.easings.Power2InOut,
                    0.05,
                    ()=>{
                        JS.asideAboutTrainings.style.display = 'block'
                    },
                    ()=>{

                        this.trigger('loaded');
                    }
                    
                    )
                        
                break;
        
            default:
                break;
        }


     }


    /**
     * 
     * @param {*} clipAnimations 
     * @param {*} mixer 
     */
    startAnimation(clipAnimations, mixer){

        this.tempCamera.trigger('onUpdate')

        this.inUseActions = 0;
        
        this.light[1].setIntensity(300, 2);

        this.mixer.addEventListener( 
            'finished', 

            (e)=>{

                this.inUseActions++;


                if (this.inUseActions >= 88) {
                    this.trigger('loaded');

                    this.params.updateVelocity = true;

                    this.setUpdateMatrix(false);
                    this.animationFinished = true;

                   
                }
          
            
        });

        this.aboutScene.traverse((obj)=>{

            if (obj instanceof THREE.Mesh) {
                
                obj.material.opacity = 1;
                obj.material.transparent = true;
                obj.material.needsUpdate = true;

            }

            if (obj.name=='career') {
                
                this.career = obj
            }


        })

        clipAnimations.forEach((animation)=>{

            const action = mixer.clipAction(animation);
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;
            action.reset();
            action.play();

        })

   }


    /**
         * 
         */
    stopAnimation(){

        this.params.updateVelocity = false;
        this.visible = false;

        removeObject3D(this.aboutScene);

    }




     
    /**
     * 
     */
    updateAnimation(){


            // MIXER
            if (this.visible == true) {
                

            if (!this.animationFinished) {
                this.mixer.update(this.time.delta /1000);
            }



                //RAYCASTER


                if (this.visible == true && this.inMove == false  && this.params.updateVelocity == true) {

                    this.pointer.x = ( JS.event.x / window.innerWidth ) * 2 - 1;
                    this.pointer.y = - ( JS.event.y / window.innerHeight ) * 2 + 1;

                    this.raycaster.setFromCamera( this.pointer, this.camera );
    
                    // calculate objects intersecting the picking ray
                    this.intersects = this.raycaster.intersectObjects( this.cloneObjectsToIntersects);

                    JS.event.x = null;
                    JS.event.y = null;
    
    
   
                    if (this.intersects.length > 0 && this.inMove == false) {

    
                        if ((this.tempObject.name != this.intersects[0].object.name && this.tempObject.name != '') || this.tempObject.name == '') {
                            
                            this.inMove = true;
                            this.tempObject.name = this.intersects[0].object.name;

                            const direction = this.getDirection(this.intersects[0].object.name);

                            if (direction != 0) {

                                this.switchPositionItems(direction);
                            }else{

                                this.inMove = false;
                            }

                            this.hideParagraph(this.index);

                            this.animateRaycaster(this.intersects[0].object.name);
    
                        }
    
                   }


                        
                    if(this.params.updateVelocity && this.inMove == false){


                        for (let index = 0; index < this.objectsToIntersects.length; index++) {
                        
                            this.updatePositionItem(this.objectsToIntersects[index], index)
                            
                        }

                    }



            }

            }

        }



    /**
     * 
     */
    getDirection(objectName){

        let pos = 0

        for (let index = 0; index < this.objectsToIntersects.length; index++) {
            
            if (this.objectsToIntersects[index].name == objectName) {

                pos = index
                
            }
            
        }



        switch (pos) {
            case 0:
                return 0
                break;
            case 1:
                return 'backward'
                break;
            case 2:
                return 'forward'
                break;
        
            default:
                break;
        }





    }        


    /**
     * 
     */
    updatePositionItem(item, index){

        if (item) {


            
            //     // //this.about.rotation.y -=0.01;
                item.position.add(item.userData.velocity);


                if ( item.position.x < this.params['item' + index].area.xStart || item.position.x > this.params['item' + index].area.xEnd ) {

                    item.position.x = THREE.MathUtils.clamp( item.position.x, this.params['item' + index].area.xStart, this.params['item' + index].area.xEnd );
                    item.userData.velocity.x = - item.userData.velocity.x;

                }
                if ( item.position.y < this.params['item' + index].area.yStart || item.position.y > this.params['item' + index].area.yEnd ) {

                    item.position.y = THREE.MathUtils.clamp( item.position.y, this.params['item' + index].area.yStart, this.params['item' + index].area.yEnd );
                    item.userData.velocity.y = - item.userData.velocity.y;

                }
                if ( item.position.z < this.params['item' + index].area.zStart || item.position.z > this.params['item' + index].area.zEnd ) {

                    item.position.z = THREE.MathUtils.clamp( item.position.z, this.params['item' + index].area.zStart, this.params['item' + index].area.zEnd );
                    item.userData.velocity.z = - item.userData.velocity.z;

                }


        }
    }

    

    /**
     * 
     * @param {*} objectName 
     */
    getIndex(objectName){


        switch (objectName) {
            case 'career':
                this.index = 0;
                break;
            case 'trainings':
                this.index = 1;
                break;
            case 'about':
                this.index = 2;
                break;
        
            default:
                break;
        }




    }


    /**
     * 
     */
    animateRaycaster(objectName){

        this.trigger('idle');

        this.animate(objectName);

    }





     /**
     * 
     * @param {*} visible 
     */

      toggleAsideVisibility(visible){


        if (visible && this.visible == true) {
            JS.asideAbout.classList.add('active');
            JS.backWordAbout.classList.add('active');
            
        }else{

            JS.asideAbout.classList.remove('active');
            JS.backWordAbout.classList.remove('active');
        }

    }




    /**
     * 
     * @param {*} index 
     */
    hideParagraph(index){


        switch (index) {


            case 2:
    
                showHideAboutDetailsParagraph(JS.asideAboutDetailsParagraph,  1,0, 
                    'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)', 'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)',
                    0.3, 0,
                    JS.easings.Power2InOut,
                    0.05, null,
                    ()=>{
                        JS.asideAboutDetails.style.display = 'none'
                    })
                
                break;
    
    
    
            
            case 0:
    
    
                showHideAboutDetailsParagraph(JS.asideAboutCareerGroupContent,  1,0, 
                'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)', 'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)',
                0.3, 0,
                JS.easings.Power2InOut,
                0.05,null,
                ()=>{
                    JS.asideAboutCareer.style.display = 'none'
                })
    
                break;

            
            case 1:
    
            
                showHideAboutDetailsParagraph(JS.asideAboutTrainingsGroupContent,  1,0, 
                    'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)', 'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)',
                    0.3, 0,
                    JS.easings.Power2InOut,
                    0.05,null,
                    ()=>{
                        JS.asideAboutTrainings.style.display = 'none'
                    }
                    )
                        
    
    
    
                break;
           
            default:
                break;
           }
    



    }






    /**
     * 
     */
    hideDetails(){


       this.toggleAsideVisibility(false);

       this.tempObject.name = '';

    switch (this.index) {


        case 2:

            showHideAboutDetailsParagraph(JS.asideAboutDetailsParagraph,  1,0, 
                'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)', 'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)',
                1, 0,
                JS.easings.Power2InOut,
                0.1,null,
                ()=>{
                    JS.asideAboutDetails.style.display = 'none',
                    this.trigger('action');
                })
            
            break;



        
        case 0:


            showHideAboutDetailsParagraph(JS.asideAboutCareerGroupContent,  1,0, 
            'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)', 'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)',
            1, 0,
            JS.easings.Power2InOut,
            0.2,null,
            ()=>{
                JS.asideAboutCareer.style.display = 'none';
                this.trigger('action');
            })
                
            


            break;
        
        case 1:

        
            showHideAboutDetailsParagraph(JS.asideAboutTrainingsGroupContent,  1,0, 
                'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)', 'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)',
                1, 0,
                JS.easings.Power2InOut,
                0.2,null,
                ()=>{
                    JS.asideAboutTrainings.style.display = 'none';
                    this.trigger('action');
                })


            break;
       
        default:
            break;
       }

    }


}

