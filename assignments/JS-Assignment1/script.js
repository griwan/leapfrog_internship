var viewbox = document.querySelector('#viewport');
var viewbox2 = document.querySelector('#viewport2');
var frameRate = 30;
var points = []


const ball = function(x,y,r,vb){
    this.x = x;
    this.y = y;
    this.r = r;
    this.xVelocity = Math.random()<0.5?10:-10;
    this.yVelocity = Math.random()<0.5?10:-10;
    this.color = "#" + ((1<<24)*Math.random() | 0).toString(16)
    

    this.create = function(){
        // console.log(this)
        this.element = document.createElement('div')
        function r() { return Math.floor(Math.random() * 255) }
        this.element.style.width = `${this.r}`+'px';
        this.element.style.height = `${this.r}`+'px';
        this.element.style.top = `${this.y}`+'px';
        this.element.style.left = `${this.x}`+'px';
        this.element.style.borderRadius = '50%';
        this.element.style.display = 'none';
        this.element.style.position = 'absolute'
        this.element.style.backgroundColor = 'rgb(' + r() + "," + r() + "," + r() + ')';
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
        // console.log(this)
        this.element.style.display = 'block';

    }
    
    this.hide = function(){
        vb.removeChild(this.element)
    }
}

b = new ball(100,20,60,viewbox);

function collision_detect(){
    detect = false
    points.forEach(b=>{
        if (b.y >=viewbox.clientHeight - b.r || b.y<=0){
            detect=true
            b.yVelocity =-b.yVelocity;
        }
        if(b.x+b.r>=viewbox.clientWidth || b.x<=0){
            detect=true
            b.xVelocity = -b.xVelocity;
        }
        points.forEach(b_t=>{
            if(b != b_t){         
                    if((b.x>=b_t.x && b.x<=b_t.x+b_t.r) || (b.x+b.r>=b_t.x && b.x+b.r<=b_t.x+b_t.r)){
                        if((b.y>=b_t.y && b.y<=b_t.y+b_t.r) || (b.y+b.r>=b_t.y && b.y+b.r<=b_t.y+b_t.r)){
                            detect =true
                            b.xVelocity=-b.xVelocity
                            b.yVelocity=-b.yVelocity
                        }
                }              
            }
        })
    })
    return detect
}
function createplot(n,vb){
    
    for(i=0;i<n;i++){
       
        var x_t = Math.floor(Math.random() * (vb.clientWidth/2));
        var y_t = Math.floor(Math.random() * (vb.clientHeight/2));
        point = new ball(x_t,y_t,60,vb);
        point.create();
        point.draw();
        points.push(point)

    }

}

createplot(10,viewbox)


function loop(){

    points.forEach(b=>{
        if (b.y >=viewbox.clientHeight - b.r || b.y<=0){
            b.yVelocity =-b.yVelocity;
        }
        if(b.x+b.r>=viewbox.clientWidth || b.x<=0){
            b.xVelocity = -b.xVelocity;
        }
        points.forEach(b_t=>{
            if(b != b_t){
                
               
                    
                    if((b.x>=b_t.x && b.x<=b_t.x+b_t.r) || (b.x+b.r>=b_t.x && b.x+b.r<=b_t.x+b_t.r)){
                        if((b.y>=b_t.y && b.y<=b_t.y+b_t.r) || (b.y+b.r>=b_t.y && b.y+b.r<=b_t.y+b_t.r)){
                            b.xVelocity=-b.xVelocity
                            b.yVelocity=-b.yVelocity
                        }
                }
               
            }

        })
        b.move();
        
    })
  
}



setInterval(loop,1000/30);
