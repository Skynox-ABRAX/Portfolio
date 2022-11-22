import * as THREE from 'three';

import Loader from './Utils/Loader.js'
import EventEmitter from './Utils/EventEmitter.js'


import { getTime } from './Utils/Helpers.js';
 

export default class Resources extends EventEmitter{

        constructor(_options, origin){

                super();

                this.startTime = new Date;
                // console.log('***************************************')
                // console.log('start load resource  - ' + origin +' : ' + this.startTime)
                // console.log('_options - ' + origin, _options)


                //options
                this.debug = _options.debug;

                //set up
                this.items = {};


                _options.loader.load(_options.resources)
                
                

                _options.loader.on('fileEnd', (_resource, _data) =>
                {

                    this.items[_resource.name] = _data
        
                    // Texture
                    if(_resource.type === 'texture')
                    {
                        const texture = new THREE.Texture(_data)
                        texture.needsUpdate = true
        
                       this.items[`${_resource.name}Texture`] = texture

                    }

                    // Trigger progress
                    if (this.debug) {

                        const assetName = _resource.type === 'texture' ? _resource.name + 'Texture' : _resource.name

                        this.trigger('progress', [ 'asset loaded: ' + assetName, `${_options.loader.loaded} / ${_options.loader.toLoad}` , (_options.loader.loaded / _options.loader.toLoad) *100 + '%']);
                    }else{
                        this.trigger('progress', _options.loader.loaded / _options.loader.toLoad);
                    }
        
    
  
                })
        
                _options.loader.on('end', () =>
                {

                    //this.endTime = new Date();

                    //getTime(this.startTime, this.endTime, 'load resources - ' + origin);
                    

                    switch (origin) {
                        case 'home':
                            this.trigger('readyHome');
                            break;
                        case 'works':
                            this.trigger('readyWorks');
                            break;
                        case 'skills':
                            this.trigger('readySkills');
                            break;
                        case 'about':
                            this.trigger('readyAbout');
                            break;
                        case 'contact':
                            this.trigger('readyContact');
                            break;
                    
                        default:
     
                            break;
                    }


                    _options.loader.callbacks.base.end = null;


                })
                
        }

}