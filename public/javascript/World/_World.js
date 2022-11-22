import * as THREE from 'three';

import gsap from 'gsap';
import SplitText from "gsap/SplitText";



import * as JS from './Helpers/JSElement.js';

import { worksClickListener, nameClickListener, contactClickListener, skillsClickListener, aboutClickListener, worksEnterListener,  worksLeaveListener, contactEnterListener, contactLeaveListener, skillsEnterListener,skillsLeaveListener,aboutEnterListener,aboutLeaveListener} from './Helpers/Listener.js';
import { updateOpacityShaderWithTraverse, hideHeroBanner, moveEaseCamera, moveEaseScene, updateOpacityArrows, animateEnterLink, animateLeaveLink} from './Helpers/Animations.js';


import { Intro } from './Intro/Intro.js';
import { Home } from './Home/Home.js';
import { Works } from './Works/Works.js';
import { Contact} from './Contact/Contact.js';
import { Skills} from './Skills/Skills.js';
import { About} from './About/About.js';
import Loader from '../Utils/Loader.js';


export default class{


constructor(_options)
    {

        //init GSAP Plugins
        gsap.registerPlugin(SplitText);


        // Options
        this.options = _options;
        this.config = _options.config;
        this.debug = _options.debug;
        this.time = _options.time;
        this.sizes = _options.sizes;
        this.scene = _options.scene;
        this.camera = _options.camera;
        this.renderer = _options.renderer;
        this.light = _options.light;
        this.data = _options.data;

        _options.loader = new Loader();

     
        // Set up
        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;
        this.container.name = 'World container';

        this.status = 0;
        this.inMove = true;




        // functions
        this.setWorldListener();

        this.setIntro();


        this.intro.on('finished', ()=>{

            this.setHome();

            
            this.home.on('loaded', ()=>{

                this.inMove = false;

            })
            
            this.home.on('initialized', ()=>{


                 
            if (this.works == undefined ) {

                this.setWorks();

                this.works.on('loaded', ()=>{

                    this.inMove = false

    
                })

                this.works.on('idle', ()=>{

                    this.inMove = true
    
                })
            }



                 
            if (this.skills == undefined ) {

                this.setSkills();

                this.skills.on('loaded', ()=>{

                    this.inMove = false

    
                })
            }


        })


        })







       }


   

    /**
     * manage appearition of the works scene
     */

    setWorldListener(){

        /**
         * 
         */

        nameClickListener(()=>{ 



            if(this.status !=0){


                if (this.home.params.active || this.inMove == true) {
                    return
                }
    
    
                this.inMove = true;

               
                this.home.params.active = true;
                this.home.params.visible = true;
    
                this.removeNavColor(this.status);
    
                this.hideSceneOnTransition();
    
                this.moveCameraOnTransition();

    
                window.setTimeout(()=>{
                    this.home.setTargetLight();
                    this.home.animate();
                    this.status = 0;
    
    
                }, 2000)

            }

        })



        /**
         *                      WORKS LISTENER
         */
        worksClickListener(()=>{

             
            if (this.works == undefined ) {

                this.setWorks();

                this.works.on('loaded', ()=>{
 
                    this.inMove = false

    
                })

                this.works.on('idle', ()=>{

                    this.inMove = true
    
                })
            }


            
            if (this.works.params.active || this.inMove == true) {
                return
            }

            this.inMove = true;

              this.works.params.active = true;
            this.works.addTick();
            this.removeNavColor(this.status);
            this.addNavColor(1);

            this.hideSceneOnTransition();

            this.moveCameraOnTransition();

            moveEaseScene(this.works.container, this.works.params.initialPosition, this.works.params.finalPosition, 2, 0, JS.easings.CircOut,
                ()=>{
                },
                null,
                () => {
                    this.works.setTargetLight();
                    this.works.updateOpacityPanels(1,1,0);
                    this.works.showScene();
                    updateOpacityShaderWithTraverse( this.works.container2048, THREE.Mesh, 1, 1, 1,  JS.easings.CircIn, null);

                    this.works.showTitle();
                    this.status = 1;
                    this.works.visible = true;
                    this.works.panels[0].visible = true;
                    this.light[1].setIntensity(200,2,0);
                  
                }
            );

        })


        worksEnterListener(()=>{

            if (this.status != 1) {
                animateEnterLink(JS.charsWorkLink);
            }

        });


        worksLeaveListener(()=>{

  
            if(this.works.params.active != true)
            {animateLeaveLink(JS.charsWorkLink)}
        });






        /**
        *                   SKILLS LISTENER
        */

        let skillsReady = false;
  
        skillsClickListener(()=>{


            
            if (this.skills == undefined ) {

                this.setSkills();

                this.skills.on('loaded', ()=>{
                
                    this.inMove = false

    
                })
            }


                if (this.skills.params.active || this.inMove == true) {
                return
            }

            this.inMove = true;


            this.skills.params.active = true;

            this.hideSceneOnTransition();
            this.removeNavColor(this.status);
            this.addNavColor(2);
            this.skills.addTick();
            this.skills.params.visible = true,

            this.moveCameraOnTransition();


            moveEaseScene(this.skills.container, this.skills.params.initialContainerPosition, this.skills.params.finalContainerPosition, 2, 2, JS.easings.CircOut,
                ()=>{
                    this.skills.setTargetLight();
                    this.skills.animate();
                    

                },
                null,
                () => {

                    this.status = 2;
                
                }
            );


       //})


        });

        skillsEnterListener(()=>{

     
            if (this.status != 2) {
                animateEnterLink(JS.charsSkillsLink)
            }


        });


        skillsLeaveListener(()=>{

            if(this.skills.params.active != true)
            {animateLeaveLink(JS.charsSkillsLink)}
        });

    



       /**
        *                   ABOUT LISTENER
        */


  
        aboutClickListener(()=>{

            if (this.about == undefined ) {
                
                this.setAbout();

                this.about.on('loaded', ()=>{
 
                    this.inMove = false;
    
                })

                this.about.on('idle', ()=>{
                  
                    this.inMove = true;
    
                })

                this.about.on('action', ()=>{
              
                    this.inMove = false;
    
                })

            



            }

            if (this.about.params.active || this.inMove == true) {
                return
            }

            this.inMove = true;



            this.about.params.active = true;
            this.about.addTick();
            this.removeNavColor(this.status);
            this.addNavColor(3);

            this.hideSceneOnTransition();

            this.moveCameraOnTransition();


            moveEaseScene(this.about.container, this.about.params.initialPosition,  this.about.params.finalPosition, 0.5, 2, JS.easings.CircOut,
                ()=>{
     
                    this.about.setTargetLight();
                    this.about.initScene();

                },
                null,
                () => {
                    
                    this.status = 3;
                    this.about.visible = true;

                    this.about.startAnimation(this.about.animationsClip, this.about.mixer);

                    
                }
            );




        });



       aboutEnterListener(()=>{

            if (this.status != 3) {
                animateEnterLink(JS.charsAboutLink)
            }


        });


        aboutLeaveListener(()=>{

            if(this.about == undefined || this.about.params.active != true){ 
                animateLeaveLink(JS.charsAboutLink)
            }
        });



        
        /**
        *                   CONTACT LISTENER
        */

  
         contactClickListener(()=>{


            if (this.contact == undefined ) {
                
                this.setContact();

                this.contact.on('loaded', ()=>{

                    this.inMove = false;
    
                })

                this.contact.on('idle', ()=>{
                    this.inMove = true;
                })
            }


            if (this.contact.params.active || this.inMove == true) {
                return
            }

            this.inMove = true;
        
            this.contact.params.active = true;
            this.removeNavColor(this.status);
            this.addNavColor(4);

            this.hideSceneOnTransition();

            this.moveCameraOnTransition();

            moveEaseScene(this.contact.container, this.contact.params.initialPosition, this.contact.params.finalPosition, 2, 2, JS.easings.CircOut,
                ()=>{
                    this.contact.setTargetLight();
                    this.contact.params.updateCannon = true;
                    this.contact.animate();
                },
                null,
                () => {
                    
                    this.status = 4;
                
                }
            );




        });


        contactEnterListener(()=>{

            if (this.status != 4) {
                animateEnterLink(JS.charsContactLink)
            }

        });


        contactLeaveListener(()=>{

             if(this.contact ==undefined || this.contact.params.active != true){
                animateLeaveLink(JS.charsContactLink)
            }
        });



    }



    /**
     * 
     * @param {*} index 
     */
    addNavColor(index){


        const navColor = 'rgb(255,198,51)';

        switch (index) {
            case 0:
                break;
            case 1:
                JS.charsWorkLink.forEach((letter)=>{letter.style.color = navColor});

                break;
            case 2:
                JS.charsSkillsLink.forEach((letter)=>{letter.style.color = navColor});
                break;
            case 3:
                JS.charsAboutLink.forEach((letter)=>{letter.style.color = navColor});
                break;
            case 4:
                JS.charsContactLink.forEach((letter)=>{letter.style.color = navColor});
                break;
        
            default:
                break;






            }

        }





    /**
     * 
     */
    removeNavColor(index){

        switch (index) {
            case 0:
                
                break;
            case 1:
                this.works.params.active = false;
                animateLeaveLink(JS.charsWorkLink);
                break;
            case 2:
                this.skills.params.active = false;
                animateLeaveLink(JS.charsSkillsLink);

                break;
            case 3:
                this.about.params.active = false;
                animateLeaveLink(JS.charsAboutLink);
                break;
            case 4:
                this.contact.params.active = false;
                animateLeaveLink(JS.charsContactLink);
                break;
        
            default:
                break;
        }




    }



    /**
     * 
     */
    moveCameraOnTransition(){

        let camera = this.camera.container.children[0];

        moveEaseCamera(camera, camera.params.farPosition, 2, 0, JS.easings.Power2InOut,
            null,
            null,
            null);

        moveEaseCamera(camera, camera.params.nearPosition, 2, 2, JS.easings.CircOut,null, null, null)

    }



    /**
     * 
     */
    hideSceneOnTransition(){

        switch (this.status) {
            case 0:

                this.home.params.active = false;
                hideHeroBanner();
                this.home.hideFloor();
                this.home.params.active = false;
                this.home.removeTick();
                
                break;


            case 1:

                //this.works.updateOpacityPanel(0);

                updateOpacityArrows(0, 0.5, 0.5,JS.easings.Power2InOut, null, null);

                this.works.maskTitleOnChangingScene(this.works.index);

                this.works.updateOpacityPanels(0, 1.2, 0);

                moveEaseScene(this.works.container, this.works.params.finalPosition, this.works.params.initialPosition, 2, 1, JS.easings.Power2Out,
   
                    () => {
                        
      
                        
                    
                    },
                    null,
                    ()=>{
                        this.works.resetPositionScene();
                        this.works.resetOpacityItems(this.works.index);
                        this.works.visible = false;
                        this.works.index--;
                        this.works.updateDetailsContent(0);
                        this.works.removeTick();

                    }
                );

            
                break;


            case 2:

                moveEaseScene(this.skills.container, this.skills.params.finalContainerPosition, this.skills.params.initialContainerPosition, 2, 1, JS.easings.CircOut,
   
                    () => {
                        
                    },
                    null,
                    ()=>{

                        this.skills.stopAnimation();
                        this.skills.params.visible = false;
                        this.skills.removeTick();

                    }
                );
            

                
                break;
                
                
            case 3:


                moveEaseScene(this.about.container, this.about.params.finalPosition, this.about.params.initialPosition, 2, 1, JS.easings.CircOut,
   
                    () => {

                    
                    },
                    null,
                    ()=>{

                        this.about.stopAnimation();
                        this.about.removeTick();
                        this.about.animationFinished = false;
                    }
                );
            
                
                break;   
                




            case 4:
    
                moveEaseScene(this.contact.container, this.contact.params.finalPosition, this.contact.params.initialPosition, 2, 1, JS.easings.CircOut,
                    null,
                    null,
                    ()=>{
                        this.contact.destroy();
                        this.contact.removeTick();
                    }
                );

                            
                break; 
                
            
            
            
            default:
                break;
        }





    }


    
    /**
     * 
     */
    setIntro(){

        this.intro = new Intro(this.options);

        this.scene.add(this.intro.container);


    }


    
    /**
     *                  HOME PANEL
     */
    setHome(){

        this.home = new Home(this.options);


    }




    /**
     *                  WORKS PANEL
     */

    setWorks(){


        this.works = new Works(this.options);
      
    }





    /**
     *                      CONTACT PANEL
     */
    setContact(){


        this.contact = new Contact(this.options);


    }




    /**
     *                      SKILLS PANEL
     */

    setSkills(){


        this.skills = new Skills(this.options);

    }
    
    
    
    /**
     *                      ABOUT PANEL
     */

    setAbout(){


        this.about = new About(this.options);

    }

}
