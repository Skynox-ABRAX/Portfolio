
import * as THREE from 'three';
import * as JS from '../Helpers/JSElement.js';
//import CannonDebugger from 'cannon-es-debugger';


import { data } from '../../Data.js';
import Resources from '../../Resources.js';


import { animateFromToCharsTitle, showHideForm, showHideInput, showHideMessage, updateContainer } from '../Helpers/Animations';
import { formClickListener, backContactClickListener, lastNameFocusListener, firstNameFocusListener, phoneFocusListener, emailFocusListener, messageFocusListener} from '../Helpers/Listener';
import { getTime, removeObject3D } from '../../Utils/Helpers.js';
import EventEmitter from '../../Utils/EventEmitter.js';


export class Contact extends EventEmitter{

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

            _options.resources = data.region.contact;
            this.resources = new Resources(_options, 'contact');


            //params
            this.params ={
                initialPosition:{
                    x: 0,
                    y: -4,
                    z: -8
                },

                finalPosition:{
                    x: 0,
                    y: 0,
                    z: 0
                },
                size : 0.2,
                updateCannon : false,
                active: false

            }


            this.startTime = new Date;
            this.inMove = false;

                    
            // Set up
            this.container = new THREE.Object3D();
            this.container.name = 'contact group';

            this.container.position.x = this.params.initialPosition.x;
            this.container.position.y = this.params.initialPosition.y;
            this.container.position.z = this.params.initialPosition.z;


            
            if (window.innerWidth <= 1200 || screen.width <=1200) {
                
                this.container.scale.set(0.8,0.8,0.8);

            }

            if (window.innerWidth <= 1400 && window.innerWidth >= 1201) {
                
                this.container.scale.set(0.9,0.9,0.9);

            }


           //if (true) {

            import( /*webpackChunkName: "cannon" */ 'cannon-es').then((CANNON)=>{

                this.cannon = CANNON;
                
            })
          // }


          
            // Debug
            if(this.debug)
            {
                this.debugFolder = this.debug.addFolder('world');
                this.debugFolder.open();

                this.resources.on('progress', (..._progress)=>{

                    console.log('progress', _progress);
                })
            }

            this.resources.on('readyContact', ()=>{

                this.setContactListener();
                this.setObjects();
                this.create();

            })
 

            //getTime(this.startTime, new Date, 'load contact');




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


        //this.time.on('tick', ()=>{this.updateAnimation()}, 'about');


    }

    /**
     * 
     */
    removeTick(){


        this.time.offCallback('tick', 'contact');


    }
    




    /**
     * 
     */
    setContactListener(){


        backContactClickListener(() => {

            if (this.visible == false) {
                return
            }
            this.hideDetails()
        })

        formClickListener(() => {this.sendEmail()})


        lastNameFocusListener(()=>{

            if( !this.validateString(JS.lastName.value)){
                JS.lastNameError.classList.add('active');
            }else{
                JS.lastNameError.classList.remove('active');
            }
        })



        firstNameFocusListener(()=>{
            if( !this.validateString(JS.firstName.value)){
                JS.firstNameError.classList.add('active');
            }else{
                JS.firstNameError.classList.remove('active');
            }
        })



        phoneFocusListener(()=>{
            if( !this.validatePhoneNumber(JS.phone.value)){
                JS.phoneError.classList.add('active');
            }else{
                JS.phoneError.classList.remove('active');
            }
        })


        emailFocusListener(()=>{
            if( !this.validateEmail(JS.email.value)){
                JS.emailError.classList.add('active');
            }else{
                JS.emailError.classList.remove('active');
            }
        })


        messageFocusListener(()=>{
            if( JS.message.value == ""){
                JS.messageError.classList.add('active');
            }else{
                JS.messageError.classList.remove('active');
            }
        })


    }



    /**
     * 
     */

    setObjects(){


        this.master = [];

        this.diceLetter = this.resources.items.dices.scene.getObjectByName('letter').clone();
        this.diceArobase = this.resources.items.dices.scene.getObjectByName('arobase').clone();
        this.diceWorld = this.resources.items.dices.scene.getObjectByName('world').clone();
        this.dicePhone = this.resources.items.dices.scene.getObjectByName('phone').clone();
        this.diceSite = this.resources.items.dices.scene.getObjectByName('site').clone();

        this.master.push( this.diceLetter);
        this.master.push( this.diceArobase);
        this.master.push( this.diceWorld);
        this.master.push( this.dicePhone);
        this.master.push( this.diceSite);


        for (let index = 0; index < this.master.length; index++) {
           
            this.setScale(this.master[index]);
            this.setPosition(this.master[index], {x: -2 + index  , y: 0.2, z: - index * 0.25 + 3})


        }


         

    }


    /**
     * 
     * @param {*} target 
     */

    setScale(target){


        target.traverse((obj)=>{


            if (obj instanceof THREE.Mesh) {
                
                 obj.scale.set(this.params.size, this.params.size, this.params.size);
            }


        })


    }
    
    

    /**
     * 
     * @param {*} target 
     * @param {*} position 
     */
    
    setPosition(target, position){


        target.position.set(position.x, position.y, position.z);


    }



    /**
     * 
     */
    setPhysics(){


        /**
         *  THREE CONTAINER of Cube Physics
         */


        this.containerPhysic = new THREE.Group();
        this.containerPhysic.name= 'physics container';
        this.container.add(this.containerPhysic);


        /**
         * Physics
         */


        const world = new this.cannon.World();
        

        world.gravity.set(0, - 9.82, 0)

        world.broadphase = new this.cannon.SAPBroadphase(world)
        world.allowSleep = true

        
        // const cannonDebugger = new CannonDebugger(this.scene, world, {
        //     // options...
        //   })



        const concreteMaterial = new this.cannon.Material('concrete')
        const plasticMaterial = new this.cannon.Material('plastic')

        const concretePlasticContactMaterial = new this.cannon.ContactMaterial(
            concreteMaterial,
            plasticMaterial,
            {
                friction: 0.3,
                restitution: 0.1
            }
        )

        const objectsToUpdate = [];








        this.createBox = (type, position) =>{


                // Three.js mesh
                const mesh = type.clone();
                mesh.castShadow = true;
                mesh.position.copy(position);

                this.containerPhysic.add(mesh);



                // Cannon.js body
                const shape = new this.cannon.Box(new this.cannon.Vec3(this.params.size, this.params.size, this.params.size))
            
                const body = new this.cannon.Body({
                    mass: 1,
                    position: new this.cannon.Vec3(0, 3, 0),
                    shape: shape,
                    material: plasticMaterial
                })
                body.position.copy(position);
                body.sleepSpeedLimit = 0.5;
                world.addBody(body)


                   // Save in objects to update
                objectsToUpdate.push({
                    mesh: mesh,
                    body: body
                })




        }



        
        for (let index = 0; index < this.master.length; index++) {
           
            this.createBox( this.master[index], this.master[index].position );
        }


        const floorShape = new this.cannon.Plane(20,20);

        const floorBody = new this.cannon.Body();

        floorBody.mass = 0;

        floorBody.addShape(floorShape);

        floorBody.material = concreteMaterial;


        floorBody.quaternion.setFromAxisAngle(new this.cannon.Vec3(1,0,0), -Math.PI * 0.5);
  
        world.addBody(floorBody); 
        world.addContactMaterial(concretePlasticContactMaterial);


       
        this.time.on('tick', () =>
        {
    
            // Update physics
            
            if (this.params.updateCannon) {

                world.step(1 / 60, this.time.delta, 3);

                for(const object of objectsToUpdate)
                {
                    object.mesh.position.copy(object.body.position);
                    object.mesh.quaternion.copy(object.body.quaternion)
                }
            }
    

            //cannonDebugger.update() 

        }, 'contact');

    }







    /**
     * 
     */

    animate(){


        this.light[1].setIntensity(200);

        this.setPhysics();


        const params= {
            x: (()=>{ return Math.random() -0.5})(),
            y: (()=>{ return Math.random() * 5 })(),
            z: (()=>{ return Math.random() -0.5 })()
        }

        const interval = [];
        

        for (let index = 0; index < this.master.length; index++) {

            window.setTimeout(()=>{
                
                interval[index] =window.setInterval(()=> {return this.createBox( this.master[index], { x: Math.random() -0.5 , y: Math.random() * 5 , z: Math.random() -0.5 })}, 100);

            }, 2000)
    
        }


        window.setTimeout(()=>{

            for (let index = 0; index < interval.length; index++) {
               clearInterval(interval[index]);
            }

            
            this.animateAside();
        

        }, 3500);





    }





    /**
     * 
     */
    create(){

        this.scene.add(this.container);

    }



    /**
     * 
     */
    animateAside(){

        window.setTimeout(()=>{

            this.toggleAsideVisibility(true);

            this.animateForm();

        }, 500)





    }



    
    /**
     * 
     * @param {*} visible 
     */

        toggleAsideVisibility(visible){


        if (visible) {
            JS.asideContact.classList.add('active');
            JS.backWordContact.classList.add('active');
            
        }else{

            JS.asideContact.classList.remove('active');
            JS.backWordContact.classList.remove('active');
        }

    }


    /**
     * 
     */
    animateForm(){


        this.updatePositionScene('forward');

        showHideForm(JS.form, 
            0,1, 
            'TranslateX(300px) TranslateY(100px) scale3d(0.2,0.2,0.2)', 'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)',
            1, 0.5,
            JS.easings.Power2InOut,
            0,
                ()=>{

                    JS.form.style.display = 'flex';
                }
            )


        animateFromToCharsTitle(JS.wordsForm,
            0.5,1,
            'TranslateX(500px) TranslateY(100px) scale3d(0.5,0.5,0.5)', 'TranslateX(0) TranslateY(0) scale3d(1,1,1)',
            0.7, 0.5,
            JS.easings.Power2Out,
            0.03,
            null,
            null)
    

        showHideInput(JS.input, 
            0,1, 
            'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)', 'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)',
            1, 1,
            JS.easings.Power2Out,
            0.1,
            
            )




    }



    /**
     * 
     */
    hideDetails(){


        this.updatePositionScene('backward');

        this.toggleAsideVisibility(false);

        this.hideForm();
        this.hideMessage();


    }


    /**
     * 
     */
    hideForm(){

        showHideForm(JS.form, 
            1,0, 
            'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)', 'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)',
            1, 1,
            JS.easings.Power2InOut,
            0,
                ()=>{

                    this.trigger('loaded');
                },
                ()=>{
                    JS.form.style.display = 'none';
                    this.resetForm();
                    this.resetError();
                }
            )


        animateFromToCharsTitle(JS.wordsForm,
            1,0.5,
            'TranslateX(0) TranslateY(0) scale3d(1,1,1)', 'TranslateX(500px) TranslateY(100px)  scale3d(0.5,0.5,0.5)',
            0.7, 0.5,
            JS.easings.Power2InOut,
            0.03,
            null,
            null)
    

        showHideInput(JS.input, 
            1,0, 
            'TranslateX(0%) TranslateY(0%) scale3d(1,1,1)', 'TranslateX(300px) TranslateY(100px) scale3d(0.5,0.5,0.5)',
            1, 0.5,
            JS.easings.Power2InOut,
            0.1,
            
            )





    }


     /**
     *   function to update the scene in front when explore
     * @param {*} movement 
     */

      updatePositionScene(movement){


        switch (movement) {
            case 'forward':

            this.light[1].setIntensity(100);


            updateContainer(this.container.position, {x:'-=0.5', y:'+=0.2', z:'+=1'}, 1.5, 0.2, JS.easings.Power2Out, null) ;
            updateContainer(this.container.rotation, {x:'+=0.1', y:'+=0.2', z:'+=0'}, 1.5, 0.2, JS.easings.Power2Out, 
                    () => {
                            
                        this.inMove = false;

                       
                    
                    }
                    
              ) ;


                break;


            case 'backward':


                this.light[1].setIntensity(200, 2);

                updateContainer(this.container.position, {x:'+=0.5', y:'-=0.2', z:'-=1'}, 2, 1.2, JS.easings.Power2Out, null) ;
                updateContainer(this.container.rotation, {x:'-=0.1', y:'-=0.2', z:'+=0'}, 2, 1.2, JS.easings.Power2Out, 
                        () => {
                            
                            this.inMove = false;
                        
                        }
            
                      
                ) ;

                break;
        
            default:
                break;
        }

      

    }



    /**
     * 
     */
    async sendEmail(){




            this.dataInput = [];

            const dataValue = {};
            let validationForm = true;


            //last name
            const lastName=  document.getElementsByClassName('input lastName')[0];

            this.dataInput.push(lastName);

            if (lastName.value !="" && this.validateString(lastName.value)) {
                
                dataValue["lastName"] = this.replaceToJSON(lastName.value);

                if ( JS.lastNameError.classList.contains('active')) {

                    JS.lastNameError.classList.remove('active');
                }



            }else{

                JS.lastNameError.classList.add('active');
                validationForm = false;


            }

            //first name
            const firstName=  document.getElementsByClassName('input firstName')[0];

            this.dataInput.push(firstName);
            
            if (firstName.value !="" && this.validateString(firstName.value)) {
                
                dataValue["firstName"] = this.replaceToJSON(firstName.value);

                if ( JS.firstNameError.classList.contains('active')) {

                    JS.firstNameError.classList.remove('active');
                }

            }else{

                JS.firstNameError.classList.add('active');
                validationForm = false;
            }

          

            //phone
            const phone=  document.getElementsByClassName('input phone')[0];

         
            this.dataInput.push(phone);
            
            if (phone.value !="" && this.validatePhoneNumber(phone.value)) {
                
                dataValue["phone"] = this.replaceToJSON(phone.value);

                if ( JS.phoneError.classList.contains('active')) {

                    JS.phoneError.classList.remove('active');
                }

            }else{

                JS.phoneError.classList.add('active');
                validationForm = false;
                
            }

            //email
            const email=  document.getElementsByClassName('input email')[0];

                     
            this.dataInput.push(email);

            if (email.value !="" && this.validateEmail(email.value)) {
                
                dataValue["email"] = this.replaceToJSON(email.value);

                if ( JS.emailError.classList.contains('active')) {

                    JS.emailError.classList.remove('active');
                }


            }else{

                JS.emailError.classList.add('active');
                validationForm = false;
            }


            //message
            const message=  document.getElementsByClassName('message')[0];

                                 
            this.dataInput.push(message);

            
            if (message.value !="") {
                
                dataValue["message"] = this.replaceToJSON(message.value);

                if ( JS.messageError.classList.contains('active')) {

                    JS.messageError.classList.remove('active');
                }


            }else{

                JS.messageError.classList.add('active');
                validationForm = false;
            }


            if (validationForm) {
                
                JS.formSubmit.disabled = true;
                JS.loaderContent.classList.add('active');

            // request fetch
            const body =  JSON.stringify(dataValue);

            const fetchPromise = await fetch('http://my-sandbox.fr/index.php',{
              method : 'POST',
              body: body,

            }).then(response =>{ return response.json(); })
              .then (text => {
     
                if(text.status == 'ok'){

                    this.showMessage('ok');
                }

                if (text.status == 'ko' || text.status =='off') {
                    this.showMessage('ko');
                }

            });

            

            }

        

    }


    /**
     * 
     */
    replaceToJSON(input){


        return input.replace('\'', '"');

    }


    /**
     * 
     * @param {*} mail 
     * @returns 
     */
    validateEmail(mail) {


            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            {
                return (true)
            }

                return (false)
    }


    /**
     * 
     * @param {*} input 
     * @returns 
     */
    validateString(input){

        if (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(input))
        {
            return (true)
        }

            return (false)
        

    }


    /**
     * 
     * @returns 
     */
    validatePhoneNumber(phoneNumber){

        if( /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(phoneNumber)){

            return true;

        }

        return false;
    }


    /**
     * 
     */
    showMessage(status){


        switch (status) {
            case 'ok':

                this.hideForm();
                JS.loaderContent.classList.remove('active');
                
                showHideMessage(JS.messageOK, 0,1,1,2,JS.easings.CircEaseIn, 
                    ()=>{
                        JS.messageOK.style.display = 'block';
                    }, ()=>{

                        this.resetForm();
                        JS.formSubmit.disabled = false;
                    })



                break;

            case 'ko':
                
            
                this.hideForm();
                JS.loaderContent.classList.remove('active');
                showHideMessage(JS.messageKO, 0,1,1,2,JS.easings.CircEaseIn, 
                    ()=>{
                        JS.messageKO.style.display = 'block';
                    },
                    ()=>{

                        this.resetForm();
                    })




                break;
        
            default:

                break;
        }




    }


    /**
     * 
     */
    hideMessage(){



              
                showHideMessage(JS.messageOK, 1,0,1,0.5,JS.easings.CircEaseIn, null,
                    ()=>{
                        JS.messageOK.style.display = 'none';
                    })

                showHideMessage(JS.messageKO, 1,0,1,0.5,JS.easings.CircEaseIn, null,
                    ()=>{
                        JS.messageKO.style.display = 'none';
                    })
        

                this.resetForm();
                this.resetError();


    }




    /**
     * 
     */

    resetForm(){

        JS.form.reset();

    }



    /**
     * 
     */
    resetError(){


                JS.lastNameError.classList.remove('active');

                JS.firstNameError.classList.remove('active');
  
                JS.phoneError.classList.remove('active');
 
                JS.emailError.classList.remove('active');

                JS.messageError.classList.remove('active');
   
    }



    
    /**
     * 
     */
     destroy(){


        for (let index = 0; index < this.containerPhysic.children.length; index++) {
           
            removeObject3D(this.containerPhysic.children[index]);
            
        }
        
       removeObject3D(this.containerPhysic);
        
    }



}

