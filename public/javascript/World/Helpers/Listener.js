import * as JS from '../Helpers/JSElement.js';


/*                  1 - LISTENER MOUSE EVENT
/*                  2 - CLICK WORKS EVENT              
/*                  3 - CLICK DETAILS EVENT      
/*                  4 - CLICK CONTACT EVENT   
/*                  5 - CLICK HOME EVENT   
/*                  6 - CLICK SKILLS EVENT   
/*                  7 - CLICK ABOUT EVENT   
/*



/**
 *                  1 - LISTENER MOUSE EVENT         
 */

window.addEventListener('mousemove', ($event)=>{

    JS.movement.x += $event.movementX *0.0004;
    JS.movement.y += $event.movementY * 0.0004;

    JS.event.x = $event.clientX;
    JS.event.y = $event.clientY;



});

window.addEventListener('touchstart', ($event)=>{

    var touch = $event.targetTouches[0] || $event.changedTouches[0];

    JS.event.x = touch.pageX;
    JS.event.y = touch.pageY;



});

window.addEventListener('touchmove', ($event)=>{


    var touch = $event.targetTouches[0] || $event.changedTouches[0];


    JS.event.x = touch.pageX;
    JS.event.y = touch.pageY;



});

window.addEventListener('click', ($event)=>{

    JS.event.x = $event.clientX;
    JS.event.y = $event.clientY;



});

export const mailEnterListener = (callback)=>{JS.navMail.addEventListener('mouseenter', ($event)=>{

    callback();

})
};


export const linkedinEnterListener = (callback)=>{JS.navLinkedin.addEventListener('mouseenter', ($event)=>{

    callback();

})
};
export const githubEnterListener = (callback)=>{JS.navGithub.addEventListener('mouseenter', ($event)=>{

    callback();

})
};
export const githubClickListener = (callback)=>{JS.navGithub.addEventListener('click', ($event)=>{

    callback();

})
};







/**
 *                  2 - CLICK WORKS EVENT         
 */

export const worksClickListener = (callback)=>{JS.worksLink.addEventListener('click', ($event)=>{

                    callback();

    })
};


export const worksEnterListener = (callback)=>{JS.worksLink.addEventListener('mouseenter', ($event)=>{

    callback();

    })
};
export const worksLeaveListener = (callback)=>{JS.worksLink.addEventListener('mouseleave', ($event)=>{

    callback();

    })
};


/**
*                  3 - CLICK DETAILS EVENT         
*/

export const detailClickListener = (callback)=>{JS.details.addEventListener('click', ($event)=>{

        callback();

    })
};



export const backClickListener = (callback)=>{JS.back.addEventListener('click', ($event)=>{

    callback();

    })
};



export const upClickListener = (callback)=>{JS.up.addEventListener('click', ($event)=>{

    callback();

    })
};

export const downClickListener = (callback)=>{JS.down.addEventListener('click', ($event)=>{

    callback();

})
};




/**
*                  4 - CLICK CONTACT EVENT         
*/

export const contactClickListener = (callback)=>{JS.contact.addEventListener('click', ($event)=>{

    callback();

})
};
export const contactEnterListener = (callback)=>{JS.contact.addEventListener('mouseenter', ($event)=>{

    callback();

})
};
export const contactLeaveListener = (callback)=>{JS.contact.addEventListener('mouseleave', ($event)=>{

    callback();

})
};



export const backContactClickListener = (callback)=>{JS.backWordContact.addEventListener('click', ($event)=>{

    callback();

    })
};



export const formClickListener = (callback)=>{JS.formSubmit.addEventListener('click', ($event)=>{

    $event.preventDefault();
    callback();


})
};

export const lastNameFocusListener = (callback)=>{JS.lastName.addEventListener('focusout', ($event)=>{


    callback();


})
};
export const firstNameFocusListener = (callback)=>{JS.firstName.addEventListener('focusout', ($event)=>{

 

    callback();


})
};
export const phoneFocusListener = (callback)=>{JS.phone.addEventListener('focusout', ($event)=>{


    callback();


})
};
export const emailFocusListener = (callback)=>{JS.email.addEventListener('focusout', ($event)=>{


    callback();


})
};
export const messageFocusListener = (callback)=>{JS.message.addEventListener('focusout', ($event)=>{


    callback();


})
};




/**
*                  5 - CLICK HOME EVENT         
*/

export const nameClickListener = (callback)=>{JS.navName.addEventListener('click', ($event)=>{

    callback();

    })
};



/**
*                  6 - CLICK SKILLS EVENT         
*/

export const skillsClickListener = (callback)=>{JS.skills.addEventListener('click', ($event)=>{

    callback();

    })
};


export const skillsEnterListener = (callback)=>{JS.skills.addEventListener('mouseenter', ($event)=>{

    callback();

})
};
export const skillsLeaveListener = (callback)=>{JS.skills.addEventListener('mouseleave', ($event)=>{

    callback();

})
};


/**
*                  7 - CLICK ABOUT EVENT         
*/

export const aboutClickListener = (callback)=>{JS.about.addEventListener('click', ($event)=>{

    callback();

})
};


export const aboutEnterListener = (callback)=>{JS.about.addEventListener('mouseenter', ($event)=>{

    callback();

})
};
export const aboutLeaveListener = (callback)=>{JS.about.addEventListener('mouseleave', ($event)=>{

    callback();

})
};


export const backAboutClickListener = (callback)=>{JS.backWordAbout.addEventListener('click', ($event)=>{

    callback();

    })
};

