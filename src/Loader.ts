import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



// Can add on progress and on error here. not using reject 4 now 
export async function LoadModel( uri, loader, scene ) {
  return new Promise( ( resolve, reject ) => {
    loader.load( uri, ( glb ) =>{
      scene.add( glb.scene );  
      resolve( glb.scene ); 
    })
  }); 
}

export function GetPlayerController( scene ) 
{
  let playerFound = false ; 
  let idx = 0; 
  try {
    while ( idx < scene.children.length ) {
      if( scene.children[idx].name === 'Player_Start')
      {
        playerFound = true ; 
        break; 
      }
      idx++
    }
    if (playerFound) {
      return scene.children[idx];  // Returns the player controller 
    }
    throw new Error( ' Could not resolve player controller ') ;
  }catch (e) {
    console.log('Error occured while finding player controller', e) ; 
    return; 
  }
}
