var viewbox = document.querySelector('#viewport');
var viewbox2 = document.querySelector('#viewport2');
var frameRate = 30;



const ball = function(x,y,r,vb){
    this.x = x;
    this.y = y;
    this.r = r;
    this.xVelocity = 10;
    this.yVelocity = 10;

    this.create = function(){
        console.log(this)
        this.element = document.createElement('div')
        
        this.element.style.width = `${this.r}`+'px';
        this.element.style.height = `${this.r}`+'px';
        this.element.style.top = `${this.y}`+'px';
        this.element.style.left = `${this.x}`+'px';
        this.element.style.borderRadius = '50%';
        this.element.style.display = 'none';
        this.element.style.position = 'absolute'
        this.element.style.backgroundColor = 'red';
        vb.appendChild(this.element);
        const f = this.hide.bind(this);
        this.element.addEventListener('click',()=>{
            f();
        })
    }
    this.move = function(){
        
        this.y +=this.yVelocity;
        this.x +=this.xVelocity;
        this.element.style.top = `${this.y}`+'px';
        this.element.style.left = `${this.x}`+'px';
        
    }
    this.draw = function(){
        console.log(this)
        this.element.style.display = 'block';

    }
    
    this.hide = function(){
        vb.removeChild(this.element)
    }
}

b = new ball(100,20,60,viewbox);


function createplot(){
    const points = []
    for(i=0;i<20;i++){
        var x_t = Math.floor(Math.random() * (viewbox2.clientWidth-10));
        var y_t = Math.floor(Math.random() * (viewbox2.clientHeight-10));
        points.push({x:x_t,y:y_t});
    }
    points.forEach(e => {
        point = new ball(e.x,e.y,10,viewbox2);
        point.create();
        point.draw();
    
    });
}

function setup(){
    b.create();
    b.draw();
}


function loop(){


    if (b.y >=viewbox.clientHeight - b.r || b.y<=0){
        b.yVelocity =-b.yVelocity;
    }
    if(b.x+b.r>=viewbox.clientWidth || b.x<=0){
        b.xVelocity = -b.xVelocity;
    }
    b.move();

}
setup();


setInterval(loop,1000/30);
