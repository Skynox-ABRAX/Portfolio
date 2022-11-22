import { RGBADepthPacking } from "three";

export function datGUI(){


    const colors = {
        scene: '#000000',
        lights : '#0F3D3E',
        ambientLight: '#293462',
        spotLight: '#293462',
        camera: '#820000',
        orbitControls: '#820000',
        world: "#F77E21"
    }


    const light =  document.querySelectorAll('.dg li.title');


    light.forEach((_title) => {

        _title.style.backgroundColor = colors[_title.innerHTML];


    })










}

