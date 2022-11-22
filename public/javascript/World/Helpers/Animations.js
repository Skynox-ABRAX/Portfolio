import * as JS from '../Helpers/JSElement.js';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';


/*          1 - TITLE HERO
/*          2 - HOME NAVBAR and LINKS
/*          3 - FLOOR of HOME SCENE
/*          4 - MESH AND MATERIALS
/*          5 - CAMERA
/*          6 - WORKS
/*          7 - DETAILS
/*          8 - CONTACT
/*          9 - SKILLS
/*          10 - ABOUT
/*          20 - SHADERS
/*          30 - GSAP HELPERS
/*





/**
 *              1 - TITLE HERO
 */

export function hideHeroBanner(){

    stepHideHeroBanner(JS.chars, JS.title,  'circ.easeIn', '5px');
    stepHideHeroBanner(JS.chars2, JS.subTitle,  'circ.easeIn', '2px' );

}


export function showHeroBanner(completeCallback = null){

    stepShowHeroBanner(JS.chars, JS.title, 0.5,  'circ.easeIn', '5px');
    stepShowHeroBanner(JS.chars2, JS.subTitle, 0.8,  'circ.easeIn', '2px', completeCallback);   
  


}



/**
 * 
 * @param {*} target 
 * @param {*} element  element in onStart callback to update
 * @param {*} easing 
 * @param {*} margin 
 */

function stepHideHeroBanner(target, element, easing, margin, completeCallback = null ){


    gsap.fromTo(target, {
        opacity: 1,
        transform: 'translateX(0%) translateY(0%)',
        scale: 1
 
    },{
        stagger: 0.02,
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        transform: 'translateX(200px) translateY(-50%)',
        'margin-left' : margin,
        ease: easing,

        onStart: ()=>{

            element.style.opacity = 1;

        },
        onComplete: completeCallback

    })

}


/**
 * 
 * @param {*} target 
 * @param {*} element 
 * @param {*} delay 
 * @param {*} easing 
 * @param {*} margin 
 */

function stepShowHeroBanner(target, element, delay, easing, margin, completeCallback = null){


    gsap.fromTo(target, {
        opacity: 0,
        transform: 'translateX(-200px) translateY(50%)',
        scale: 0.5
 
    },{
        stagger: 0.02,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        transform: 'translateX(0%) translateY(0%)',
        'margin-left' : margin,
        ease: easing,
        delay: delay,

        onStart: ()=>{

            element.style.opacity = 1;

        },

        onComplete: completeCallback

    })

}




export function getChars(index){


 
    const splitText = new SplitText(index, { type: 'words, chars'});
    const chars = splitText.chars.reverse();


    return chars


}

export function getTitle(index){

    const title = document.querySelector(index);

    return title

}



export function animateFromToChars(target, opacityFrom, opacityTo, transformFrom, transformTo, scaleFrom, scaleTo, duration, delay, easing, stagger, startCallback = null, completeCallback = null){


    gsap.fromTo( target,
                
        {
            opacity: opacityFrom,
            transform: transformFrom,
            scale: scaleFrom

        },
        {
    
        opacity: opacityTo,
        transform: transformTo,
        scale: scaleTo,
        duration: duration,
        ease: easing,
        delay: delay,
        stagger: stagger,
        overwrite: true,
        onStart:  startCallback,      
        onComplete:  completeCallback        

    
    });


}


export function animateHR(transform, duration, delay, easing){


    gsap.to(JS.hr, {
    
        transform: transform,
        duration: duration,
        ease: easing,
        delay: delay,
   
    });




}

export function animateExplores(strokeDashOffset, duration, delay, easing, stagger, direction = 'start', completeCallback = null){


    gsap.to(JS.explores, {

        
        'strokeDashoffset': strokeDashOffset,
        stagger: {
            from: direction,
            each: stagger
        },
        duration: duration,
        ease: easing,
        delay: delay,
        onComplete : completeCallback
   
    });




}






/**
 *                      2 -  HOME NAVBAR and LINKS
 */


export function showNavbarAndLinks(){


            const duration = 0.5;


            // nav bar
            gsap.to(JS.navLinks, {

                transform : 'translateX(0%)',
                duration : duration,
                stagger: 0.2,
                opacity: 1,
                ease: 'circ.out',

            })

            gsap.to(JS.navContainers, {

                transform : 'translateX(15px)',
                duration : duration,
                stagger: 0.2,
                ease: 'circ.out',
            })


            gsap.to(JS.navBottomLinks, {

                transform : 'translateX(0%) translateY(0%)',
                duration : duration,
                stagger: 0.2,
                opacity: 1,
                ease: 'circ.out',
            })

            gsap.to(JS.navBottomContainers, {

                transform : 'translateX(15px)',
                duration : duration,
                stagger: 0.2,
                ease: 'circ.out',

            })

            gsap.to(JS.navName, {

                transform : 'translateX(0%)',
                opacity: 1,
                duration : duration,
                stagger: 0.1,
                ease: 'circ.out',


            })


}

export function animateEnterLink(target){

    gsap.to(target,{
        css:{color : '#ffc633'},
        duration : 0.02,
        overwrite: true,
        stagger: 0.02,
        ease: 'circ.out',
    })

}

export function animateLeaveLink(target){

    gsap.to(target,{
        css:{color : '#ffffff'},
        duration : 0.03,
        stagger: {
            each: 0.03,
            from: 'end'
        },
        ease: 'circ.out',
        delay: 0.2,
    })

}



export function animateEnterBottomLink(target, duration){


        const tl = gsap.timeline();

        tl.to(target, {

            duration: duration /4,
            y: '-50px',
            ease: JS.easings.Power2Out
        })

        
        tl.to(target, {

            duration: duration /2,
            y: '0',
            ease: JS.easings.BounceEaseOut,
            delay: duration /4,
        })

        tl.play();




}





/**
 *              3 - FLOOR of HOME SCENE
 */


export function showHomeFloor(target, initialPosition, finalPosition, callback=null){


    gsap.fromTo(target.position, {

        
        x: initialPosition.x,
        y: initialPosition.y,
        z: initialPosition.z,

        },
        
        {
        
        x: finalPosition.x,
        y: finalPosition.y,
        z: finalPosition.z,
        duration: 1,
        ease: 'circ.out',
        overwrite: true,
        onUpdate: ()=>{
            target.updateMatrixWorld();

        },
        onComplete: callback
    
    });



}


export function hideHomeFloor(target, initialPosition, finalPosition){



  
    gsap.fromTo(target.position,{

            x: initialPosition.x,
            y: initialPosition.y,
            z: initialPosition.z,


        },
     {
        
        x: finalPosition.x,
        y: finalPosition.y,
        z: finalPosition.z,
        overwrite: true,
        duration: 2,
        ease: 'circ.in',
        onUpdate: ()=>{
            target.updateMatrixWorld()
        },
      
    });

    window.setTimeout(()=>{
        target.visible = false;
    }, 3000)




}







/**
 *              4 - MESH and MATERIALS
 */



export function updateOpacityPanel2(target, progress, duration, delay){

    gsap.to(target.uniforms.uOpacity, {
    
        value: progress,
        duration: duration,
        ease: 'circ.in',
        overwrite: true,
        delay: delay,
        onUpdate: () => {

            target.uniformsNeedsUpdate = true;
                
        }
   
    });

}


export function updateOpacityPanel(target, progress){


    gsap.to(target.uniforms.uProgress, {
    
        value: progress,
        duration: 1,
        overwrite: true,
        ease: 'circ.in',
        delay: 0,
        onUpdate: () => {

            target.needsUpdate = true;
                
        }
   
    });

}









export function updateOpacityShaderWithTraverse(target, type, opacity, duration, delay, easing, completeCallback = null){


    if (target instanceof type) {
        gsap.to(target.material, {
    
            opacity: opacity,
            duration: duration,
            ease: easing,
            delay: delay,
            onComplete: completeCallback
         
        });
    }else{

        target.traverse(( obj)=>{
             
            if (obj instanceof type){
    
                gsap.to(obj.material, {
        
                    opacity: opacity,
                    duration: duration,
                    ease: easing,
                    delay: delay,
                    onComplete: completeCallback
                 
                });
    
            }
    
    
           });

    }






}




/**
 *              5 - CAMERA
 */


export function moveEaseCamera(target, position, duration, delay, ease, startCallback = null, updateCallback = null, completeCallback = null){


    gsap.to(target.position, {
           
        x: position.x,
        y: position.y,
        z: position.z,       
        duration: duration,
        ease: ease,
        delay: delay,
        onStart : startCallback,
        onUpdate: updateCallback,
        onComplete : completeCallback

       
       });



}



/**
 *              6 - WORKS
 */


 export function moveEaseScene(target, positionFrom, positionTo, duration, delay, ease, startCallback = null, updateCallback = null, completeCallback = null){


    gsap.fromTo(target.position, 
        
        {
            x: positionFrom.x,
            y: positionFrom.y,
            z: positionFrom.z,   

        },{
           
        x: positionTo.x,
        y: positionTo.y,
        z: positionTo.z,       
        duration: duration,
        ease: ease,
        delay: delay,
        onStart : startCallback,
        onUpdate : ()=>{

            target.updateMatrixWorld();

        },
        onComplete : completeCallback

       
       });



}



export function updateContainer(target, value, duration, delay, ease, completeCallback = null){


    gsap.to(target, {
           
        x: value.x,
        y: value.y,
        z: value.z,       
        duration: duration,
        ease: ease,
        delay: delay,
        overwrite: true,
        onComplete : completeCallback

       
       });



}




/**
 *              7 - DETAILS
 */


export function updateOpacityOnChangeAction(target, opacityFrom, opacityTo,transformFrom, transformTo, duration, delay, easing, startCallback=null, completeCallback=null){

    
    gsap.fromTo(target,{

        opacity : opacityFrom,
        transform : transformFrom
    },
    
    {
            
        opacity : opacityTo,
        transform : transformTo,
        duration: duration,
        ease: easing,
        delay: delay,
        onStart: startCallback,
        onComplete: completeCallback
    
    });



}


export function showHideDetailsParagraph(target, opacityFrom, opacityTo, transformFrom, transformTo, duration, delay, easing, stagger){


        gsap.fromTo(target, {

            opacity : opacityFrom,
            transform : transformFrom
    
        },
        
        {
    
            opacity : opacityTo,
            transform : transformTo,
            duration : duration,
            ease : easing,
            stagger: stagger,
            delay: delay,
    
    
        })
    


}


export function updateOpacityArrows(opacityTo, duration, delay, easing, completeCallback = null, startCallback = null){

    gsap.to(JS.arrows, 
    {
            
        opacity: opacityTo,
        duration: duration,
        delay: delay,
        ease: easing,
        onStart: startCallback,
        onComplete: completeCallback

        })
  

}



/**
 *              8 - CONTACT
 */


export function showHideForm(target, opacityFrom, opacityTo, transformFrom, transformTo,  duration, delay, easing, stagger, startCallback = null, completeCallback = null){

    gsap.fromTo(target, {

        opacity : opacityFrom,
        transform : transformFrom,


    },
    
    {

        opacity : opacityTo,
        transform : transformTo,

        duration : duration,
        ease : easing,
        stagger: stagger,
        delay: delay,
        onStart: startCallback,
        onComplete: completeCallback

    })


}

export function showHideInput(target, opacityFrom, opacityTo, transformFrom, transformTo, duration, delay, easing, stagger){

    gsap.fromTo(target, {

        opacity : opacityFrom,
        transform : transformFrom,


    },
    
    {

        opacity : opacityTo,
        transform : transformTo,

        duration : duration,
        ease : easing,
        stagger: stagger,
        delay: delay,


    })


}


export function animateFromToCharsTitle(target, opacityFrom, opacityTo, transformFrom, transformTo, duration, delay, easing, stagger, startCallback = null, completeCallback = null){


    gsap.fromTo( target,
                
        {
            opacity: opacityFrom,
            transform: transformFrom,
   
        },
        {
    
        opacity: opacityTo,
        transform: transformTo,
        duration: duration,
        ease: easing,
        delay: delay,
        stagger: stagger,
        overwrite: true,
        onStart:  startCallback,      
        onComplete:  completeCallback        

    
    });


}


export function showHideMessage(target, opacityFrom, opacityTo, duration, delay, easing, startCallback = null, completeCallback = null){

    gsap.fromTo( target,
                
        {
            opacity: opacityFrom,
   
        },
        {
    
        opacity: opacityTo,
        duration: duration,
        ease: easing,
        delay: delay,
        onStart:  startCallback,      
        onComplete:  completeCallback        

    
    });


}





/**
 *              9 - SKILLS
 */


 export function showSkills(target, positionFrom, positionTo,  duration, delay, easing, startCallback, completeCallback){

    gsap.fromTo(target.position, {

        x : positionFrom.x,
        y : positionFrom.y,
        z : positionFrom.z,

    },
    
    {

        x : positionTo.x,
        y : positionTo.y,
        z : positionTo.z,
        duration : duration,
        ease : easing,
        delay: delay,
        onStart: startCallback,
        onComplete: completeCallback


    })


}




/**
 *              10 - ABOUT
 */


export function showHideAboutDetailsParagraph(target, opacityFrom, opacityTo, transformFrom, transformTo, duration, delay, easing, stagger, startCallback = null, completeCallback = null){


    gsap.fromTo(target, {

        opacity : opacityFrom,
        transform : transformFrom

    },
    
    {

        opacity : opacityTo,
        transform : transformTo,
        duration : duration,
        ease : easing,
        stagger: stagger,
        delay: delay,
        overwrite: true,
        onStart: startCallback,
        onComplete: completeCallback


    })



}






/**
 *              20 - SHADERS
 */


 export function updateToUniform(target, value, duration, delay, easing, overwrite = true, updateCallback = null){


    gsap.to(target, {
            
        value: value,
        duration: duration,
        ease: easing,
        delay: delay,
        overwrite: overwrite,
        onUpdate: updateCallback
    
    });



}


export function updateFromToUniform(target, valueFrom, valueTo, duration, delay, easing, completeCallback){



    gsap.fromTo( target,
                
        {
            value: valueFrom,
        },
        {
    
        value: valueTo,
        duration: duration,
        ease: easing,
        delay: delay,
        onComplete:  completeCallback       

    
    });





}



/**
 *              GSAP HELPERS
 */


export function addTicker(callback){

        gsap.ticker.add(callback);


}

export function removeTicker(callback){

    gsap.ticker.remove(callback);


}