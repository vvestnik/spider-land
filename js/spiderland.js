$(document).on('dragstart', nope).ready(function(){        
////////////////////////////////////////////////////////////////////////////////
//  field container
////////////////////////////////////////////////////////////////////////////////
    let $gameArea = $('#field');
////////////////////////////////////////////////////////////////////////////////
//  music handling
////////////////////////////////////////////////////////////////////////////////
    let musicIndex = 0;
    $('body').append('<audio></audio>').children().last().append('<source>').children().last().attr({
         src: playlist[musicIndex].src,
        type: 'audio/mpeg'
    });
    $('#field').append('<img>').children().last().attr({
         id: 'speaker',
        alt: 'Music',
        src: speakerImage.src
    }).css({
        left: '10px',
         top: '10px'
    }).on('click', playPauseMusic);
////////////////////////////////////////////////////////////////////////////////
//  set a variable to check if music is played right now
////////////////////////////////////////////////////////////////////////////////
    var playing = false;
////////////////////////////////////////////////////////////////////////////////
//  if first soundtrack has ended, start next
////////////////////////////////////////////////////////////////////////////////
    $('audio').on('ended', function(){
        musicIndex ++;
        if(musicIndex > 1){
            musicIndex -= 2;
        }
        $('source')[0].src = playlist[musicIndex].src;
        $('audio')[0].load();
        playPauseMusic();
    });
    $('audio')[0].onplay = function(){
        playing = true;
    };
    $('audio')[0].onpause = function(){
        playing = false;
    };
////////////////////////////////////////////////////////////////////////////////
//  play/pause function
////////////////////////////////////////////////////////////////////////////////
    function playPauseMusic(){
        if (playing){
            $('audio')[0].pause();
            $('#speaker').attr('src', speakerImage.src);
        }
        else{
            var playPromise = $('audio')[0].play();
////////////////////////////////////////////////////////////////////////////////
//  if play returns no error, change the play/pause icon, else write the error
//  to console, tried with promise, but IE doesn't support it...
////////////////////////////////////////////////////////////////////////////////
            if (playPromise !== undefined) {
                $('#speaker').attr('src', speakerOnImage.src);
            }
            else{
                console.log("wtf, no music! Or you're using Internet Explorer... Really? Then no icon change for you man :-P");

            }
        }
    }   
////////////////////////////////////////////////////////////////////////////////
//  keymap for keypress detection
////////////////////////////////////////////////////////////////////////////////    
    let keyMap = {};
////////////////////////////////////////////////////////////////////////////////
//  player collection and player index are here actually not necessary, but let
//  it be...
////////////////////////////////////////////////////////////////////////////////    
    let playerCollection = {};
    let playerIndex = 0;
////////////////////////////////////////////////////////////////////////////////
//  default player name
////////////////////////////////////////////////////////////////////////////////
    let playerName = 'PLAYER';    
////////////////////////////////////////////////////////////////////////////////
//  mob collection object and index to navigate in the collection
////////////////////////////////////////////////////////////////////////////////    
    let mobCollection = {};
    let mobIndex =0;
////////////////////////////////////////////////////////////////////////////////
//  bullet collection object and index to navigate in the collection
////////////////////////////////////////////////////////////////////////////////    
    let bulletCollection = {};
    let bulletIndex = 0;
////////////////////////////////////////////////////////////////////////////////
//  hp heart collection object and index to navigate in the collection
////////////////////////////////////////////////////////////////////////////////    
    let hpCollection = {};
    let hpIndex = 0;
////////////////////////////////////////////////////////////////////////////////
//  canvas obxect and context. the main canvas, where all action takes place
////////////////////////////////////////////////////////////////////////////////    
    let co = document.getElementById('canvas');
    let ctx = co.getContext('2d');
////////////////////////////////////////////////////////////////////////////////
//  second canvas that shows score counter
////////////////////////////////////////////////////////////////////////////////    
    let scoreBar = document.getElementById('scoreBar');
    let scoreCtx = scoreBar.getContext('2d');    
////////////////////////////////////////////////////////////////////////////////
//  game area dimensions
////////////////////////////////////////////////////////////////////////////////
    let fieldWidth = parseInt($gameArea.css('width'));
    let fieldHeight = parseInt($gameArea.css('height'));
////////////////////////////////////////////////////////////////////////////////
//  score counter object
////////////////////////////////////////////////////////////////////////////////    
    let score = {
        total: 0,           //current player score
        present: false,        
        xPos: {             //x position of hundreds, tens and units in a canvas
            2: 286,
            1: 332,
            0: 378
        },
        oldPos: {           //y position used to animate score change
            2: 0,
            1: 0,
            0: 0
        },
        newPos: {           //y position used to animate score change
            2: - 65,
            1: - 65,
            0: - 65
        },
        reset: function(){  //reset counter to 000
////////////////////////////////////////////////////////////////////////////////
//  if this is first counter's appearance, then just show
////////////////////////////////////////////////////////////////////////////////
            if(!this.present){                
                scoreCtx.drawImage(scoreImage, 0, 0);
                scoreCtx.drawImage(digitsImgArray[0], this.xPos[2], 0);
                scoreCtx.drawImage(digitsImgArray[0], this.xPos[1], 0);
                scoreCtx.drawImage(digitsImgArray[0], this.xPos[0], 0);
                this.present = true;
            }
////////////////////////////////////////////////////////////////////////////////
//  if not, prepare animation change to 000
////////////////////////////////////////////////////////////////////////////////
            else{                
                let oldArray = String(this.total).split('').reverse();
                let newArray = [0, 0, 0];
                if(oldArray.length < newArray.length){
                    let length = oldArray.length;
                    for(let i = 0; i < newArray.length - length; i ++){
                        oldArray.push('0');
                    }
                }
                this.total = 0;
                this.update(oldArray, newArray);
            }
        },
////////////////////////////////////////////////////////////////////////////////
//  add 1 to score
////////////////////////////////////////////////////////////////////////////////
        increment: function(){
////////////////////////////////////////////////////////////////////////////////
//  remember old state
////////////////////////////////////////////////////////////////////////////////
            let oldScore = this.total;
////////////////////////////////////////////////////////////////////////////////
//  split old state to characters
////////////////////////////////////////////////////////////////////////////////
            let oldArray = String(oldScore).split('').reverse();
////////////////////////////////////////////////////////////////////////////////
//  increment
////////////////////////////////////////////////////////////////////////////////
            this.total ++;
////////////////////////////////////////////////////////////////////////////////
//  every 7 killed mobs spawn new mobs
////////////////////////////////////////////////////////////////////////////////
            if(this.total % 7 == 0){
                spawnController();
            }
////////////////////////////////////////////////////////////////////////////////
//  split new state to characters
////////////////////////////////////////////////////////////////////////////////
            let newArray = String(this.total).split('').reverse();
////////////////////////////////////////////////////////////////////////////////
//  equalize the array length
////////////////////////////////////////////////////////////////////////////////
            if(oldArray.length < newArray.length){
                oldArray.push('0');                
            }
            let length = oldArray.length;
            for(let i = 0; i < 3 - length; i ++){
                oldArray.push('0');
                newArray.push('0');
            }
////////////////////////////////////////////////////////////////////////////////
//  if old is 9, then change to 0, not 10
////////////////////////////////////////////////////////////////////////////////
            newArray.forEach(function(v){
                if(v > 9){
                    v -= 10;
                }
            });
////////////////////////////////////////////////////////////////////////////////
//  send preparations to update
////////////////////////////////////////////////////////////////////////////////
            this.update(oldArray, newArray);
        },
////////////////////////////////////////////////////////////////////////////////
//  animation for counter change
////////////////////////////////////////////////////////////////////////////////
        update: function(oldArray, newArray){
////////////////////////////////////////////////////////////////////////////////
//  clear for a new frame
////////////////////////////////////////////////////////////////////////////////
            scoreCtx.clearRect(this.xPos[2], 0, scoreBar.width - this.xPos[2], scoreBar.height);
////////////////////////////////////////////////////////////////////////////////
//  draw hundreds first, then tens, then units
////////////////////////////////////////////////////////////////////////////////
            for (let i = newArray.length - 1; i >= 0; i --){                
                if(newArray[i] !== oldArray[i]){
////////////////////////////////////////////////////////////////////////////////
//  if new digit is not at a desired position
////////////////////////////////////////////////////////////////////////////////
                    if(this.newPos[i] < 0){                        
                        this.oldPos[i] += 10;
                        this.newPos[i] += 10;
                        scoreCtx.drawImage(digitsImgArray[oldArray[i]], this.xPos[i], this.oldPos[i]);
                        scoreCtx.drawImage(digitsImgArray[newArray[i]], this.xPos[i], this.newPos[i]);
                    }
////////////////////////////////////////////////////////////////////////////////
//  if new digit is at a desired position, then draw it every frame there
////////////////////////////////////////////////////////////////////////////////
                    else{                        
                        oldArray[i] = newArray[i];
                        this.oldPos[i] = 0;
                        this.newPos[i] = -65;
                        scoreCtx.drawImage(digitsImgArray[oldArray[i]], this.xPos[i], this.oldPos[i]);
                    }
                }
////////////////////////////////////////////////////////////////////////////////
//  hold the same frame if no changes needed
////////////////////////////////////////////////////////////////////////////////
                else{
                    scoreCtx.drawImage(digitsImgArray[oldArray[i]], this.xPos[i], this.oldPos[i]);
                }
            }
            requestAnimationFrame(function(){
                score.update(oldArray, newArray);
            });
        }
    };
////////////////////////////////////////////////////////////////////////////////
//  eventlistener for player movement
////////////////////////////////////////////////////////////////////////////////
    onkeydown = onkeyup = function(e){
        keyMap[e.key] = e.type == 'keydown';
    };
////////////////////////////////////////////////////////////////////////////////
//  hp bar object
////////////////////////////////////////////////////////////////////////////////
    let protoHp = {
        id: 0,         
        w: 20,
        h: 20,
        x: 5,
        y: 675,
        init: function(){                                
            hpCollection[hpIndex] = this;
            this.id = hpIndex;
////////////////////////////////////////////////////////////////////////////////
//  calculate x position of a heart in the hp bar
////////////////////////////////////////////////////////////////////////////////
            this.x = 20 * this.id + 5;
            hpIndex ++;
        },
        remove: function(){
            delete hpCollection[this.id];
        },
        updateHp: function(){
            ctx.drawImage(hpHeartImage, this.x, this.y);
        }
    };
////////////////////////////////////////////////////////////////////////////////
//  bullet object
////////////////////////////////////////////////////////////////////////////////    
    let protoBullet = {
        id: 0,
        w: 5,          //width
        h: 5,          //height
        x: 0,           //x position
        y: 0,           //y position
        xMid: 0,        //center x position
        yMid: 0,        //center y position
        dmg: 1,         //damage of the bullet
        speed: 10,      //speed of the bullet
        xMov: 0,        //x direction vector
        yMov: 0,        //y direction vector
        xAim: 0,        //x coordinate of the aim
        yAim:0,         //y coordinate of the aim
        active: true,   
        init: function(xAim, yAim, dmg){
            if(!playerCollection[playerIndex].weaponCooldownTimer){
                this.xAim = xAim;
                this.yAim = yAim;
                this.dmg = dmg;
////////////////////////////////////////////////////////////////////////////////
//  spawn center is at players' center
////////////////////////////////////////////////////////////////////////////////
                this.xMid = playerCollection[playerIndex].xMid;
                this.yMid = playerCollection[playerIndex].yMid;
                this.x = this.xMid - 0.5 * this.w;
                this.y = this.yMid - 0.5 * this.h;
////////////////////////////////////////////////////////////////////////////////
//  radiusvector change calculation
////////////////////////////////////////////////////////////////////////////////
                let vectX = this.xAim - this.xMid;
                let vectY = this.yAim - this.yMid;
                let distance = Math.sqrt(Math.pow(vectX, 2) + Math.pow(vectY, 2));
                this.xMov = vectX / distance;
                this.yMov = vectY / distance;
                bulletCollection[bulletIndex] = this;
                this.id = bulletIndex;
                bulletIndex ++;
                playerCollection[playerIndex].weaponCooldownTimer = setTimeout(weaponTimerReset, playerCollection[playerIndex].weaponCooldown);
            }
        },
        remove: function(){
            this.active = false;
            delete bulletCollection[this.id];
        },
        move: function(){
            if(this.active){                
                this.x += this.speed * this.xMov;
                this.y += this.speed * this.yMov;
                this.xMid = this.x + 0.5 * this.w;
                this.yMid = this.y + 0.5 * this.h;
                ctx.fillStyle = 'rgb(128, 128, 128)';
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }            
        }
    };
////////////////////////////////////////////////////////////////////////////////
//  mob object
////////////////////////////////////////////////////////////////////////////////
    let protoMob = {
        id: 0,
        w: 40,                      //width
        h: 40,                      //height
        sw:30,                      //sprite width
        sh:30,                      //sprite height
        animIndex: 0,               //index used to change sprite frame
        frameIndex: 0,              //index used to count frames and change sprite frame not each frame
        x: 0,
        y: 0,
        xMid: 0,                    //x center coordinate
        yMid: 0,                    //y center coordinate
        spawnSide: 0,
        hp: 1,                      //helth points
        dmg: 1,                     //damage
        walkSpeed: 2.5,             //speed of the mob
        xMov: 0,                    //x direction vector
        yMov: 0,                    //y direction vector
        viewDirection: 2,
        biteTimer: 0,               //the bite timer cooldown variable
        alive: true,
        imgPosX: [],                //for sprite animation
        imgPosY: [],                //for sprite animation
        init: function(hp, speed){
            this.walkSpeed = speed;
            this.hp = hp;
            this.xMid = this.x + 0.5 * this.w;
            this.yMid = this.y + 0.5 * this.h;
////////////////////////////////////////////////////////////////////////////////
//  randomize spawn position
////////////////////////////////////////////////////////////////////////////////
            this.spawnSide = Math.round(3 * Math.random());            
            let spawnXCoordinate = Math.round(fieldWidth * Math.random());
            let spawnYCoordinate = Math.round(fieldHeight * Math.random());
            let mobSpawnPos = {
                0: {
                    x: spawnXCoordinate,
                    y: -this.h
                },
                1: {
                    x: co.width,
                    y: spawnYCoordinate
                },
                2: {
                    x: spawnXCoordinate,
                    y: co.height
                },
                3: {
                    x: -this.w,
                    y: spawnYCoordinate
                }            
            };
////////////////////////////////////////////////////////////////////////////////
//  calculate the "in sprite" coordinates of frames
////////////////////////////////////////////////////////////////////////////////
            let imgX = 0;
            let imgY = 0;
            this.x = mobSpawnPos[this.spawnSide].x;
            this.y = mobSpawnPos[this.spawnSide].y;
            this.imgPosX = [];
            this.imgPosY = [];
            for(let i = 1; i <= 6; i ++){
                this.imgPosX.push(imgX);
                imgX += this.sw;                
            }
            for(let i = 1; i <= 8; i ++){
                this.imgPosY.push(imgY);
                imgY += this.sh;                
            } 
            mobCollection[mobIndex] = this;
            this.id = mobIndex;
            mobIndex ++;
        },
        kill: function(){
            this.alive = false;
            score.increment();
        },
        damage: function(dmg){
            damage(this, dmg);
        },
////////////////////////////////////////////////////////////////////////////////
//  move always towards the player
////////////////////////////////////////////////////////////////////////////////
        move: function(){         
////////////////////////////////////////////////////////////////////////////////
//  if the mob is alive - move
////////////////////////////////////////////////////////////////////////////////
            if(this.alive){
                let vectX = playerCollection[playerIndex].xMid - this.xMid;
                let vectY = playerCollection[playerIndex].yMid - this.yMid;
                this.viewDirection = rotate(this, vectX, -vectY);
                let distance = Math.sqrt(Math.pow(vectX, 2) + Math.pow(vectY, 2));

                this.xMov = vectX / distance;
                this.yMov = vectY / distance;

                this.x += this.walkSpeed * this.xMov;
                this.y += this.walkSpeed * this.yMov;
                this.xMid = this.x + 0.5 * this.w;
                this.yMid = this.y + 0.5 * this.h;
                ctx.drawImage(mobSprite, this.imgPosX[this.animIndex], this.imgPosY[this.viewDirection], this.sw, this.sh, this.x, this.y, this.w, this.h);
                this.frameIndex++;
////////////////////////////////////////////////////////////////////////////////
//  every 4 frmaes change sprite frame
////////////////////////////////////////////////////////////////////////////////
                if(this.frameIndex % 4 == 0){
                    this.frameIndex = 0;
                    this.animIndex ++;
                }
////////////////////////////////////////////////////////////////////////////////
//  loop the animation
////////////////////////////////////////////////////////////////////////////////
                if(this.animIndex == this.imgPosX.length){
                    this.animIndex = 0;
                }
            }
////////////////////////////////////////////////////////////////////////////////
//  if the mob is dead - lay a corpse there
////////////////////////////////////////////////////////////////////////////////
            else{
                let x = this.xMid - (45 / 2);
                let y = this.yMid - (45 / 2);
                ctx.drawImage(deadMobImages[this.viewDirection], x, y);
            }
        }
    };
////////////////////////////////////////////////////////////////////////////////
//  player object
////////////////////////////////////////////////////////////////////////////////
    let protoPlayer = {
        id: 0,                      //no need actually...
        w: 50,                      //width
        h: 50,                      //height
        x: 325,                     
        y: 325,
        xMid: 0,                    //x center coordinate
        yMid: 0,                    //y center coordinate
        hp: 30,                     //health points
        diagonalMultiplier: 1,      //speed multiplier for diagonal movement
        walkSpeed: 3,               
        xMov: 0,                    //x direction vector
        yMov: 0,                    //y direction vector
        dmg: 1,                     //damage
        viewDirection: 2,           
        weaponCooldown: 500,        //ms
        weaponCooldownTimer: 0,     //timeout variable
        alive: true,
        animIndex: 0,               //index for change sprite frame
        frameIndex: 0,              //index to count frames and change sprite frame
        needRender:true,
        gameOver: true,
        imgPosX: [],                //for sprite animation
        imgPosY: [],                //for sprite animation
        init: function(){
            let imgX = 0;
            let imgY = 0;
            this.gameOver = false;
            this.needRender = true;
            this.xMid = this.x + 0.5 * this.w;
            this.yMid = this.y + 0.5 * this.h;
            this.imgPosX = [];
            this.imgPosY = [];
            for(let i = 1; i <= 8; i ++){
                this.imgPosX.push(imgX);
                imgX += this.w;                
            }
            for(let i = 1; i <= 8; i ++){
                this.imgPosY.push(imgY);
                imgY += this.h;                
            }            
            playerCollection[playerIndex] = this;
            this.id = playerIndex;
////////////////////////////////////////////////////////////////////////////////
//  eventlistener for player rotation
////////////////////////////////////////////////////////////////////////////////
            $gameArea.mousemove(function(e){
                let aimX = (e.pageX - parseInt($gameArea.css('left'))) - playerCollection[playerIndex].xMid;
                let aimY = (e.pageY - parseInt($gameArea.css('top'))) - playerCollection[playerIndex].yMid;
                playerCollection[playerIndex].viewDirection = rotate(playerCollection[playerIndex], aimX, -aimY);
            });
        },
////////////////////////////////////////////////////////////////////////////////
//  damage player
////////////////////////////////////////////////////////////////////////////////
        damage: function(dmg){
            damage(this, dmg);
            hpCollection = {};
            hpIndex = 0;
            setHp();            
        },
////////////////////////////////////////////////////////////////////////////////
//  kill player
////////////////////////////////////////////////////////////////////////////////
        kill: function(){
            if(!this.gameOver){
                this.gameOver = true;
                $('#field').off('click');
                $gameArea.unbind('mousemove');
                gameOver();   
            }
        },
////////////////////////////////////////////////////////////////////////////////
//  move on WASD
////////////////////////////////////////////////////////////////////////////////
        move: function(){
            if(this.alive){
                this.xMov = 0;
                this.yMov = 0;
////////////////////////////////////////////////////////////////////////////////
//  move inside the field on button press, stay if opposite buttons pressed
////////////////////////////////////////////////////////////////////////////////
                if(this.x > 0){                
                    if(keyMap['a'] || keyMap['A']){
                        if(!(keyMap['d'] || keyMap['D'])){
                            this.xMov = -1;
                        }
                        else{
                            this.xMov = 0;
                        }
                    }                
                }
                if(this.x < co.width - this.w){
                    if(keyMap['d'] || keyMap['D']){
                        if(!(keyMap['a'] || keyMap['A'])){
                            this.xMov = 1;
                        }
                        else{
                            this.xMov = 0;
                        }
                    }
                }            

                if(this.y > 0){
                    if(keyMap['w'] || keyMap['W']){
                        if(!(keyMap['s'] || keyMap['S'])){
                            this.yMov = -1;
                        }
                        else{
                            this.yMov = 0;
                        }
                    }
                }
                if(this.y < co.height - this.h){
                    if(keyMap['s'] || keyMap['S']){
                        if(!(keyMap['w'] || keyMap['W'])){
                            this.yMov = 1;
                        }
                        else{
                            this.yMov = 0;
                        }
                    }
                }
////////////////////////////////////////////////////////////////////////////////
//  if movement is only vertical or horisontal, set diagonal multiplier to 1
////////////////////////////////////////////////////////////////////////////////
                if(this.xMov == 0 || this.yMov == 0){
                    this.diagonalMultiplier = 1;
                }
////////////////////////////////////////////////////////////////////////////////
//  if movement is diagonal, set diagonal multiplier to cos(45deg)
////////////////////////////////////////////////////////////////////////////////
                else{
                    this.diagonalMultiplier = 0.5 * Math.sqrt(2);
                }

                this.x += this.walkSpeed * this.diagonalMultiplier * this.xMov;
                this.y += this.walkSpeed * this.diagonalMultiplier * this.yMov;
                this.xMid = this.x + 0.5 * this.w;
                this.yMid = this.y + 0.5 * this.h;
                if(this.xMov != 0 || this.yMov != 0){
                    ctx.drawImage(playerSprite, this.imgPosX[this.animIndex], this.imgPosY[this.viewDirection], this.w, this.h, this.x, this.y, this.w, this.h);
                }
////////////////////////////////////////////////////////////////////////////////
//  if not moving do not animate
////////////////////////////////////////////////////////////////////////////////
                else{
                    ctx.drawImage(playerSprite, this.imgPosX[0], this.imgPosY[this.viewDirection], this.w, this.h, this.x, this.y, this.w, this.h);
                }
////////////////////////////////////////////////////////////////////////////////
//  change sprite frame every 4th render frame
////////////////////////////////////////////////////////////////////////////////
                this.frameIndex++;
                if(this.frameIndex % 4 == 0){
                    this.frameIndex = 0;
                    this.animIndex ++;
                }
////////////////////////////////////////////////////////////////////////////////
//  loop animation
////////////////////////////////////////////////////////////////////////////////
                if(this.animIndex == this.imgPosX.length){
                    this.animIndex = 0;
                }
            }
////////////////////////////////////////////////////////////////////////////////
//  draw corpse if dead
////////////////////////////////////////////////////////////////////////////////
            else{
                let x = this.xMid - (69 / 2);
                let y = this.yMid - (69 / 2);
                ctx.drawImage(deadPlayerImages[this.viewDirection], x, y);
            }
        }
    };  
////////////////////////////////////////////////////////////////////////////////
//  create and set then animate appearing of game title
////////////////////////////////////////////////////////////////////////////////
    $gameArea.append('<img>').children().last().attr({
        class: 'menu',
           id: 'gameName',
          alt: 'SPIDER LAND',
          src: gameNameImage.src
    }).css({
        left: 0.5 * fieldWidth - 0.5 * parseInt($('#gameName').css('width')) + 'px',
         top:  - parseInt($('#gameName').css('height')) + 'px'
    }).animate({
        left: 0.5 * fieldWidth - 0.5 * parseInt($('#gameName').css('width')) + 'px',
         top: 0.25 * (0.5 * fieldHeight - 0.5 * parseInt($('#gameName').css('height'))) + 'px'
    }, 1000);
    showMenu();
////////////////////////////////////////////////////////////////////////////////
//  starts a new game
////////////////////////////////////////////////////////////////////////////////    
    function newGame(e){
////////////////////////////////////////////////////////////////////////////////
//  remove garbage from the last game and set data for a new
////////////////////////////////////////////////////////////////////////////////        
        mobCollection = {};
        mobIndex = 0;       
        $('.menu').remove();       
        score.reset();
        createPlayer();
        setHp();       
        spawnController();
        $('#field').on('click', shoot);
        render();
////////////////////////////////////////////////////////////////////////////////
//  render function
////////////////////////////////////////////////////////////////////////////////
        function render(){        
////////////////////////////////////////////////////////////////////////////////
//  clear frame
////////////////////////////////////////////////////////////////////////////////
            ctx.clearRect(0, 0, co.width, co.height); 
////////////////////////////////////////////////////////////////////////////////
//  if player is dead draw it first
////////////////////////////////////////////////////////////////////////////////
            if(!playerCollection[playerIndex].alive){                        
                playerCollection[playerIndex].move();
                playerCollection[playerIndex].needRender = false;
            }
////////////////////////////////////////////////////////////////////////////////
//  then draw mobs
////////////////////////////////////////////////////////////////////////////////
            for(let i in mobCollection){
                mobCollection[i].move();
////////////////////////////////////////////////////////////////////////////////
//  check if mob bites the player
////////////////////////////////////////////////////////////////////////////////
                if(hit(playerCollection[playerIndex], mobCollection[i]) && !mobCollection[i].biteTimer && mobCollection[i].alive){
                    playerCollection[playerIndex].damage(mobCollection[i].dmg);
////////////////////////////////////////////////////////////////////////////////
//  if player is dead after the bite
////////////////////////////////////////////////////////////////////////////////
                    if(playerCollection[playerIndex].alive == false){                        
                        playerCollection[playerIndex].kill();
                    }
////////////////////////////////////////////////////////////////////////////////
//  set timeout. only 1 bite per second
////////////////////////////////////////////////////////////////////////////////
                    mobCollection[i].biteTimer = setTimeout(resetBiteTimer, 1000, i);
                }
            }
////////////////////////////////////////////////////////////////////////////////
//  draw a bullet
////////////////////////////////////////////////////////////////////////////////
            bullet_check:
            for(let i in bulletCollection){                
                bulletCollection[i].move();
////////////////////////////////////////////////////////////////////////////////
//  check all bullets to hit any mob
////////////////////////////////////////////////////////////////////////////////
                for(let j in mobCollection){
                    if(hit(bulletCollection[i], mobCollection[j])){
////////////////////////////////////////////////////////////////////////////////
//  check only mobs, who are alive
////////////////////////////////////////////////////////////////////////////////
                        if(!mobCollection[j].alive){
                            continue;
                        }
////////////////////////////////////////////////////////////////////////////////
//  damage met mob
////////////////////////////////////////////////////////////////////////////////
                        mobCollection[j].damage(bulletCollection[i].dmg);
////////////////////////////////////////////////////////////////////////////////
//  if needed - kill
////////////////////////////////////////////////////////////////////////////////
                        if(mobCollection[j].alive == false){
                            mobCollection[j].kill();                            
                        }
////////////////////////////////////////////////////////////////////////////////
//  remove bullet and stop check cycles
////////////////////////////////////////////////////////////////////////////////
                        bulletCollection[i].remove();
                        break bullet_check;
                    }
                }
////////////////////////////////////////////////////////////////////////////////
//  remove bullet if it is offscreen
////////////////////////////////////////////////////////////////////////////////
                if(bulletIsOut(bulletCollection[i], co)){
                    bulletCollection[i].remove();
                    break;
                }
////////////////////////////////////////////////////////////////////////////////
//  draw player if he's alive
////////////////////////////////////////////////////////////////////////////////
            }
            if(playerCollection[playerIndex].alive){                        
                playerCollection[playerIndex].move();
            }
////////////////////////////////////////////////////////////////////////////////
//  draw hp bar
////////////////////////////////////////////////////////////////////////////////
            for(let i in hpCollection){
                hpCollection[i].updateHp();
            }
////////////////////////////////////////////////////////////////////////////////
//  request frame if it is needed
////////////////////////////////////////////////////////////////////////////////
            if(playerCollection[playerIndex].needRender){
                requestAnimationFrame(render);
            }
        }
        e.stopPropagation();
    }
    
    function createPlayer(){
        let clone = Object.create(protoPlayer);
        clone.init();
    }
    
    function setHp(){
        for(let i = 0; i < playerCollection[playerIndex].hp; i ++){
            let clone = Object.create(protoHp);
            clone.init();
        }
    }
    
    function weaponTimerReset(){
        clearTimeout(playerCollection[playerIndex].weaponCooldownTimer);
        playerCollection[playerIndex].weaponCooldownTimer = 0;
    }
    
    function resetBiteTimer(mobId){
        clearTimeout(mobCollection[mobId].biteTimer);
        mobCollection[mobId].biteTimer = 0;
    }
    
    function createMob(hp, speed){
        let clone = Object.create(protoMob);
        clone.init(hp, speed);
    }
    
    function shoot(event){
        let clone = Object.create(protoBullet);
        let xAim = event.pageX - parseInt($gameArea.css('left'));
        let yAim = event.pageY - parseInt($gameArea.css('top'));
        clone.init(xAim, yAim, playerCollection[playerIndex].dmg);        
    }
////////////////////////////////////////////////////////////////////////////////
//  starts game over scenario and saves scores to LS
////////////////////////////////////////////////////////////////////////////////
    function gameOver(){
        $gameArea.append('<img>').children().last().attr({
               id: 'top5',
            class: 'menu',
              alt: 'Top 5 players',
              src: top5Img.src
        }).css({
            left: '30px',
             top: '65px'
        }).on('click', showTop5).parent().append('<img>').children().last().attr({
            class: 'menu',
               id: 'gameOver',
              alt: 'Game Over',
              src: gameOverImage.src
        }).css({
            left: 0.5 * fieldWidth - 0.5 * parseInt($('#gameOver').css('width')) + 'px',
             top: - parseInt($('#gameOver').css('height')) + 'px'
        }).animate({
            left: 0.5 * fieldWidth - 0.5 * parseInt($('#gameOver').css('width')) + 'px',
             top: 0.5 * (0.5 * fieldHeight - 0.5 * parseInt($('#gameOver').css('height'))) + 'px'
        }, 1000);
        showMenu();
        saveLS([playerName, score.total]);
    }
////////////////////////////////////////////////////////////////////////////////
//  shows menu buttons
////////////////////////////////////////////////////////////////////////////////
    function showMenu(){
        let t = setTimeout(function(){
            drawName(playerName);
            clearTimeout(t);
            t = 0;
        }, 200);
        $gameArea.append('<img>').children().last().attr({
            class: 'menu',
               id: 'newGame',
              alt: 'New Game',
              src: newGameImage.src
        }).css({
              left: 0.5 * fieldWidth - 0.5 * parseInt($('#newGame').css('width')) + 'px',
            bottom: - parseInt($('#newGame').css('height')) + 'px'
        }).animate({
            left: 0.5 * fieldWidth - 0.5 * parseInt($('#newGame').css('width')) + 'px',
             top: 1.1 * (0.5 * fieldHeight - 0.5 * parseInt($('#newGame').css('height'))) + 'px'
        }, 1000).on('click', newGame).parent().append('<img>').children().last().attr({
            class: 'menu',
               id: 'clickToChange',
              alt: 'Click to change name',
              src: clickToChange.src
        }).css({
              left: 0.5 * fieldWidth - 0.5 * parseInt($('#clickToChange').css('width')) + 'px',
            bottom: - parseInt($('#clickToChange').css('height')) + 'px'
        }).animate({
            left: 0.5 * fieldWidth - 0.5 * parseInt($('#clickToChange').css('width')) + 'px',
             top: 1.8 * (0.5 * fieldHeight - 0.5 * parseInt($('#newGame').css('height'))) + 'px'
        }, 1000).on('click', function(e){
            changeNameShow(e);
        }).parent().append('<img>').children().last().attr({
            class: 'menu',
               id: 'helpButton',
              alt: 'How to Play',
              src: helpButtonImage.src
        }).css({
              left: 0.5 * fieldWidth - 0.5 * parseInt($('#helpButton').css('width')) + 'px',
            bottom:  - parseInt($('#helpButton').css('height')) + 'px'
        }).animate({
              left: 0.5 * fieldWidth - 0.5 * parseInt($('#helpButton').css('width')) + 'px',
            bottom: '30px'
        }, 1000).on('click', showHelp);
    }
////////////////////////////////////////////////////////////////////////////////
//  shows cnahge your name window
////////////////////////////////////////////////////////////////////////////////
    function changeNameShow(e){
////////////////////////////////////////////////////////////////////////////////
//  do not propagate the click at how to pplay button to game area
////////////////////////////////////////////////////////////////////////////////
        e.stopPropagation();
////////////////////////////////////////////////////////////////////////////////
//  create, set and animate the help window, create button to close the window,
//  set event listener on the button
////////////////////////////////////////////////////////////////////////////////
        if($('#nameWindow').length === 0){
            let $gameArea = $('#field');
            let fieldWidth = parseInt($gameArea.css('width'));
            let fieldHeight = parseInt($gameArea.css('height'));
            $gameArea.append('<div></div>').children().last().attr('id', 'nameWindow').css({
                left: 0.5 * fieldWidth - 0.5 * parseInt($('#nameWindow').css('width')) + 'px',
                 top:  $gameArea.css('height')
            }).append('<input>').children().last().attr({
                id: 'inputName',
                type: 'text',
                size: '25',
                maxlength: '10',
                value: playerName
            }).css({
                top: '300px',
                left: 0.5 * parseInt($('#nameWindow').css('width')) - 0.5 * 293 + 'px'
            }).parent().append('<img>').children().last().attr({
                 id: 'okButton',
                alt: 'Ok!',
                src: okImage.src
            }).css({
                 right: '30px',
                bottom:  '20px'
            }).on('click', function(e){
                let input = $('#inputName')[0].value.toUpperCase();
                let reg=/[a-zA-Z0-9]/;              //regular expression for check for incorrect input
                let charArray = input.split('');
                let valid = true;
                for(let i = 0; i < charArray.length; i ++){
                    if(!reg.test(charArray[i])){
                        valid = false;
                    }
                }
                if(valid){
                    hideName(e);
                    playerName = input;
                    drawName(playerName);
                }
                else{
                    $('#nameWindow').append('<img>').children().last().attr({
                         id: 'incorrect',
                        alt: 'Incorrect input',
                        src: incorrectImg.src
                    }).css({
                        left: 0.5 * parseInt($('#nameWindow').css('width')) - 0.5 * parseInt($('#incorrect').css('width')) + 'px',
                         top: '350px'
                    });
                }
            }).parent().animate({
                left: 0.5 * fieldWidth - 0.5 * parseInt($('#nameWindow').css('width')) + 'px',
                 top: 0.5 * fieldHeight - 0.5 * parseInt($('#nameWindow').css('height')) + 'px'
            }, 1000);
        }
    }
////////////////////////////////////////////////////////////////////////////////
//  rules for mob spawn
////////////////////////////////////////////////////////////////////////////////
    function spawnController(){
        if(score.total < 10){
            for(let i = 0; i < 7; i ++){
                createMob(1, 1);
            }
        }
        else if(score.total < 20){
            for(let i = 0; i < 7; i ++){
                createMob(1, 2);
            }
        }
        else if(score.total < 30){
            for(let i = 0; i < 7; i ++){
                createMob(2, 0.5);
            }
        }
        else if(score.total < 40){
            for(let i = 0; i < 4; i ++){
                createMob(1, 2);
                createMob(2, 0.5);
            }
        }
        else if(score.total < 50){
            for(let i = 0; i < 4; i ++){
                createMob(1, 3);
                createMob(2, 1);
            }
        }
        else if(score.total < 60){
            for(let i = 0; i < 8; i ++){
                createMob(2, 2);
                
            }
        }
        else if(score.total < 70){
            for(let i = 0; i < 3; i ++){
                createMob(1, 3);                
            }
        }
        else if(score.total < 80){
            for(let i = 0; i < 4; i ++){
                createMob(1, 3);
                createMob(3, 0.5);
            }
        }
        else if(score.total < 90){
            for(let i = 0; i < 4; i ++){
                createMob(1, 3);
                createMob(3, 1);
            }
        }
        else if(score.total < 100){
            for(let i = 0; i < 10; i ++){
                createMob(1, 3);                
            }
        }
        else if(score.total < 110){
            createMob(15, 0.5);
            
        }
        else{
            for(let i = 0; i < 10; i ++){
                createMob(15, 0.5);
            }
        }
    }
});
////////////////////////////////////////////////////////////////////////////////
//  just nope
////////////////////////////////////////////////////////////////////////////////
function nope(){
    return false;
}
////////////////////////////////////////////////////////////////////////////////
//  damage an object with this function
////////////////////////////////////////////////////////////////////////////////
function damage(obj, dmg){
    obj.hp = obj.hp - dmg;
    if(obj.hp <= 0){
        obj.alive = false;
    }    
}



