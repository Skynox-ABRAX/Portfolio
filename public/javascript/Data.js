
import basecolor from '../../public/assets/textures/hexagone-min.png';
import flou from '../../public/assets/textures/flou.png';


//
//Textures
//
import bg2048 from '../../public/assets/textures/bg2048.jpg';
import img2048_1 from '../../public/assets/textures/2048_1.png';
import img2048_2 from '../../public/assets/textures/2048_2.png';
import img2048_3 from '../../public/assets/textures/2048_3.png';
import test1 from '../../public/assets/textures/test1.jpg';
import test2 from '../../public/assets/textures/test2.jpg';
import test3 from '../../public/assets/textures/test3.jpg';
import test4 from '../../public/assets/textures/test4.jpg';


import bgBinance from '../../public/assets/textures/bgBinance.png';
import imgBinance_1 from '../../public/assets/textures/Binance_1.png';
import imgBinance_2 from '../../public/assets/textures/Binance_2.png';
import imgBinance_3 from '../../public/assets/textures/Binance_3.png';
import imgBinance_4 from '../../public/assets/textures/Binance_4.png';


import bgTodo from '../../public/assets/textures/bgTodo.png';
import imgTodo_1 from '../../public/assets/textures/todo_1.png';
import imgTodo_2 from '../../public/assets/textures/todo_2.png';
import imgTodo_3 from '../../public/assets/textures/todo_3.png';
import imgTodo_4 from '../../public/assets/textures/todo_4.png';
import imgTodo_5 from '../../public/assets/textures/todo_5.png';

import bgPortfolio from '../../public/assets/textures/bgPortfolio.jpg';
import portfolio_1 from '../../public/assets/textures/portfolio_1.png';
import portfolio_2 from '../../public/assets/textures/portfolio_2.png';
import portfolio_3 from '../../public/assets/textures/portfolio_3.png';
import portfolio_4 from '../../public/assets/textures/portfolio_4.png';
import portfolio_5 from '../../public/assets/textures/portfolio_5.png';

/**
*  models for 2048 
*/
import items2048 from '../../public/models/items2048.glb';


/**
*  models for binance
*/
import itemsBinance from '../../public/models/itemsBinance.glb';


/**
*  models for todo
*/
import itemsTodo from '../../public/models/itemsTodo.glb';


/**
*  models for portfolio
*/

import hexagone  from '../../public/models/hexagone.glb';
import icosphere  from '../../public/models/icosphere.glb';
import torus  from '../../public/models/torus.glb';

/**
*  models for skills
*/
import skills  from '../../public/models/skills.glb';


/**
*  models for about
*/
import about  from '../../public/models/about.glb';


/**
*  models for contact
*/
import dices  from '../../public/models/dices.glb';


export const data = {

    params : {
        x: 1
    },
    panels: ['content_2048', 'content_Binance', 'content_Todo', 'content_Portfolio'],
    status: ['position1', 'position2', 'position3', 'position4'],
    title : ['<p>2048</p>', '<p>Clone Binance</p>', '<p>Todo App</p>', '<p>Portfolio</p>' ],


    technologies: {
        language: ['HTML', 'CSS', 'SASS', 'Javascript', 'Typescript', 'OpenGL','NgRX' ],
        framework: ['Bootstrap', 'Angular', 'Three JS', 'GSAP', 'Webpack'],
        tools: ['Github', 'Node JS', 'VS code'],
        'software design': ['Adobe Illustrator', 'Adobe Subtance designer', 'Blender' ]
    },
    region: {
        home: [
            { name: 'basecolor', source: basecolor, type: 'texture' },
            { name: 'flou', source: flou, type: 'texture' },
        ],
        works: [
            { name: 'bg2048', source: bg2048, type: 'texture' },
            { name: 'img2048_1', source: img2048_1, type: 'texture' },
            { name: 'img2048_2', source: img2048_2, type: 'texture' },
            { name: 'img2048_3', source: img2048_3, type: 'texture' },
            { name: 'test1', source: test1, type: 'texture' },
            { name: 'test2', source: test2, type: 'texture' },
            { name: 'test3', source: test3, type: 'texture' },
            { name: 'test4', source: test4, type: 'texture' },
            

            { name: 'bgBinance', source: bgBinance, type: 'texture' },
            { name: 'imgBinance_1', source: imgBinance_1, type: 'texture' },
            { name: 'imgBinance_2', source: imgBinance_2, type: 'texture' },
            { name: 'imgBinance_3', source: imgBinance_3, type: 'texture' },
            { name: 'imgBinance_4', source: imgBinance_4, type: 'texture' },


            { name: 'bgTodo', source: bgTodo, type: 'texture' },
            { name: 'imgTodo_1', source: imgTodo_1, type: 'texture' },
            { name: 'imgTodo_2', source: imgTodo_2, type: 'texture' },
            { name: 'imgTodo_3', source: imgTodo_3, type: 'texture' },
            { name: 'imgTodo_4', source: imgTodo_4, type: 'texture' },
            { name: 'imgTodo_5', source: imgTodo_5, type: 'texture' },


            { name: 'bgPortfolio', source: bgPortfolio, type: 'texture' },
            { name: 'portfolio_1', source: portfolio_1, type: 'texture' },
            { name: 'portfolio_2', source: portfolio_2, type: 'texture' },
            { name: 'portfolio_3', source: portfolio_3, type: 'texture' },
            { name: 'portfolio_4', source: portfolio_4, type: 'texture' },
            { name: 'portfolio_5', source: portfolio_5, type: 'texture' },


            // *************************  2048 ******************************/

            { name: 'items2048', source: items2048, type:''},

            //*************************  binance ******************************/
            { name: 'itemsBinance', source: itemsBinance, type:''},

            
            //*************************  todo ******************************/
            { name: 'itemsTodo', source: itemsTodo, type:''},


            //*************************  portfolio ******************************/
            { name: 'hexagone', source: hexagone, type:''},
            { name: 'icosphere', source: icosphere, type:''},
            { name: 'torus', source: torus, type:''},



        ],
        skills: [
            { name: 'skills', source: skills, type:''},

        ],
        about: [

            { name: 'about', source: about, type:''},
        ],
        contact: [

                { name: 'dices', source: dices, type:''},

        ]
    },

    explore: {

        content_2048: {
            hero: '2048',
            title: '2048',
            year : 2021,
            description: 'A fully javascript project to clone the famous 2048 game',
            technologies: ['HTML', 'CSS', 'Javascript', 'Bootstrap', 'Webpack', 'NodeJS'],
            link: 'https://github.com/Skynox-ABRAX/2048.git',
            background: '',
            pictures : ['bg2048','img2048_1', 'img2048_2', 'img2048_3'],
            items: [
                    { name: 'item_2', scale: 0.7, type: 'mesh', parent: 'items2048'},
                    { name: 'item_32', scale: 0.4, type: 'mesh', parent: 'items2048'},
                    { name: 'item_64', scale: 0.4, type: 'mesh', parent: 'items2048'},
                    { name: 'item_128', scale: 0.3, type: 'mesh', parent: 'items2048'},
                    { name: 'item_512', scale: 0.3, type: 'mesh', parent: 'items2048'},
                    { name: 'item_2048', scale: 0.2, type: 'mesh', parent: 'items2048'},
            ],
            params: {
                panelPosition: { x: -0.5, y: 1, z: 4.5},
                position: { x: 0.5, y: 1.5, z: 3.5},
                panelRotation : {x: 0, y: Math.PI * 0.5, z: 0},
                rotation: { x: 0, y: Math.PI * 0.5, z: 0},
                area: { 
                    xStart: -1, xEnd :1,
                    yStart: 0.5, yEnd :1.5,
                    zStart: 2, zEnd : 4,
    
                },
                velocityMultiplicator:{
                    x: 2,
                    y: 2,
                    z: 2
                }

            }

            
        },

        content_Binance: {
            hero: 'Clone Binance',
            title: 'Clone Binance',
            year: 2022,
            description: 'A pure HTML / SASS / Angular clone of the worldwild crypto website',
            technologies: ['HTML', 'SASS', 'Bootstrap', 'Angular', 'Typescript', 'NodeJs', 'Webpack'],
            link: 'https://github.com/Skynox-ABRAX/CloneBinance.git',
            background: '',
            pictures : ['bgBinance', 'imgBinance_1', 'imgBinance_2', 'imgBinance_3', 'imgBinance_4'],
            items: [
                    { name: 'bitcoin', scale: 0.2, type: 'mesh', parent: 'itemsBinance'},
                    { name: 'ethereum', scale: 0.1, type: 'mesh', parent: 'itemsBinance'},
                    { name: 'logoBinance', scale: 0.8, type: 'mesh', parent: 'itemsBinance'},
                    { name: 'bitcoin', scale: 0.20, type: 'mesh', parent: 'itemsBinance'},
                    { name: 'ethereum', scale: 0.2, type: 'mesh', parent: 'itemsBinance'},
                    { name: 'logoBinance', scale: 0.6, type: 'mesh', parent: 'itemsBinance'},
            ],
            params: {
                panelPosition: { x: -2.5, y: 1, z: 0},
                position: { x: -1.5, y: 1.5, z: -1},
                panelRotation : {x: 0, y: Math.PI * 0.5, z: 0},
                rotation: { x: 0, y: Math.PI * 0.5, z: 0},
                area: { 
                    xStart: -2.5, xEnd :-0.5,
                    yStart: 0.5, yEnd :1.5,
                    zStart: -3, zEnd :-1,
    
                },
                velocityMultiplicator:{
                    x: 2,
                    y: 2,
                    z: 2
                }


            }
        },
        content_Todo: {
            hero: 'Todo App',
            title: 'Todo App',
            year: 2022,
            description: 'A personal project to manage task and daily work with pomodoro tool build on the angular framework',
            technologies: ['HTML', 'SASS', 'Angular', 'Typescript', 'NodeJS', 'Webpack', 'Gsap' ],
            link: 'https://github.com/Skynox-ABRAX/ToDoApp.git',
            background: '',
            pictures : ['bgTodo', 'imgTodo_1', 'imgTodo_2','imgTodo_3','imgTodo_4', 'imgTodo_5'],
            items: [
                    { name: 'carnet', scale: 0.15, type: 'mesh', parent: 'itemsTodo'},
                    { name: 'clock', scale: 0.10, type: 'mesh', parent: 'itemsTodo'},
                    { name: 'calendar', scale: 0.1, type: 'mesh', parent: 'itemsTodo'},
                    { name: 'carnet', scale: 0.20, type: 'mesh', parent: 'itemsTodo'},
                    { name: 'clock', scale: 0.10, type: 'mesh', parent: 'itemsTodo'},
                    { name: 'calendar', scale: 0.15, type: 'mesh', parent: 'itemsTodo'},
            ],
            params: {
                panelPosition: { x: -4.5, y: 1, z: -4.5},
                position: { x: -3, y: 1.5, z: -6},
                panelRotation : {x: 0, y: Math.PI * 0.5, z: 0},
                rotation: { x: 0, y: Math.PI * 0.5, z: 0},
                area: { 
                    xStart: -4, xEnd :-2,
                    yStart: 0.5, yEnd :1.5,
                    zStart: -7, zEnd :-5,
    
                },
                velocityMultiplicator:{
                    x: 2,
                    y: 2,
                    z: 2
                }


            }

        },
        content_Portfolio: {
            hero: 'Portfolio',
            title: 'Portfolio',
            year: 2022,
            description: 'My personal portfolio build with Three JS framework',
            technologies: ['HTML', 'CSS', 'ThreeJS', 'Gsap', 'Nodejs','webpack', 'Blender', 'Illustrator', 'Substance designer' ],
            link: 'https://github.com/Skynox-ABRAX/Portfolio.git',
            background: '',
            pictures : ['bgPortfolio', 'portfolio_1', 'portfolio_2', 'portfolio_3','portfolio_4', 'portfolio_5'],
            items: [
                { name: 'hexagone', scale: 0.12, type: 'scene', model:'clone'},
                { name: 'icosphere', scale: 0.10, type: 'scene', model:'clone'},
                { name: 'torus', scale: 0.04, type: 'scene', model:'clone'},
                { name: 'hexagone', scale: 0.07, type: 'scene', model:'clone'},
                { name: 'icosphere', scale: 0.18, type: 'scene', model:'clone'},
                { name: 'torus', scale: 0.09, type: 'scene', model:'clone'},
            ],
            params: {
                panelPosition: { x: -6.5, y: 1, z: -9},
                position: { x: -3, y: 1.5, z: -6},
                panelRotation : {x: 0, y: Math.PI * 0.5, z: 0},
                rotation: { x: 0, y: Math.PI * 0.5, z: 0},
                area: { 
                    xStart: -7, xEnd : -5,
                    yStart: 0.5, yEnd :1.5,
                    zStart: -12, zEnd :-10,
    
                },
                velocityMultiplicator:{
                    x: 2,
                    y: 2,
                    z: 2
                }

            }
        },

    },

    training: {

        angular: {
            title: 'Ultimate course by Todd Moto',
            link :''
        },
        API: {
            title: 'API by Mike Codeur',
            link:''
        },
        'Three JS': {
            title: 'THREE JS Journey by Bruno Simon',
            link: ''
        },
        'UI/UX': {
            title: 'UI/UX design course by Gary Simon',
            link: ''
        },

        



    }









}