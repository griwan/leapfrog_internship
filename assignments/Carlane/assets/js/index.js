


//initialize welcome screen
Score_Div.innerHTML = 'Welcome';
Menu_Button.innerHTML = 'Start'


let pauseToggle = false;
let gameObjects = []//all 2d objects of the game
let score = 0;//tracks score


//creates three lanes for the street
function createLanes(){
	for(i=0;i<Number_Lanes;i++){
		let lane = document.createElement('div');
		lane.classList.add('lane');
		lane.style.width = `${screen.clientWidth/3}px`;
		lane.style.height = `${screen.clientHeight}px`;
		screen.appendChild(lane);
	}
}


//player object with event listener
class Player{
	constructor(){
		this.sprite = new gameSprite(640,Lane_Width/3,'assets/img/Audi.png',screen);
		this.controller = document.createElement('div');
		document.addEventListener('keydown',(e)=>{
			this.inputHandler(e);
			
			})
		}
		draw(){
			this.sprite.draw();
		}
		inputHandler(key){
			switch(key.code){
				case 'ArrowLeft':{
			
					this.sprite.x -= 40;
			
				}
				case 'ArrowRight':{
					this.sprite.x +=20;
				}
			}
			if(this.sprite.x<=0){this.sprite.x = 10}
			if(this.sprite.x+this.sprite.img.width >screen.clientWidth){this.sprite.x = screen.clientWidth - this.sprite.img.width}
		}
	}
	
	

//spritle loading class for images
class gameSprite{
  constructor(y,x,img_src,lane){
    this.y = y;
    this.x= x;
		this.lane = lane;
		this.img = document.createElement('img')
		this.img.style.top = `${this.y}px`;
		this.img.style.left = `${this.x}px`;
		this.img.src = img_src
		// this.img.style.border = '1px solid green';
		this.w = this.img.width;
		this.h =this.img.height;
		this.lane.appendChild(this.img);
		gameObjects.push(this)

	}
	move(){
		this.update(this.x,this.y+5);
		this.draw();
	}
	reDraw(){
		score +=1;
		for(i=0;i<3;i++){
			if(Math.random()<0.5){
				this.update(this.x,-900+pos[i],lanes[i]);

				
			}
		}
		this.draw();
	}
	update(x=this.x,y=this.y,lane,img_src=this.img.src){
			this.x = x;
			this.y = y;
			if(this.y>screen.clientHeight){
				this.reDraw();
			}
			this.img_src =img_src;
			if(lane){
			
				this.lane.removeChild(this.img);
				this.lane = lane;
	
			}
			this.lane.appendChild(this.img);
	}
	draw(){
		this.img.style.top = `${this.y}px`;
		this.img.style.left = `${this.x}px`;

	}
	
	
}


createLanes();

lanes = document.querySelectorAll('.lane')
let p1 = new Player();


let pos=[0,400,800];
function createBufferScreen(){
	for(j=0;j<=2;j++){
		for(i =0;i<=2;i++){
			if(Math.random()<0.5){
				b = new gameSprite(-900+pos[j],Lane_Width/3,'assets/img/Ambulance.png',lanes[i])
				break
			}
			
		}
	}
	
}

function detectCollision(a,b){
	let i= Array.prototype.indexOf.call(lanes, a.lane);
	let ax = a.x+i*250;



		if (ax < b.x + b.w &&
			ax + a.w > b.x &&
			a.y < b.y + b.h &&
			a.h + a.y > b.y) {
					return true;
		}

		return false;


}


//main game loop 
function gameLoop(){
	screen.style.animation = !pauseToggle?'color 1s infinite linear':'';
	if(!pauseToggle)
		p1.draw();
	Score_Div[1].innerHTML = `Score:${score}`;
	gameObjects.forEach(o=>{
		if(p1.sprite!=o){
			if(!pauseToggle)
				o.move()
	
			if(detectCollision(o,p1.sprite))
			{clearInterval(game);
				gameObjects.forEach(element => {
				
						element.img.style.display = 'none';
				});
				gameObjects = [];
				createBufferScreen();
				Score_Div[0].innerHTML = `Score:${score}`;
				screen.style.animation = ''
				Menu_Button.innerHTML = 'Restart?'
				Overlay_Game.style.display = 'none';
				Overlay.style.display ='flex';
		
				p1 = new Player();
			}
		}
		
			})
}

//initialize position of cars

createBufferScreen()




Pause_Btn.addEventListener('click',()=>{
	if(pauseToggle==false){
		pauseToggle = true;
	}
	else{
		pauseToggle = false
	}
})

Menu_Button.addEventListener('click',()=>{
	score = 0;
	screen.style.animation = 'color 1s infinite linear'
	Overlay_Game.style.display = 'block';
	Overlay.style.display ='none';
	
game = setInterval(gameLoop,1000/60)
})