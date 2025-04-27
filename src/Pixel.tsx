import { useState, useEffect, useRef } from "react";
import * as THREE from 'three' ; 
import styles from './Pixel.module.scss' ; 
import GUI from 'lil-gui' ; 


export default function Pixel()
{

  const ContainerRef = useRef( null ) ; 
  const gui = new GUI();
  const folder = gui.addFolder( 'Plane' ) ; 
  


  const camera = {
    pX: -11,
    pY: 7,
    pZ: 10 ,

    rX: -0.45,
    rY: -0.77,
    rZ: -0.328,
  }

  const position = {
    x: 0 , 
    y: 0 , 
    z: 0 , 
  }

  gui.add(camera, 'pX', -100, 100, 1) ; 
  gui.add(camera, 'pY', -100, 100, 1) ; 
  gui.add(camera, 'pZ', -100, 500, 1) ; 
  gui.add(camera, 'rX', -1, 1) ; 
  gui.add(camera, 'rY', -1, 1) ; 
  gui.add(camera, 'rZ', -1, 1) ; 

  folder.add( position, 'x', -1, 1 );
  folder.add( position, 'y', -1, 1 );
  folder.add( position, 'z', -1, 1 );

  useEffect( () => {
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
    const Geometry = new THREE.BoxGeometry() ; 
    const Material = new THREE.MeshPhongMaterial( { color : 0x00ff00 }) ; 
    const Cube = new THREE.Mesh( Geometry, Material ) ; 
    const PlaneGeometry = new THREE.BoxGeometry( 10, 0.1, 10) ; 
    const PlaneMat = new THREE.MeshPhongMaterial( { color: 0xFF0000 }) ; 
    const PlaneMesh = new THREE.Mesh( PlaneGeometry, PlaneMat ) ; 
    const axesHelper = new THREE.AxesHelper(5);
    const Light = new THREE.DirectionalLight( 0xFFFFFF , 3 ); 

    Light.position.set( -1 , 2 , 4 ) ; 


    Renderer.setSize( window.innerWidth, window.innerHeight ) ; 

    Scene.add(axesHelper);
    Scene.add( PlaneMesh ) ; 
    Scene.add( Cube ) ; 
    Scene.add( Light ) ; 

    Cube.position.set(0,0.5,0) ; 



    document.addEventListener('keydown', ( event ) => {
      switch (event.code) {
        case "KeyW":
          THREE.MathUtils.lerp(Cube.position.x, Cube.position.x += 1, Cube.position.x += 0.5 )  ; 
          break;
        case "KeyA":
          THREE.MathUtils.lerp(Cube.position.z, Cube.position.z -= 1, Cube.position.z -= 0.5 )  ; 
          break;
        case "KeyS":
          THREE.MathUtils.lerp(Cube.position.x, Cube.position.x -= 1, Cube.position.x -= 0.5 )  ; 
          break;
        case "KeyD":
          THREE.MathUtils.lerp(Cube.position.z, Cube.position.z += 1, Cube.position.z += 0.5 )  ; 
          break;
      
        default:
          break;
      }
    })



    ContainerRef.current.appendChild( Renderer.domElement ) ; 
    const animation = () => {
      requestAnimationFrame(animation) ; 

      Camera.position.set( camera.pX, camera.pY, camera.pZ ) ; 
      Camera.rotation.set( camera.rX, camera.rY, camera.rZ ) ; 


      PlaneMesh.rotation.set( position.x , position.y, position.z) ; 

      //Cube.position.set( CubePosition.x , CubePosition.y, CubePosition.z) ; 
      Renderer.render( Scene, Camera ) ; 

    }
      animation() ; 
      // return () => {
      //     if (ContainerRef.current && Renderer.domElement) {
      //       ContainerRef.current.removeChild(Renderer.domElement);
      //     }
        //};
  }, [] ) ;

  useEffect( () => {
  }, []);


  return(
    <div ref={ ContainerRef } className={styles.container}/> 
  )
}


