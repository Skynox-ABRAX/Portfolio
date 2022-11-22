import * as THREE from 'three';
import gsap from "gsap";

import * as JS from '../Helpers/JSElement.js';

import { getTime, removeObject3D } from '../../Utils/Helpers';
import EventEmitter from '../../Utils/EventEmitter.js'




export class Intro extends EventEmitter {


    constructor(_options){


        super();

        //options
        this.scene = _options.scene;
        this.time = _options.time;
        this.light = _options.light;


         //set up
        this.meshes = [];
        this.container = new THREE.Object3D();
        this.container.name = "intro container";

        this.params = {}
        this.params.totalElementPerAxes = {
            x: 60,
            y: 5,
            z: 5,
        };

        this.params.totalElement = this.params.totalElementPerAxes.x *
                                   this.params.totalElementPerAxes.y *
                                   this.params.totalElementPerAxes.z; 



        this.params.cube = {
            color: "#55efc4",
            sizeX: 0.025,
            sizeY: 0.025,
            sizeZ: 0.025,
            segmentX: 1,
            segmentY: 1,
            segmentZ: 1
        };

        this.startTime = new Date;

        this.setLightIntensity();
        this.setContainer();
        this.setInstanceMesh();
        this.setConfigTimer();
        this.setAnimation();





    }


    /**
     * 
     */
    setLightIntensity(){
  
        this.light[1].setIntensity(400);

    }



    /**
     * 
     */
    setContainer(){


        let meshes;

         // container for cubes
        this.group = new THREE.Group();
        this.group.name =  'container cubes';

        this.group.rotation.y = 0.4;
        this.group.rotation.x = 0.15;
        this.group.rotation.z = 0.050;

        this.group.scale.set(1.15,1.15,1.15);

        this.time.on('tick', ()=>{

            this.group.rotation.y += 0.007;
    
        }, 'intro')


    }




    /**
     * 
     */
    setInstanceMesh(){


        const cubeGeometry = new THREE.BoxBufferGeometry(
            this.params.cube.sizeX,
            this.params.cube.sizeY,
            this.params.cube.sizeZ,
            this.params.cube.segmentX,
            this.params.cube.segmentY,
            this.params.cube.segmentZ,
        );

        const timer = Date.now();

        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(this.params.cube.color),
            transparent: true,
            opacity: 1
        })

        const mesh = new THREE.Mesh(cubeGeometry, this.material);


        this.instanceMesh = new THREE.InstancedMesh(cubeGeometry, material, this.params.totalElement);

        this.group.add(this.instanceMesh);

        this.container.add(this.group);



    }



    
    /**
     * 
     */
     setAnimation(){

                    

        let index = 0;
        let dummyMatrix = [];
        var dummy= new THREE.Object3D();


        for (let posX = 0; posX < 60; posX++) {

            for (let posY = 0; posY < 5; posY++) {

                for (let posZ = 0; posZ < 5; posZ++) {




                        dummyMatrix.push({x:posX/22 - 1.3409, y: posY/28, z: posZ/28})
                        dummy.position.set((Math.random() *10 -5)/3, (Math.random() *10 -5)/3, ((Math.abs(Math.random() *10) -5))/3);
                        dummy.scale.set(0,0,0);
                        dummy.updateMatrix();
                        this.instanceMesh.setMatrixAt( index, dummy.matrix );
                        this.instanceMesh.instanceMatrix.needsUpdate = true;

                        index++;


                    }
            }

        }



        for (let index = 0; index < this.instanceMesh.instanceMatrix.array.length; index+=16) {

            const mat = this.instanceMesh.getMatrixAt(0, dummy.matrix);
 

            gsap.to(this.instanceMesh.instanceMatrix.array, {

                [index + 12]: dummyMatrix[index /16 ].x,
                [index + 13]: dummyMatrix[index /16 ].y,
                [index + 14]: dummyMatrix[index /16 ].z,
                [index + 0]: 1,
                [index + 5]: 1,
                [index + 10]: 1,
                duration: 1,
                delay: index /10000,
                onUpdate: ()=>{
                    this.instanceMesh.instanceMatrix.needsUpdate = true;
                }


            })


            
        }



    }



        /**
         * 
         */
        setConfigTimer(){

            const dummyObject= {
                value: 0,
                duration: 3.4,  //calculated from diff timing on animation of cube
                progress: 0,
                currentProgress: 0 
            } 
    
    
            //animate timer span clip path
    
            gsap.to(JS.timerSpan, {
    
                transform : 'translateY(0%)',
                duration: 0.5,
                overwrite: false
    
            })
    
    
    
        
            gsap.to(dummyObject, {
                value: this.params.totalElement,
                duration: dummyObject.duration,
                onUpdate: ()=>{
    
                    dummyObject.progress +=1;
    
                    if ((dummyObject.currentProgress + 15) < (dummyObject.progress)) {
    
                        JS.timerSpan.innerHTML = ((dummyObject.value / this.params.totalElement) * 100).toFixed(0)  + ' %';
                        dummyObject.currentProgress = dummyObject.progress;
    
                    }
    
                },
                
                onComplete: ()=>{
    
                    JS.timerSpan.innerHTML = ((dummyObject.value / this.params.totalElement) * 100).toFixed(0)  + ' %';
                    this.destroy();
    
                }
            
            })
    



        }





    /**
     * 
     */
    destroy(){

        //params
        this.destroy = {
            duration: 1.5,
            delay: 2000
        }


        for (let index = 0; index < this.instanceMesh.instanceMatrix.array.length; index+=16) {
  

            gsap.to(this.instanceMesh.instanceMatrix.array, {

                [index + 0]: 0,
                [index + 5]: 0,
                [index + 10]: 0,
                duration: 1,
                delay: index /50000,
                onUpdate: ()=>{
                    this.instanceMesh.instanceMatrix.needsUpdate = true;
                }


            })


            
        }



        //animation from both sides
       // for (let index = 0; index < this.meshes.length / 2; index++) {

            gsap.to(this.instanceMesh.material, {

                opacity : 0,
                duration: this.destroy.duration,
                //delay: index / this.destroy.delay,
                onComplete: ()=>{

                    removeObject3D(this.instanceMesh)

                }

            })

  
        

        //animate disappear of timer

        gsap.to(JS.timerSpan, {css : {
           
            transform : 'translateY(110%)',

            },
            duration: 0.7,
            delay: 0.7,
            ease: 'Power2.easeIn'
 
        })

        gsap.to(JS.timerContainer, {css : {
           
            transform : 'translateY(50%)',

        },
            duration: 0.7,
            delay: 0.7,
            ease: 'Power2.easeIn',
            onComplete: ()=>{

                this.trigger('finished');

                JS.timer.style.display = 'none';
                
                getTime(this.startTime, new Date, 'load intro');

                this.time.offCallback('tick', 'intro');

            }
 
        })


    

    }

}



