import SplitText from "gsap/SplitText";



/*                  0 - INTRO
/*                  1 - TITLE and SUBTITLE HERO
/*                  2 - HOME NAVBAR and LINKS
/*                  3 - MOVEMENT MOUSE
/*                  4 - OBJECT WITH EVENT
/*                  5 - DETAILS
/*                  6 - ARROWS
/*                  7 - CONTACT
/*                  8 - SKILLS
/*                  9 - ABOUT
/*                  10 - ENUM GSAP EASE
/*


/**
 *                  0 - INTRO
 */



 export const timer = document.querySelector('.timer');
 export const timerSpan = document.querySelector('.js-timer');
 export const timerContainer = document.querySelector('.js-container-timer');











/**
 *                  1 - TITLE and SUBTITLE HERO
 */


export const title = document.querySelector('.js-title');
export const splitText = new SplitText('.js-title', { type: 'words, chars'});
export const chars = splitText.chars;

export const subTitle = document.querySelector('.js-sub-title');
export const splitText2 = new SplitText('.js-sub-title', { type: 'words, chars'});
export const chars2 = splitText2.chars;

export const hr = document.querySelector('.js-hr');
export const explores = document.querySelectorAll('.path');


/**
 *                  2 - HOME NAVBAR and LINKS
 */


export const navLinks = document.querySelectorAll('.nav-link');
export const navContainers = document.querySelectorAll('.navbar-item');

export const navBottomLinks = document.querySelectorAll('.nav-bottom-link');
export const navBottomContainers = document.querySelectorAll('.nav-bottom-item');

export const navName = document.querySelector('.navbar-name');


export const navMail = document.querySelector('.nav-bottom-mail');
export const navLinkedin = document.querySelector('.nav-bottom-linkedin');
export const navGithub = document.querySelector('.nav-bottom-github');








/**
 *              3 - MOVEMENT MOUSE
 */

export const movement={
    x: 0,
    y: 0
};

export const event={
    x: 0,
    y: 0
};



/**
 *              4 - OBJECT WITH  EVENT
 */

 export const worksLink = document.querySelector('.nav-works');
 export const splitTextWorkLink = new SplitText('.nav-works', { type: 'words, chars'});
 export const charsWorkLink = splitTextWorkLink.chars;


/**
 *              5 - DETAILS
 */


 export const details = document.querySelector('.js-explore');
 export const back = document.querySelector('.back p');
 export const up = document.querySelector('.js-change-up');
 export const down = document.querySelector('.js-change-down');


export const change = document.querySelector('.js-change');


export const aside = document.querySelector('.js-aside-content');
export const backWord = document.querySelector('.back');
export const arrows = document.querySelectorAll('.js-aside-arrow');



export const paragraph = document.querySelectorAll('.js-aside-detail p');
export const technologies = ()=>{ return document.querySelectorAll('.technologies-item')};



export const project = document.querySelector('.project');
export const year = document.querySelector('.year');
export const description = document.querySelector('.project-description');
export const technologiesContent = document.querySelector('.technologies-content');
export const link = document.querySelector('.github-link');



/**
 *              6 - ARROWS
 */

 export const arrowRight = document.querySelector('.js-aside-right');
 export const arrowLeft = document.querySelector('.js-aside-left');


/**
 *              7 -CONTACT
 */


 
export const contact = document.querySelector('.nav-contact');
export const splitTextContactLink = new SplitText('.nav-contact', { type: 'words, chars'});
export const charsContactLink = splitTextContactLink.chars;

export const form = document.querySelector('.form');
export const input = document.querySelectorAll('.form .input, .form .message, .form button');
export const formItemContainer = document.querySelector('.js-form-item-container');
export const formTitle = document.querySelector('.js-form-title');
export const formSubmit = document.querySelector('.js-form-submit');
export const splitText3 = new SplitText('.js-form-title', { type: 'words, chars'});
export const chars3 = splitText3.chars;
export const wordsForm = splitText3.words;


export const asideContact = document.querySelector('.js-aside-contact-content');
export const backWordContact = document.querySelector('.back-contact');


export const messageOK = document.querySelector('.message-ok');
export const messageKO = document.querySelector('.message-ko');


export const lastName = document.querySelector('.input.lastName');
export const firstName = document.querySelector('.input.firstName');
export const phone = document.querySelector('.input.phone');
export const email = document.querySelector('.input.email');
export const message= document.querySelector('.message');


export const lastNameError = document.querySelector('.lastName-error');
export const firstNameError = document.querySelector('.firstName-error');
export const phoneError = document.querySelector('.phone-error');
export const emailError = document.querySelector('.email-error');
export const messageError = document.querySelector('.message-error');

export const loaderContent = document.querySelector('.loader-content');






/**
 *              8 - SKILLS
 */


 
 export const skills = document.querySelector('.nav-skills');
 export const splitTextSkillsLink = new SplitText('.nav-skills', { type: 'words, chars'});
 export const charsSkillsLink = splitTextSkillsLink.chars;
 


 



 /**
 *              9 - ABOUT
 */


 export const about = document.querySelector('.nav-about');
 export const splitTextAboutLink = new SplitText('.nav-about', { type: 'words, chars'});
 export const charsAboutLink = splitTextAboutLink.chars;
 
 export const asideAbout = document.querySelector('.js-aside-about-content');
 export const backWordAbout = document.querySelector('.back-about');
  
 export const asideAboutDetails = document.querySelector('.aside-about-detail');
 export const asideAboutDetailsParagraph = document.querySelectorAll('.aside-about-detail p');

 export const asideAboutCareer= document.querySelector('.aside-career-detail');
 export const asideAboutCareerGroup = document.querySelectorAll('.career-group');
 export const asideAboutCareerGroupContent = document.querySelectorAll('.career-group-content');
 export const asideAboutCareerItem = document.querySelectorAll('.career-item');
 
 export const asideAboutTrainings = document.querySelector('.aside-trainings-detail');
 export const asideAboutTrainingsGroup = document.querySelectorAll('.trainings-group');
 export const asideAboutTrainingsGroupContent = document.querySelectorAll('.trainings-group-content');
 export const asideAboutTrainingsItem = document.querySelectorAll('.trainings-item');





 
/**
 *              10 - ENUM GSAP EASE
 */

export const easings = {
    Power2InOut : 'power2.InOut',
    Power2Out : 'power2.Out',
    Power2In : 'power2.In',
    BounceEaseOut: 'Bounce.easeOut',
    CircOut : 'circ.out',
    CircIn : 'circ.in',
    CircEaseIn: 'circ.easeIn',
    CircEaseOut: 'circ.easeOut',
    None: 'none'
}
