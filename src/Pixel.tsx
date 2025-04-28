import { useState, useEffect, useRef } from "react";
import * as THREE from 'three' ; 
import styles from './Pixel.module.scss' ; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { LoadModel , GetPlayerController } from './Loader.ts'; 
import GUI from 'lil-gui' ; 
import { PlayerController } from "./Controller.ts";


export default function Pixel()
{
  const [ canInteract, setCanInteract ] = useState( { toggled: false, interactionEnabled: false} ) ;  
  const ContainerRef = useRef( null ) ; 
  const camera = {
    pX: -11,
    pY: 7,
    pZ: 10 ,

    rX: -0.45,
    rY: -0.77,
    rZ: -0.328,
  }

  const light = {
    x: 4.2,
    y: 0.1,
    z: 1.6 
  }
  const gui = new GUI() ; 
  gui.add(light, 'x' , -100, 100)
  gui.add(light, 'y' , -100, 100)
  gui.add(light, 'z' , -100, 100)

  useEffect(() => {
    async function loadScene() {
      const Camera = new THREE.OrthographicCamera( 
        -16,
        16,
        9,
        -9,
        0.1,
        10000
      );
  
      const Renderer = new THREE.WebGLRenderer(); 
      const Scene = new THREE.Scene() ; 
      const axesHelper = new THREE.AxesHelper(5);
      const Light = new THREE.DirectionalLight( 0xFFFFFF , 0.05 ); 
      const spotLight = new THREE.SpotLight( 0xFFFFFF ) ; 
      spotLight.shadow.mapSize.width = 640;
      spotLight.shadow.mapSize.height = 640;
      spotLight.shadow.camera.near = 1;
      spotLight.shadow.camera.far = 4000;
      spotLight.shadow.camera.fov = 10;
      Scene.add( spotLight );
      Light.position.set( -3.2, 11.6, 6.6 ) ; 
      Renderer.setSize( window.innerWidth, window.innerHeight ) ; 
      Scene.add(axesHelper);
      Scene.add(Light);
  
      const Loader = new GLTFLoader();
      const model = await LoadModel('../src/assets/3D/Room.glb', Loader, Scene); 
      model.rotation.y = -1.3 ; 
      const player = GetPlayerController( model ) ; 
      const Controller = new PlayerController( player, setCanInteract ) ;  // Pass in interaction controller  

      spotLight.position.set(player.position.x, player.position.y + 2 , player.position.z ) ; 


      ContainerRef.current.appendChild(Renderer.domElement);

      const animation = () => {
        requestAnimationFrame(animation);
        Camera.position.set(camera.pX, camera.pY, camera.pZ);
        Camera.rotation.set(camera.rX, camera.rY, camera.rZ);
        Renderer.render(Scene, Camera);
        spotLight.target = player ; 
        spotLight.power = light.x ;
        Controller.update() ; 
        spotLight.position.set( player.position.x, player.position.y + 2, player.position.z ) ; 
        Light.intensity = light.y ;
      }
      animation();
    }
    loadScene(); // <-- Call the inner async function
  }, []);

  useEffect( () => {
    if ( canInteract.toggled && !canInteract.interactionEnabled ) {
      setCanInteract( { toggled: false, interactionEnabled: false }) ; 
    }else if( canInteract.toggled && canInteract.interactionEnabled )
    {
      console.log('userInteracted') ;
    }
    console.log(canInteract) 
  }, [ canInteract]) ; 

  return(
    <div ref={ ContainerRef } className={styles.container}/> 
  )
}
