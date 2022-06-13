//ball constructor object
const ball = function(x,y,r,vb){
    this.x = x;
    this.y = y;
    this.r = r;
    this.xVelocity = Math.random()<0.5?1:-1*Math.random()*10;

    this.yVelocity = Math.random()<0.5?1:-1*Math.random()*10;

    

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





