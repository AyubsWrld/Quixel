import { useState, useEffect, useRef } from "react";
import * as THREE from 'three' ; 
import styles from './Pixel.module.scss' ; 
import GUI from 'lil-gui' ; 


export default function Pixel()
{
  const ContainerRef = useRef( null ) ; 

  const gui = new GUI();
  


  const camera ={

    pX: -4,
    pY: 2,
    pZ: 6,

    rX: 0,
    rY: -0.548,
    rZ: 0,


  }

  gui.add(camera, 'pX', -100, 100, 1) ; 
  gui.add(camera, 'pY', -100, 100, 1) ; 
  gui.add(camera, 'pZ', -100, 100, 1) ; 
  gui.add(camera, 'rX', -1, 1) ; 
  gui.add(camera, 'rY', -1, 1) ; 
  gui.add(camera, 'rZ', -1, 1) ; 

  const folder = gui.addFolder( 'Plane' ) ; 


  const position ={
    x: 0 , 
    y: 0 , 
    z: 0 , 
  }

  const CubePosition ={
    x: 0 , 
    y: 0.55 , 
    z: 0 , 
  }

  folder.add( position, 'x', -1, 1 );
  folder.add( position, 'y', -1, 1 );
  folder.add( position, 'z', -1, 1 );

  folder.add( CubePosition, 'x', -1, 1 );
  folder.add( CubePosition, 'y', -1, 1 );
  folder.add( CubePosition, 'z', -1, 1 );




  useEffect( () => {

    const Camera  = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 ) ; 
    const Renderer = new THREE.WebGLRenderer(); 
    const Scene = new THREE.Scene() ; 
    Renderer.setSize( window.innerWidth, window.innerHeight ) ; 

    const Geometry = new THREE.BoxGeometry() ; 
    const Material = new THREE.MeshPhongMaterial( { color : 0x00ff00 }) ; 
    const Cube = new THREE.Mesh( Geometry, Material ) ; 
    const PlaneGeometry = new THREE.BoxGeometry( 10, 0.1, 10) ; 
    const PlaneMat = new THREE.MeshPhongMaterial( { color: 0xFF0000 }) ; 

    const PlaneMesh = new THREE.Mesh( PlaneGeometry, PlaneMat ) ; 

    const axesHelper = new THREE.AxesHelper(5);
    Scene.add(axesHelper);

    Scene.add( PlaneMesh ) ; 
    Camera.position.set(-2, 2, 5) ; 
    Scene.add( Cube ) ; 

    Cube.position.set(0,0.5,0) ; 

    console.log(Camera) ; 
    const Light = new THREE.DirectionalLight( 0xFFFFFF , 3 ); 
    Light.position.set( -1 , 2 , 4 ) ; 
    Scene.add( Light ) ; 



    ContainerRef.current.appendChild( Renderer.domElement ) ; 
    const animation = () => {
      requestAnimationFrame(animation) ; 

      Camera.position.set( camera.pX, camera.pY, camera.pZ ) ; 
      Camera.rotation.set( camera.rX, camera.rY, camera.rZ ) ; 


      PlaneMesh.rotation.set( position.x , position.y, position.z) ; 

      Cube.position.set( CubePosition.x , CubePosition.y, CubePosition.z) ; 
      Renderer.render( Scene, Camera ) ; 
    }
      animation() ; 
      return () => {
          if (ContainerRef.current && Renderer.domElement) {
            ContainerRef.current.removeChild(Renderer.domElement);
          }
        };
  }, [] ) ; 
  return(
    <div ref={ ContainerRef } className={styles.container}/> 
  )
}

