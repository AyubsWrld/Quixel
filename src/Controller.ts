import * as THREE from 'three';

// Change where this is located later 
const MapArray = [
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
  [ 1, -1, 0, 0, 0, 0, 1, 1, 1, 0, 0 ],
  [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ],
  [ 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
]

const cb = () => {
  console.log('Hello world'); 
}

export class PlayerController {
  constructor(player, interactionController ) {
    this.interactionController = interactionController ; 
    this.playerInitial = [ 3, 8 ] ; 
    this.currentPosition = this.playerInitial; 
    this.player = player;
    this.targetPosition = player.position.clone(); // New: Track target position
    this.smoothingFactor = 0.1; // New: 0.0 -> no movement, 1.0 -> instant movement
    this.MountController();
  }

  // TODO: Understand ts
  
  MountController() {
    this.boundHandleMovement = this.handleMovement.bind(this);
    document.addEventListener('keydown', this.boundHandleMovement);
  }

  DismountController()
  {
    document.removeEventListener( 'keydown', this.boundHandleMovement ) ; 
  }

  handleMovement(event){
      switch (event.code) {
        case "KeyW":
          this.moveUp();
          break;
        case "KeyA":
          this.moveLeft();
          break;
        case "KeyS":
          this.moveDown();
          break;
        case "KeyD":
          this.moveRight();
          break;
        case "KeyF": 
         this.interact(); 
        default:
          break;
      }
  }

  moveUp() {
    if ( 
      MapArray[this.currentPosition[0] - 1][this.currentPosition[1]] == 0 || 
      MapArray[this.currentPosition[0] - 1][this.currentPosition[1]] == -1
    ){
      if(MapArray[this.currentPosition[0] - 1][this.currentPosition[1]] == -1 )
      {
        this.interactionController( prev => ({
          ...prev,
          interactionEnabled: true
        })) ; 
      }else{
        this.interactionController( prev => ({
          ...prev,
          interactionEnabled: false
        })) ; 
      }
      this.currentPosition[0] = this.currentPosition[0] - 1 ; 
      this.targetPosition.z -= 1.215;
    }
    console.log( MapArray[this.currentPosition[0] + 1][this.currentPosition[1]]) ; 
  }

  moveDown() {
    if ( MapArray[this.currentPosition[0] + 1][this.currentPosition[1]] == 0  ||
         MapArray[this.currentPosition[0] + 1][this.currentPosition[1]] == -1
    ){
      if( MapArray[this.currentPosition[0] + 1][this.currentPosition[1]] == -1 )
      {
        this.interactionController( prev => ({
          ...prev,
          interactionEnabled: true
        })) ; 
      }else
      {
        this.interactionController( prev => ({
          ...prev,
          interactionEnabled: false
        })) ; 
      }
      this.currentPosition[0] = this.currentPosition[0] + 1 ; 
      this.targetPosition.z += 1.215;
    }
    console.log( MapArray[this.currentPosition[0]][this.currentPosition[1]]) ; 
  }

  moveLeft() {
    if ( MapArray[this.currentPosition[0]][this.currentPosition[1] - 1 ] == 0 ||
         MapArray[this.currentPosition[0]][this.currentPosition[1] - 1 ] == -1 
    ){
      if(MapArray[this.currentPosition[0]][this.currentPosition[1] - 1 ] == -1)
      {
        this.interactionController( prev => ({
          ...prev,
          interactionEnabled: true
        })) ; 
      }else
      {
        this.interactionController( prev => ({
          ...prev,
        })) ; 
          interactionEnabled: false
      }
      this.currentPosition[1] = this.currentPosition[1] - 1 ; 
      this.targetPosition.x -= 1.215;
    }
  }

  moveRight() {
    if ( MapArray[this.currentPosition[0]][this.currentPosition[1] + 1 ] == 0 ||
         MapArray[this.currentPosition[0]][this.currentPosition[1] + 1 ] == -1
    ){
      if(MapArray[this.currentPosition[0]][this.currentPosition[1] + 1 ] == -1)
      {
        this.interactionController( prev => ({
          ...prev,
          interactionEnabled: true
        })) ; 
      }else
      {
        this.interactionController( prev => ({
          ...prev,
          interactionEnabled: false
        })) ; 
      }
      this.currentPosition[1] = this.currentPosition[1] + 1 ; 
      this.targetPosition.x += 1.215;
    }
  }


  interact()
  {
    this.interactionController( prev => ({
      ...prev,
      toggled: true 
    }));
  }

  update() {
    // Call this every frame in your render loop
    this.player.position.lerp(this.targetPosition, this.smoothingFactor);
  }
}
