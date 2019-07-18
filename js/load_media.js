///////////////////////////////////////////////////////////////////////////////
//  images of digits 0-9 and characters A-Z packed to charArray object
////////////////////////////////////////////////////////////////////////////////
var digitsImgArray = [];
for(b = 0; b < 10; b++){
    digitsImgArray[b] = new Image();
    digitsImgArray[b].src = 'images/' + b + '.gif';
}

var imgA = new Image();
imgA.src = 'images/A.png';
 
var imgB = new Image();
imgB.src = 'images/B.png';
 
var imgC = new Image();
imgC.src = 'images/C.png';
 
var imgD = new Image();
imgD.src = 'images/D.png';
 
var imgE = new Image();
imgE.src = 'images/E.png';
 
var imgF = new Image();
imgF.src = 'images/F.png';
 
var imgG = new Image();
imgG.src = 'images/G.png';
 
var imgH = new Image();
imgH.src = 'images/H.png';
 
var imgI = new Image();
imgI.src = 'images/I.png';
 
var imgJ = new Image();
imgJ.src = 'images/J.png';
 
var imgK = new Image();
imgK.src = 'images/K.png';
 
var imgL = new Image();
imgL.src = 'images/L.png';
 
var imgM = new Image();
imgM.src = 'images/M.png';
 
var imgN = new Image();
imgN.src = 'images/N.png';
 
var imgO = new Image();
imgO.src = 'images/O.png';
 
var imgP = new Image();
imgP.src = 'images/P.png';
 
var imgQ = new Image();
imgQ.src = 'images/Q.png';
 
var imgR = new Image();
imgR.src = 'images/R.png';
 
var imgS = new Image();
imgS.src = 'images/S.png';
 
var imgT = new Image();
imgT.src = 'images/T.png';
 
var imgU = new Image();
imgU.src = 'images/U.png';
 
var imgV = new Image();
imgV.src = 'images/V.png';
 
var imgW = new Image();
imgW.src = 'images/W.png';
 
var imgX = new Image();
imgX.src = 'images/X.png';
 
var imgY = new Image();
imgY.src = 'images/Y.png';
 
var imgZ = new Image();
imgZ.src = 'images/Z.png';

var charArray = {
    A: imgA,
    B: imgB,
    C: imgC,
    D: imgD,
    E: imgE,
    F: imgF,
    G: imgG,
    H: imgH,
    I: imgI,
    J: imgJ,
    K: imgK,
    L: imgL,
    M: imgM,
    N: imgN,
    O: imgO,
    P: imgP,
    Q: imgQ,
    R: imgR,
    S: imgS,
    T: imgT,
    U: imgU,
    V: imgV,
    W: imgW,
    X: imgX,
    Y: imgY,
    Z: imgZ,
    0: digitsImgArray[0],
    1: digitsImgArray[1],
    2: digitsImgArray[2],
    3: digitsImgArray[3],
    4: digitsImgArray[4],
    5: digitsImgArray[5],
    6: digitsImgArray[6],
    7: digitsImgArray[7],
    8: digitsImgArray[8],
    9: digitsImgArray[9]
} ;

///////////////////////////////////////////////////////////////////////////////
//  preloading media
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//  soundtrack
////////////////////////////////////////////////////////////////////////////////
var backgroundMusic = new Audio();
backgroundMusic.src = 'audio/SpiderLandOST.mp3';
var backgroundMusic2 = new Audio();
backgroundMusic2.src = 'audio/SpiderLandOST2.mp3';
var playlist = [backgroundMusic, backgroundMusic2];
////////////////////////////////////////////////////////////////////////////////
//  music toogle button (off)
////////////////////////////////////////////////////////////////////////////////
var speakerImage = new Image ();
speakerImage.src = 'images/speaker.gif';
////////////////////////////////////////////////////////////////////////////////
//  music toggle button (on)
////////////////////////////////////////////////////////////////////////////////
var speakerOnImage = new Image ();
speakerOnImage.src = 'images/speaker_on.gif';
///////////////////////////////////////////////////////////////////////////////
//  how to play button
////////////////////////////////////////////////////////////////////////////////
var helpButtonImage = new Image();
helpButtonImage.src = 'images/how_to_play.gif';
////////////////////////////////////////////////////////////////////////////////
//  game title
////////////////////////////////////////////////////////////////////////////////
var gameNameImage = new Image();
gameNameImage.src = 'images/SPIDER_LAND.gif';
////////////////////////////////////////////////////////////////////////////////
//  new game button
////////////////////////////////////////////////////////////////////////////////
var newGameImage = new Image();
newGameImage.src = 'images/new_game.gif';
///////////////////////////////////////////////////////////////////////////////
//  help window
////////////////////////////////////////////////////////////////////////////////
var helpImage = new Image();
helpImage.src = 'images/help.gif';
////////////////////////////////////////////////////////////////////////////////
//  close help window button
////////////////////////////////////////////////////////////////////////////////
var okImage = new Image();
okImage.src = 'images/ok.gif';
///////////////////////////////////////////////////////////////////////////////
//  8-directions of player movement gifs
////////////////////////////////////////////////////////////////////////////////
var playerSprite = new Image();
playerSprite.src = 'images/playerSprite.png';
////////////////////////////////////////////////////////////////////////////////
//  8-directions of mob movement gifs
////////////////////////////////////////////////////////////////////////////////
var mobSprite = new Image();
mobSprite.src = 'images/spiderSprite.png';
///////////////////////////////////////////////////////////////////////////////
//  dead mob lying in 8 directions images
////////////////////////////////////////////////////////////////////////////////
var deadMobImages =[];
deadMobImages[0] = new Image();
deadMobImages[0].src = 'images/mob_corpse_right.png';
deadMobImages[1] = new Image();
deadMobImages[1].src = 'images/mob_corpse_topright.png';
deadMobImages[2] = new Image();
deadMobImages[2].src = 'images/mob_corpse_top.png';
deadMobImages[3] = new Image();
deadMobImages[3].src = 'images/mob_corpse_topleft.png';
deadMobImages[4] = new Image();
deadMobImages[4].src = 'images/mob_corpse_left.png';
deadMobImages[5] = new Image();
deadMobImages[5].src = 'images/mob_corpse_bottomleft.png';
deadMobImages[6] = new Image();
deadMobImages[6].src = 'images/mob_corpse_bottom.png';
deadMobImages[7] = new Image();
deadMobImages[7].src = 'images/mob_corpse_bottomright.png';
////////////////////////////////////////////////////////////////////////////////
//  dead player lying in 8 directions images
////////////////////////////////////////////////////////////////////////////////
var deadPlayerImages =[];
deadPlayerImages[0] = new Image();
deadPlayerImages[0].src = 'images/player_corpse_right.png';
deadPlayerImages[1] = new Image();
deadPlayerImages[1].src = 'images/player_corpse_topright.png';
deadPlayerImages[2] = new Image();
deadPlayerImages[2].src = 'images/player_corpse_top.png';
deadPlayerImages[3] = new Image();
deadPlayerImages[3].src = 'images/player_corpse_topleft.png';
deadPlayerImages[4] = new Image();
deadPlayerImages[4].src = 'images/player_corpse_left.png';
deadPlayerImages[5] = new Image();
deadPlayerImages[5].src = 'images/player_corpse_bottomleft.png';
deadPlayerImages[6] = new Image();
deadPlayerImages[6].src = 'images/player_corpse_bottom.png';
deadPlayerImages[7] = new Image();
deadPlayerImages[7].src = 'images/player_corpse_bottomright.png';
////////////////////////////////////////////////////////////////////////////////
//  game over sign
////////////////////////////////////////////////////////////////////////////////
var gameOverImage = new Image();
gameOverImage.src = 'images/Game_over.gif';
////////////////////////////////////////////////////////////////////////////////
//  heart for hp bar image
////////////////////////////////////////////////////////////////////////////////
var hpHeartImage = new Image();
hpHeartImage.src = 'images/hp_heart.gif';
/*//////////////////////////////////////////////////////////////////////////////
//  HA-HA-HA image, maybe in next versions then...
////////////////////////////////////////////////////////////////////////////////
var endImage = new Image();
endImage.src = 'images/will_die.gif';
*///////////////////////////////////////////////////////////////////////////////
//  word score: image
////////////////////////////////////////////////////////////////////////////////
var scoreImage = new Image();
scoreImage.src = 'images/score.gif';
////////////////////////////////////////////////////////////////////////////////
//  incorrect input image
////////////////////////////////////////////////////////////////////////////////
var incorrectImg = new Image();
incorrectImg.src = 'images/incorrect.png';
////////////////////////////////////////////////////////////////////////////////
//  top5 button image
////////////////////////////////////////////////////////////////////////////////
var top5Img = new Image();
top5Img.src = 'images/top5.png';
////////////////////////////////////////////////////////////////////////////////
//  all button image
////////////////////////////////////////////////////////////////////////////////
var allImg = new Image();
allImg.src = 'images/show_all.png';
////////////////////////////////////////////////////////////////////////////////
//  click to change name image
////////////////////////////////////////////////////////////////////////////////
var clickToChange = new Image();
clickToChange.src = 'images/click.png';

