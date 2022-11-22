import * as THREE from 'three';
import { data } from '../../Data.js';
import Resources from '../../Resources.js';

import panelMaterial from '../../Materials/Works/panelMaterial';

import gsap from 'gsap';

import { animateExplores, animateFromToChars, animateHR, getChars, getTitle,  showHideDetailsParagraph, updateContainer,  updateOpacityArrows, updateOpacityOnChangeAction, updateOpacityPanel2, updateOpacityShaderWithTraverse} from '../Helpers/Animations.js';
import * as JS from '../Helpers/JSElement';


import {detailClickListener, backClickListener,  upClickListener, downClickListener} from '../Helpers/Listener.js';
import { getTime, removeObject3D } from '../../Utils/Helpers';
import EventEmitter from '../../Utils/EventEmitter';


export class Works extends EventEmitter{


        constructor(_options){

            super();

            //options
            this.config = _options.config;
            this.debug = _options.debug;
            this.renderer = _options.renderer;
            this.scene = _options.scene;
            this.camera = _options.camera;
            this.time = _options.time;
            this.data = _options.data;
            this.light = _options.light;

            _options.resources = data.region.works;
            this.resources = new Resources(_options, 'works');

            //debug
            if(this.debug)
            {
                this.debugFolder = this.debug.addFolder('works');
                this.debugFolder.open()

            }


            this.visible = false;
            this.inMove = true;
            this.statusPosition = 'none';
            this.canUpdateTexture = true;
            this.inDetailMode = false;
            this.inIdleMode = false;

            this.startTime = new Date;

            this.setParams();
            this.setTrigger();
            this.setWorksListener();

            // Debug
            if(this.debug)
            {
                this.debugFolder = this.debug.addFolder('world');
                this.debugFolder.open();
    
                this.resources.on('progress', (..._progress)=>{
    
                    console.log('progress', _progress);
                })
            }


            this.resources.on('readyWorks', ()=>{
                

                this.initScene();
                
            });


            //getTime(this.startTime, new Date, 'load works');



    

       }



       /**
        * 
        */
       setTrigger(){


            this.on('loaded', ()=>{

                this.inMove = false;
            })

            this.on('updateTexture', ()=>{
                this.canUpdateTexture = false;
            })

            this.on('inDetailMode', ()=>{
                this.inDetailMode = true;
            })

            this.on('inIdleMode', ()=>{

                this.inIdleMode = true;

            })



       }






        /**
         *  function to set listener
         */

        setWorksListener(){

            detailClickListener(() => { if(this.visible == true && this.inIdleMode != true){

                this.trigger('idle'); 
                this.showDetails();
            }})

            backClickListener(() => {if(this.visible){
                this.hideDetails()
            }})


            // up click listener
            upClickListener(()=>{

                if (!this.canUpdateTexture) {
                    return 0;
                }


                if (this.inDetailMode == true) {
       
                    this.trigger('updateTexture');
                    
                    const panels = this.data.explore[this.data.panels[this.index]];
            
                    const textureFrom = this.resources.items[panels.pictures[this.textureIndex[this.index].index] + 'Texture'];

                    const textureTo = this.resources.items[panels.pictures[(this.textureIndex[this.index].index + 1 ) % panels.pictures.length] + 'Texture'];


                    this.changeTexture(textureFrom, textureTo);
                    this.textureIndex[this.index].index++;

                    
                    if (this.textureIndex[this.index].index > panels.pictures.length - 1) {
                            this.textureIndex[this.index].index = 0;
                        }

                            
                }

            });


            // down click listener
            downClickListener(()=>{

                if (!this.canUpdateTexture) {
                    return 0;
                }



                if (this.inDetailMode == true) {

                    this.trigger('updateTexture');

                    const panels = this.data.explore[this.data.panels[this.index]];

                    const textureFrom = this.resources.items[panels.pictures[this.textureIndex[this.index].index] + 'Texture'];
                    const textureTo = this.resources.items[panels.pictures[(this.textureIndex[this.index].index - 1 ) < 0 ? panels.pictures.length -1 : this.textureIndex[this.index].index - 1 ] + 'Texture'];


                    this.changeTexture(textureFrom, textureTo);
                    this.textureIndex[this.index].index--;

                    if (this.textureIndex[this.index].index < 0) {
                            this.textureIndex[this.index].index = panels.pictures.length - 1;
                    }

                                    
                }

            });



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

        initScene(){


                this.setObjects();
                this.create();


        }


       
        /**
        * 
        */
        setParams(){


            this.params ={

                initialPosition:{
                    x: 0,
                    y: -6,
                    z: -8
                },
                finalPosition:{
                    x: 0,
                    y: 0,
                    z: 0
                },
                randomFactor:{
                    x: ()=> { return Math.random() * 0.01 - 0.005},
                    y: ()=> { return Math.random() * 0.01 - 0.005},
                    z: ()=> { return Math.random() * 0.01 - 0.005},
                },
                rotationFactor: {
                    x: -Math.PI *0.5,
                    y: 0,
                    z: -Math.PI *0.25
                },

                active : false
    
            }

            


            
            // Set up
            this.container = new THREE.Object3D();
            this.container.name = 'Works container';

        
            //params
            this.container.position.set(
                this.params.initialPosition.x,
                this.params.initialPosition.y,
                this.params.initialPosition.z,
            );

    

            this.container.rotation.y = -Math.PI * 0.4;
            this.container.rotation.x = Math.PI * 0.05;


            if (screen.width <= 1200) {
                
                this.container.scale.set(0.8,0.8,0.8);

            }

            if (screen.width <= 1600 && screen.width >= 1201) {
                
                this.container.scale.set(0.9,0.9,0.9);

            }



            this.textureIndex = [];

            for (let index = 0; index < 4; index++) {
                this.textureIndex.push({'index': 0});
            }


             // Debug
        if(this.debug){
  
            // this.debugFolder.add( this.container.position, 'x').min(-20).max(20).step(0.01).name('group position - x');
            // this.debugFolder.add( this.container.position, 'y').min(-20).max(20).step(0.01).name('group position - y');
            // this.debugFolder.add( this.container.position, 'z').min(-20).max(20).step(0.01).name('group position - z');
            // this.debugFolder.add( this.container.rotation, 'x').min(-2).max(2).step(0.01).name('group rotation - x');
            // this.debugFolder.add( this.container.rotation, 'y').min(-2).max(2).step(0.01).name('group rotation - y');
            // this.debugFolder.add( this.container.rotation, 'z').min(-2).max(2).step(0.01).name('group rotation - z');

            }

        }



        /**
         * 
         */
        setLight(){
            
            this.pointLight = new THREE.PointLight( 0xffffff );
            this.pointLight.position.set(0.5,2.5,3.5 );

            this.pointLight.intensity = 500;
            this.pointLight.distance = 6;


        }


        /**
         * 
         */
        addTick(){

            this.time.on('tick', ()=>{

                if (this.visible == true) {

                        this.updatePositionItems( Object.keys(this.items)[this.index]);

                }

            }, 'works')


        }



        /**
         * 
         */
        removeTick(){


           this.time.offCallback('tick', 'works');


        }


        /**
         * 
         */

        setObjects(){



            // items of panels
            this.items = [];
            this.panels = [];
            this.materials = [];
            this.clonePanels = [];
            this.cloneMaterial = [];


            //panels

            this.panelsContainer = new THREE.Group();
            this.panelsContainer.name = 'panel container';

            this.panelsContainer.position.set(-0.5,0,-7);

            this.panelGeometry = new THREE.PlaneBufferGeometry(2,1);



            // INIT


            this.setMesh('2048');
            this.setItems('2048');
            this['container2048'].visible = true;

  
            this.setMesh('Binance');
            this.setItems('Binance');

            
            this.setMesh('Todo');
            this.setItems('Todo');


            this.setMesh('Portfolio');
            this.setItems('Portfolio');




            
            //add to container

            this.container.add(this.panelsContainer);


         }



         
        /**
         * 
         */
        create(){

            this.scene.add(this.container);

        }



         /**
          * 
          * @param {*} category 
          */
         setMesh(category){


            //  init
            this.items[category] = [];
            this['container' + category] = new THREE.Group();
            this['container' + category].name= 'container ' + category;

            this.panels.push(this['container' + category]);


            //  material
            this['material' + category] = panelMaterial();
            this['material' + category].uniforms.uBackground.value = this.resources.items['bg' + category + 'Texture'];
            this['material' + category].uniforms.uOpacity.value = 0;


            this.materials.push(this['material' + category]);



            //  MESH

            this['mesh' + category] = new THREE.Mesh(this.panelGeometry, this['material' + category]);
            this['mesh' + category].name='Mesh - ' + category;


            //  SET UP

     
            const panelPosition = this.data.explore['content_' + category].params.panelPosition;
            const panelRotation = this.data.explore['content_' + category].params.panelRotation;

            this['mesh' + category].position.set(panelPosition.x, panelPosition.y, panelPosition.z );
            this['mesh' + category].rotation.y = panelRotation.y;
            
              // ADD to SCENE
            this.panelsContainer.add(this['mesh'+ category]);

            this.panelsContainer.add(this['container' + category]);




            // debug
            if (this.debug) {
                
                // this.debugFolder.add(this.mesh2048.material.uniforms.uDistortion, 'value').min(0).max(10).name('distortion').step(0.01);
                // this.debugFolder.add(this.mesh2048.material.uniforms.uProgress3, 'value').min(0).max(1).name('uProgress3').step(0.01);
                // this.debugFolder.add(this.mesh2048.material.uniforms.uOffsetX, 'value').min(0).max(5).name('uOffsetX').step(0.001);
                // this.debugFolder.add(this.mesh2048.material.uniforms.uOffsetY, 'value').min(0).max(5).name('uOffsetY').step(0.001);
                // this.debugFolder.add(this.mesh2048.material.uniforms.uOffsetZ, 'value').min(0).max(5).name('uOffsetZ').step(0.001);
            }

            

         }




         /**
          * 
          */

         switchMaterial(category, isCloneVisible){



                this['mesh' + category].visible = !isCloneVisible;
                this['cloneMesh' + category].visible = isCloneVisible;



        }


         /**
          * 
          * @param {*} target 
          * @param {*} isUpdated 
          */
        autoUpdateMatrix(target, isUpdated){

            target.matrixAutoUpdate = isUpdated;

         }



         /**
          * 
          * @param {*} target 
          * @param {*} isUpdated 
          */
         objectUpdateMatrix(target, isUpdated){

            if(isUpdated){

                target.updateMatrix();
            }


         }





         /**
          * 
          * @param {*} category 
          */
         setItems(category){

            //  ITEMS

            this['items' + category] = this.data.explore['content_' + category].items;
            this['params' + category] = this.data.explore['content_' + category].params;


            for (let index = 0; index <  this['items' + category].length; index++) {

               
                let tempElement = undefined;

                if (this['items' + category][index].type == "scene") {


                    if (this['items' + category][index].model == "clone") {
                        tempElement = this.resources.items[ this['items' + category][index].name].scene.clone();
                    }else{

                        tempElement = this.resources.items[ this['items' + category][index].name].scene;
                    }


                }else if (this['items' + category][index].type == "mesh") {
                    
                    tempElement = this.resources.items[ this['items' + category][index].parent].scene.getObjectByName(this['items' + category][index].name).clone();

                }else {


                    if (this['items' + category][index].model == "clone") {
                        
                        tempElement = this.resources.items[ this['items' + category][index].name].scene.children[0].clone();
                    }else{

                        tempElement = this.resources.items[ this['items' + category][index].name].scene.children[0];
                    }


                }



                tempElement.scale.set(this['items' + category][index].scale,  this['items' + category][index].scale, this['items' + category][index].scale);
                tempElement.position.set(this['params' + category].position.x,  this['params' + category].position.y,this['params' + category].position.z);
            
                // custom data
                tempElement.rotation.x = this.params.rotationFactor.x;
                tempElement.rotation.z = this.params.rotationFactor.z;
    
                tempElement.userData.velocity = new THREE.Vector3();
                tempElement.userData.velocity.x = this.params.randomFactor.x() * 0.5;
                tempElement.userData.velocity.y = this.params.randomFactor.y() * 0.5;
                tempElement.userData.velocity.z = this.params.randomFactor.z() * 0.5;


                //set transparent and opacity


                tempElement.traverse(( obj)=>{

                    if (obj instanceof THREE.Mesh){

                        obj.material.transparent = true;
                        obj.material.opacity = 0;
                    

                    }

                });


                // add to container
                this['container' + category].add(tempElement);
                this['container' + category].visible = false;



                // add to items array
                this.items[category].push(tempElement);

            }


         }



        /**
         * 
         */
       
         showScene(){

            
            //action
            this.moveSceneWorks();


        }



        /**
         *                      UPDATE OPACITY SHADERS
         */

        updateOpacityPanels(opacity, duration, delay){
    
            updateOpacityPanel2(this.materials[0], opacity, duration, delay);
            updateOpacityPanel2(this.materials[1], opacity, duration, delay);
            updateOpacityPanel2(this.materials[2], opacity, duration, delay);
            updateOpacityPanel2(this.materials[3], opacity, duration, delay);


       }




        /**
         * 
         * @param {*} category 
         */
         updatePositionItems(category){


            const params = this.data.explore['content_' + category].params;
            const area = params.area;


            if (this['container' + category].visible == true  && this.visible == true) {
      
                for (let index = 0; index < this.items[category].length; index++) {
                    
                    this.items[category][index].position.add(this.items[category][index].userData.velocity);

                    if ( this.items[category][index].position.x < area.xStart || this.items[category][index].position.x > area.xEnd ) {

                        this.items[category][index].position.x = THREE.MathUtils.clamp( this.items[category][index].position.x, area.xStart, area.xEnd );
                        this.items[category][index].userData.velocity.x = - this.items[category][index].userData.velocity.x;

                    }

                    if ( this.items[category][index].position.y < area.yStart || this.items[category][index].position.y > area.yEnd ) {

                        this.items[category][index].position.y = THREE.MathUtils.clamp( this.items[category][index].position.y, area.yStart, area.yEnd );
                        this.items[category][index].userData.velocity.y = - this.items[category][index].userData.velocity.y;

                    }

                    if ( this.items[category][index].position.z < area.zStart || this.items[category][index].position.z > area.zEnd ) {

                        this.items[category][index].position.z = THREE.MathUtils.clamp( this.items[category][index].position.z, area.zStart, area.zEnd );
                        this.items[category][index].userData.velocity.z = - this.items[category][index].userData.velocity.z;

                    }

                    this.items[category][index].rotation.x += this.items[category][index].userData.velocity.x * params.velocityMultiplicator.x * this.time.delta /10;
                    this.items[category][index].rotation.y += this.items[category][index].userData.velocity.y * params.velocityMultiplicator.y * this.time.delta /10;
                    this.items[category][index].rotation.z += this.items[category][index].userData.velocity.z * params.velocityMultiplicator.z * this.time.delta /10;

                }



            }

        }




       
        /**
         * 
         * @param {*} texture1 
         * @param {*} texture2 
         */
        changeTexture(textureFrom, textureTo){


               // switch the texture on start
            this.materials[this.index].uniforms.uBackground.value = textureFrom;
            this.materials[this.index].uniforms.uBackground2.value = textureTo;





            gsap.fromTo(this.materials[this.index].uniforms.uProgress,{

                value: 0,

            },{

                value: 1,
                duration: 1.5,
                onComplete: ()=>{

                    this.materials[this.index].uniforms.uBackground.value = textureTo;
                    this.canUpdateTexture = true;

                }



            })



         }




        /**
         * 
         * @param {*} visible 
         */

        toggleAsideVisibility(visible){


            if (visible) {
                JS.aside.classList.add('active');
                JS.backWord.classList.add('active');
                
            }else{

                JS.aside.classList.remove('active');
                JS.backWord.classList.remove('active');
            }

        }




        /**
         *  function to showing the details of a panel
         */
        showDetails(){




            if (this.inMove == true) {

                return 0;
            }

            this.inMove = true
            this.trigger('inIdleMode');

            this.maskTitle(this.index);
            this.updatePositionScene('forward');

            this.toggleAsideVisibility(true);



            showHideDetailsParagraph(JS.paragraph, 0,1,
                'translateX(100%) translateY(100%)', 'translateX(0%) translateY(0%)',
                0.7,0.5, JS.easings.Power2InOut, 0.1)

                
            showHideDetailsParagraph(JS.technologies(), 0,1,
                'translateX(100%) translateY(100%)', 'translateX(0%) translateY(0%)',
                0.5,1, JS.easings.Power2InOut, 0.1)
            

            updateOpacityArrows(0, 0.5, 0.5,JS.easings.Power2InOut, ()=>{

            }, 
            ()=>{

               
            });

       
        }



        /**
         * 
         * @returns 
         */

        hideDetails(){


            if (this.inMove == true) {
               
                return 0;
            }

            this.inMove = true
            this.inDetailMode = false;

            this.unMaskTitle(this.index);
            this.updatePositionScene('backward');


           this.toggleAsideVisibility(false)

            showHideDetailsParagraph(JS.technologies(), 1,0,
                'translateX(0%) translateY(0%)', 'translateX(100%) translateY(100%)', 
                1,0, JS.easings.Power2Out, 0.1)

            showHideDetailsParagraph(JS.paragraph, 1,0,
                'translateX(0%) translateY(0%)', 'translateX(100%) translateY(100%)', 
                1,0, JS.easings.Power2Out, 0.1)


            updateOpacityArrows(1,0.5,1.5,JS.easings.Power2InOut, 
                ()=>{
                    
                    this.inIdleMode = false;
                }, 
                () => {
                
                    JS.arrows.forEach((arrow)=>{
                        arrow.style.display = 'block';

                    this.trigger('loaded');

                 })

                }

            )

            

        }





        /**
         * 
         * @param {*} index 
         */

        updateDetailsContent(index){

            const data = this.data.explore[this.data.panels[index]]

            JS.project.innerText = data.hero
            JS.year.innerText = data.year
            JS.description.innerText = data.description;
            JS.technologiesContent.innerHTML = '';
            JS.link.href = data.link;


            for (let index = 0; index < data.technologies.length; index++) {
           

                JS.technologiesContent.innerHTML += this.getTechnologyLogo(data.technologies[index]);
                
            }



        }


        /**
         * 
         * @param {*} techno 
         * @returns 
         */

        getTechnologyLogo(techno){


            const temp = techno.toLowerCase().replace(' ','' );
            let element = `<li class="technologies-item">`;


            element += `<span class="${temp}-image detail-image"></span>`;
            element += `<span>${techno}</span></li>`;

            return element;
            
        }




        /**
         *  Animate the movement of works area backward // forward  scene
         */

        moveSceneWorks(){

            this.index = 0;
            let maxIndex = 3;
            let minIndex = 0;
 
            this.status = this.data.status[this.index];


            gsap.to(this.panelsContainer.position, {
            
                x: '+=' + 2,
                z: '+=' + 4.5,
                duration: 2,
                ease: 'power4.out',
                delay: 0.5

            })
  


            JS.arrowRight.addEventListener('click', ($event)=>{

               if (this.inMove == true || this.visible == false) {
                    return 0;
                }

                   


                if (this.index < maxIndex) {

                    this.inMove = true;

                    gsap.to(this.panelsContainer.position, {
                
                        x: '+=' + 2,
                        z: '+=' + 4.5,
                        duration: 2,
                        ease: 'power4.out',
                        onStart: () => {

                            // update opacity of items of each panel
    
                            this.updateTitle(this.index, 'forward');
                            this.updateItems(this.index , 'forward');
                            this.trigger('idle');
   
                            this.index++;
                        
                        },
                        onComplete: () => {
                        
                            this.inMove = false;
                            this.updateDetailsContent(this.index);

                        
                        }
                    
                    });

                   
                }
 

            });


            JS.arrowLeft.addEventListener('click', ($event)=>{


                if (this.inMove == true || this.visible == false) {

                    return 0;
                }

                


                if (this.index > minIndex) {

                    this.inMove = true;    
                                   
                    gsap.to(this.panelsContainer.position, {
                
                        x: '-=' + 2,
                        z: '-=' + 4.5,
                        duration: 2,
                        ease: 'power4.out',
                        onStart: () => {
                        
                             // update opacity of items of each panel

                            this.updateTitle(this.index, 'backward');
                            this.updateItems(this.index  , 'backward');
                            this.trigger('idle');

                       

                            this.index--;
                        
                        },
                        onComplete: () => {
                    
                            this.inMove = false;
                            this.updateDetailsContent(this.index);

                    
                        }
                    
                    });
  
                }


            });

        }




        /**
         * 
         */
        resetPositionScene(){

           this.panelsContainer.position.set(-0.5,0,-7);
           this.panelsContainer.updateMatrixWorld();

        }


        /**
         *   function to update the scene in front when explore
         * @param {*} movement 
         */

        updatePositionScene(movement){


            switch (movement) {
                case 'forward':

                if (this.inDetailMode !=true) {
                    
                    this.statusPosition = 'forward';



                    if (screen.width <= 1200) {
                        updateContainer(this.container.position, {x:'+=1', y:'-=0.25', z:'+=1.5'}, 1, 0.2, JS.easings.Power2In, null) ;

                    }else if (screen.width <= 1600) {
                        updateContainer(this.container.position, {x:'+=1', y:'-=0.5', z:'+=1.5'}, 1, 0.2, JS.easings.Power2In, null) ;

                    }else{


                        updateContainer(this.container.position, {x:'+=1.5', y:'-=0.5', z:'+=2'}, 1, 0.2, JS.easings.Power2In, null) ;

                    }


                    updateContainer(this.container.rotation, {x:'-=0.15', y:'-=0.2', z:'+=0'}, 1, 0.2, JS.easings.Power2In, 
                          () => {
                                  
                              JS.change.classList.add('active');
                              this.inMove = false;
                            
                          
                          }
                          
                    ) ;
  
  
                    updateOpacityOnChangeAction(JS.up, 0, 1, 'translateY(50%)', 'translateY(0%)',1,2,JS.easings.Power2Out);
                    updateOpacityOnChangeAction(JS.down, 0, 1, 'translateY(-50%)', 'translateY(0%)',1,2,JS.easings.Power2Out, 
                    ()=>{
                      JS.change.style.opacity = 1;
                     
                      },
                      ()=>{
                        this.trigger('inDetailMode');
                      }
                      );
                }

  

                    break;


                case 'backward':


                    JS.change.classList.remove('active');


                    if (screen.width <= 1200) {
                        updateContainer(this.container.position, {x:'-=1', y:'+=0.25', z:'-=1.5'}, 1, 1.2, JS.easings.Power2In, null) ;

                    }else if (screen.width <= 1600) {
                        updateContainer(this.container.position, {x:'-=1', y:'+=0.5', z:'-=1.5'}, 1, 1.2, JS.easings.Power2In, null) ;

              
                    }else{

                        updateContainer(this.container.position, {x:'-=1.5', y:'+=0.5', z:'-=2'}, 1, 1.2, JS.easings.Power2In, null) ;
     

                    }

                    updateContainer(this.container.rotation, {x:'+=0.15', y:'+=0.2', z:'+=0'}, 1, 1.2, JS.easings.Power2In, 
                    () => {
                        
                        this.inMove = false;


                    
                    }
        
                  
                ) ;




  

                    updateOpacityOnChangeAction(JS.up, 1, 0, 'translateY(0%)', 'translateY(-50%)',1,0.8,JS.easings.Power2Out);
                    updateOpacityOnChangeAction(JS.down, 1, 0, 'translateY(0%)', 'translateY(50%)',1,0.8,JS.easings.Power2Out,null,

                        ()=>{
                            JS.change.style.opacity = 0;


                        }
                    );

                    break;
            
                default:
                    break;
            }

          

        }



        /**
         * 
         * @param {*} index 
         */

        resetOpacityItems(index){


            updateOpacityShaderWithTraverse(this.panels[index], THREE.Mesh, 0,1, 1.5, JS.easings.CircIn)

        }


        /**
         *  function to update the opacity of each items before the panel
         */
        updateItems(index, movement){


            switch (movement) {
                case 'forward':

                    this.panels[index + 1].visible = true;


                    updateOpacityShaderWithTraverse(this.panels[index + 1], THREE.Mesh, 1,1, 1.5, JS.easings.CircIn)

                    updateOpacityShaderWithTraverse(this.panels[index], THREE.Mesh, 0,1, 3, JS.easings.CircOut,
                        () => {
                                    
                            this.panels[index].visible = false;
                        
                        }
                     )
                    
                    break;


                case 'backward':

                
                    this.panels[index - 1].visible = true;


                    updateOpacityShaderWithTraverse(this.panels[index - 1], THREE.Mesh, 1, 1, 1.5, JS.easings.CircIn)

                    updateOpacityShaderWithTraverse(this.panels[index], THREE.Mesh, 0, 1, 1, JS.easings.CircOut,
                        () => {
                                    
                            this.panels[index].visible = false;
                        
                        }
                     )


                    break;
            
                default:
                    break;
            }







        }



        /**
         * 
         * @param {*} index 
         * @param {*} movement 
         */
        updateTitle(index, movement){

  
            switch (movement) {
                case 'forward':
                    

            // disparition du titre
            const title2= getTitle(`[data-panel="${index}"]`);
            const chars2 = getChars(`[data-panel="${index}"]`);


            animateFromToChars(chars2, 1, 0, 'translateX(0%)', 'translateX(400px)', 1, 0.5, 0.5,0,JS.easings.CircEaseOut, 0.03, null,
            
                    ()=>{
            
                        title2.innerHTML = this.data.title[index];
                        title2.style.opacity = 0;
                        title2.style.display = 'none';

                    },
            
            )

            animateHR('scaleY(0)', 0.5,0, JS.easings.Power2Out);

            animateExplores(201, 0.2, 0,JS.easings.CircIn, 0.02, 'start');



            
            // reapparition du titre
            const title = getTitle(`[data-panel="${index + 1 }"]`);
            const chars = getChars(`[data-panel="${index + 1 }"]`);


            animateFromToChars(chars, 0, 1, 'translateX(-200px)', 'translateX(0%)', 0.5, 1, 1,1,JS.easings.CircEaseIn, 0.05,
            
                        ()=>{
                
                            title.style.opacity = 1;
                            title.style.display = 'block';

                        }
                        
            )


            animateHR('scaleY(1)', 1,1.2, JS.easings.Power2InOut);

            animateExplores(0, 0.4, 1,JS.easings.CircIn, 0.1, 'start',
            
                    ()=>{ this.trigger('loaded');
                });



            break;


            case 'backward' :


                
                const title4= getTitle(`[data-panel="${index }"]`);
                const chars4 = getChars(`[data-panel="${index}"]`);
    
    
              //disparition du titre
                animateFromToChars(chars4, 1, 0, 'translateX(0%)', 'translateX(400px)', 1, 0.5, 0.5,0,JS.easings.CircEaseOut, 0.03, null, 
                
                        ()=>{
                
                            title4.innerHTML = this.data.title[index];
                            title4.style.opacity = 0;
                            title4.style.display = 'none';
  
                        },
                
                )
    
                animateHR('scaleY(0)', 0.5,0, JS.easings.Power2Out);
    
                animateExplores(201, 0.2, 0,JS.easings.CircIn, 0.02, 'start');
                




                
                //reapparition du titre
                const title3 = getTitle(`[data-panel="${index - 1 }"]`);
                const chars3 = getChars(`[data-panel="${index - 1 }"]`);
    
    
                animateFromToChars(chars3, 0, 1, 'translateX(-200px)', 'translateX(0%)', 0.5, 1, 1,1,JS.easings.CircEaseIn, 0.05,
                
                            ()=>{
                    
                                title3.style.opacity = 1;
                                title3.style.display = 'block';
    
                            }
                            
                )
    
    
                animateHR('scaleY(1)', 1,1.2, JS.easings.Power2InOut);
    
                animateExplores(0, 0.4, 1,JS.easings.CircIn, 0.1, 'start',
                        
                        ()=>{ 
                            this.trigger('loaded');
                });
    

      
                break;

            
            default:
                break;
        }


        }




        /**
         * 
         * @param {*} index 
         */

        maskTitle(index){




            const title= getTitle(`[data-panel="${index}"]`);
            const chars = getChars(`[data-panel="${index}"]`);



            animateFromToChars(chars, 1, 0, 'translateX(0%)', 'translateX(400px)', 1, 0.5, 1,0,JS.easings.CircEaseOut, 0.03, null, 
            
                    ()=>{
            
                        title.innerHTML = this.data.title[index];
                        title.style.opacity = 0;
                        title.style.display = 'none';
                    },
            
            )

            animateHR('scaleY(0)', 0.5,0, JS.easings.Power2InOut);

            animateExplores(201, 0.3, 0,JS.easings.CircIn, 0.05, 'end');



       }


        /**
         * function to mask title of items when changing of items
         * @param {*} index 
         */
        maskTitleOnTransition(index){




            const title= getTitle(`[data-panel="${index}"]`);
            const chars = getChars(`[data-panel="${index}"]`);



            animateFromToChars(chars, 1, 0, 'translateX(0%)', 'translateX(400px)', 1, 0.5, 0.5,0,JS.easings.CircEaseOut, 0.02, null, 
            
                    ()=>{
            
                        title.innerHTML = this.data.title[index];
                        title.style.opacity = 0;
                        title.style.display = 'none';
                    },
            
            )

            animateHR('scaleY(0)', 0.5,0, JS.easings.Power2InOut);

            animateExplores(201, 0.3, 0,JS.easings.CircIn, 0.05, 'end');

        }



       /**
         * function to mask title when changing category
         * @param {*} index 
         */
        maskTitleOnChangingScene(index){




            const title= getTitle(`[data-panel="${index}"]`);
            const chars = getChars(`[data-panel="${index}"]`);



            animateFromToChars(chars, 1, 0, 'translateX(0%)', 'translateX(400px)', 1, 0.5, 0.5, 0,JS.easings.CircEaseOut, 0.02, null, 
            
                    ()=>{
            
                        title.innerHTML = this.data.title[index];
                        title.style.opacity = 0;
                        title.style.display = 'none';
                    },
            
            )

            animateHR('scaleY(0)', 0.5,0, JS.easings.Power2InOut);

            animateExplores(201, 0.3, 0,JS.easings.CircIn, 0.05, 'end');

        }










        /**
         * function to unmask title when details is closing
         * @param {*} index 
         */
        unMaskTitle(index){




            const title = getTitle(`[data-panel="${index}"]`);
            const chars = getChars(`[data-panel="${index}"]`);


            animateFromToChars(chars, 0, 1, 'translateX(-200px)', 'translateX(0%)', 0.5, 1, 1,1.8,JS.easings.CircEaseIn, 0.05,
            
                        ()=>{
                
                            title.style.opacity = 1;
                            title.style.display = 'block';

                        },
                        
            )


            animateHR('scaleY(1)', 1, 2, JS.easings.Power2InOut);





            animateExplores(0, 0.4, 1.8,JS.easings.CircIn, 0.1, 'start',
                    () => {
                            
                        this.inMove = false;
                        this.trigger('loaded');
                    
                    }
            
            );

         }





        /**
         *  function to update the title of the panel
         */
        showTitle(){

            
        const title = getTitle(`[data-panel="0"]`);
        const chars = getChars(`[data-panel="0"]`);


            animateFromToChars(chars, 0, 1, 'translateX(-200px)', 'translateX(0%)', 0.5, 1, 0.7,1,JS.easings.CircEaseIn, 0.08, 
            
                        ()=>{
                
                            title.style.opacity = 1;
                            title.style.display = 'block';

                        },
                        
            )


            animateHR('scaleY(1)', 0.7, 1, JS.easings.Power2InOut);





            animateExplores(0, 0.2, 1.5,JS.easings.CircIn, 0.1, 'start',null);

            updateOpacityArrows(1, 1, 2, JS.easings.Power2InOut,
                ()=>{

                    this.trigger('loaded');
                },
                 null);


        }



     /**
     * 
     */
    destroy(){

        removeObject3D(this.container);
    }




















}