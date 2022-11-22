import * as THREE from 'three'

import shaderFragment from '../../../shaders/Works/fragment.glsl'
import shaderVertex from '../../../shaders/Works/vertex.glsl'

export default function()
{
    const uniforms = {
        uTime: { value: null },
        uDistortion : {value: 0},
        uBackground : {value: null},
        uBackground2 : {value: null},
        uProgress: { value: 0 },
        uOpacity: { value: 0 },
        uProgress3: { value: 0 },
        uOffsetX: { value: 0.4 },
        uOffsetY: { value: 2 },
        uOffsetZ: { value: 1.2 }

    }

    const material = new THREE.ShaderMaterial({
        wireframe: false,
        transparent: true,
        side: THREE.DoubleSide,
        depthTest: true,
        depthWrite: true,
        uniforms,
        vertexShader: shaderVertex,
        fragmentShader: shaderFragment
    })

    return material
}
