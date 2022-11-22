import * as THREE from 'three';


export function removeObject3D(object3D) {
    if (!(object3D instanceof THREE.Object3D)) return false;


    if (object3D.children.length > 0 ) {

        for (let index = 0; index < object3D.children.length; index++) {
     
              removeObject3D(object3D.children[index]);  
        }
        
    }

    // for better memory management and performance
    if (object3D.geometry) object3D.geometry.dispose();

    if (object3D.material) {
        if (object3D.material instanceof Array) {
            // for better memory management and performance
            object3D.material.forEach(material => material.dispose());
        } else {
            // for better memory management and performance
            object3D.material.dispose();
        }
    }

    object3D.removeFromParent();     // the parent might be the scene or another Object3D, but it is sure to be removed this way

    return true;
}



export function getTime(startTime, endTime, message){

    const diffTime = new Date(endTime- startTime);

    diffTime.setHours(diffTime.getHours() -1) ;

    //console.log('time ' + message +' : ' + diffTime.getHours() +' hours - ' + diffTime.getMinutes() +  ' minutes - ' + diffTime.getSeconds() +  ' seconds - ' + diffTime.getMilliseconds() +  ' milliseconds');

}