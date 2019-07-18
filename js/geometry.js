////////////////////////////////////////////////////////////////////////////////
//  function calculates what direction object looks at and rotates it, inputs
//  are object to rotate, X and Y distances from object to point of interest
//  and array of images, where indexes are from 0 to 7. 0 is looking right, 1 -
//  top-right, 2 - top and so on. While calculations for the function were made
//  in normal ccordinate system where Y goes from bottom to top, mostly you need
//  to add - before yDir (if you calculate from 'top')
////////////////////////////////////////////////////////////////////////////////
function rotate(obj, xDir, yDir, /*currDir, imgArray*/){
    var directionIndex = 0;
    var tg = yDir / xDir;
////////////////////////////////////////////////////////////////////////////////
//  trigonometric calculations... that works...
////////////////////////////////////////////////////////////////////////////////
    if(tg > 0){
        if(tg < 1){
            if(tg < Math.tan(22.5 * Math.PI / 180)){
                if(xDir > 0){
                    directionIndex = 0;
                }
                else{
                    directionIndex = 4;
                }
            }
            else{
                if(xDir > 0){
                    directionIndex = 1;
                }
                else{
                    directionIndex = 5;
                }
            }
        }
        else{
            if(tg < Math.tan(67.5 * Math.PI / 180)){
                if(xDir > 0){
                    directionIndex = 1;
                }
                else{
                    directionIndex = 5;
                }
            }
            else{
                if(xDir > 0){
                    directionIndex = 2;
                }
                else{
                    directionIndex = 6;
                }
            }
        }
    }
    else{
        if(tg > -1){
            if(tg < Math.tan(157.5 * Math.PI / 180)){
                if(xDir > 0){
                    directionIndex = 7;
                }
                else{
                    directionIndex = 3;
                }
            }
            else{
                if(xDir > 0){
                    directionIndex = 0;
                }
                else{
                    directionIndex = 4;
                }
            }
        }
        else{
            if(tg < Math.tan(112.5 * Math.PI / 180)){
                if(xDir > 0){
                    directionIndex = 6;
                }
                else{
                    directionIndex = 2;
                }
            }
            else{
                if(xDir > 0){
                    directionIndex = 7;
                }
                else{
                    directionIndex = 3;
                }
            }
        }
    }
////////////////////////////////////////////////////////////////////////////////
//  if angle of view is 90 or 270 tg is + or - infinity, so that solves the
//  problem
////////////////////////////////////////////////////////////////////////////////
    if(tg === Infinity || tg === -Infinity){
        if(yDir > 0){
            directionIndex = 2;
        }
        else{
            directionIndex = 6;
        }
    }
////////////////////////////////////////////////////////////////////////////////
//  return new direction to store in a variable, needed for ^^the^^ if statement
////////////////////////////////////////////////////////////////////////////////
    return directionIndex;
}
////////////////////////////////////////////////////////////////////////////////
//  collision detection
////////////////////////////////////////////////////////////////////////////////
function hit(objA, objB){
    return !(objA.x + objA.w < objB.x ||
             objA.x > objB.x + objB.w ||
             objA.y + objA.h < objB.y ||
             objA.y > objB.y + objB.h);
}
////////////////////////////////////////////////////////////////////////////////
//  check if bullet is offscreen 
////////////////////////////////////////////////////////////////////////////////
function bulletIsOut(obj, co){
    if(obj.x > co.width || obj.x < - obj.w || obj.y > co.height || obj.y < - obj.h){
        return true;
    }
    return false;
}