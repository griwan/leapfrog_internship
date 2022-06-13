createBalls(number_balls,viewbox)//create n balls

setInterval(loop,1000/frameRate);//running animation



function createBalls(n,vb){
    
    for(i=0;i<n;i++){
       
        var x_t = Math.floor(Math.random() * (vb.clientWidth - 100));
        var y_t = Math.floor(Math.random() * (vb.clientHeight-100));
        point = new ball(x_t,y_t,Math.random()*max_radius+min_radius,vb);
        point.create();
        point.draw();
        points.push(point)

    }

}

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
                
         
                    
                let squareDistance = (b.x - b_t.x) * (b.x - b_t.x) + (b.y - b_t.y) * (b.y - b_t.y);

   
                if (squareDistance <= ((b.r/2 + b_t.r/2) * (b.r/2 + b_t.r/2))) {
                   

                    // Calculate the velocity of the collision and the final relative velocity and speed between balls.
                    var vCollision = {
                        x: b_t.x - b.x,
                        y: b_t.y - b.y
                    };
                    var distance = Math.sqrt((b_t.x - b.x) * (b_t.x - b.x) + (b_t.y - b.y) * (b_t.y - b.y));
                    var vCollisionNorm = {
                        x: vCollision.x / distance,
                        y: vCollision.y / distance
                    };
                    var vRelativeVelocity = {
                        x: b.xVelocity - b_t.xVelocity,
                        y: b.yVelocity - b_t.yVelocity
                    };
                    var relativeSpeed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
                    
                    if (relativeSpeed > 0) { // Update ball velocity factor after collision
                        console.log(relativeSpeed)
                        b.xVelocity -= (relativeSpeed * vCollisionNorm.x);
                        b.yVelocity-= (relativeSpeed * vCollisionNorm.y);
                        b_t.xVelocity += (relativeSpeed * vCollisionNorm.x);
                        b_t.yVelocity += (relativeSpeed * vCollisionNorm.y);
                        }
                }
               
            }

        })
        b.move();
        
    })
  
}


