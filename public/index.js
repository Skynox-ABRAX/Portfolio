
import Application from './javascript/Application.js'

if (screen && screen.width >= 992) {
    
    const body = document.querySelector('.js-body');

    body.style.display = 'block'
    window.application = new Application({
        $canvas: document.querySelector('.js-canvas'),
        debug: false

    })

}else{


    const body = document.querySelector('.no-js-body');

    body.style.display = 'flex'




}
