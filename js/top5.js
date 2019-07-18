function showTop5(e){
////////////////////////////////////////////////////////////////////////////////
//  do not propagate the click at how to pplay button to game area
////////////////////////////////////////////////////////////////////////////////
    e.stopPropagation();
////////////////////////////////////////////////////////////////////////////////
//  create, set and animate the top5 window, create button to close the window,
//  set event listener on the button, create canvas to show top5
////////////////////////////////////////////////////////////////////////////////
    if($('#top5Table').length === 0){
        let $gameArea = $('#field');
        let fieldWidth = parseInt($gameArea.css('width'));
        let fieldHeight = parseInt($gameArea.css('height'));
        let topCanvas = $('<canvas></canvas>')[0];
        topCanvas.width = 460;
        topCanvas.height = 240;
        let topCtx = topCanvas.getContext('2d');
////////////////////////////////////////////////////////////////////////////////
//  get sorted data from LS to show
////////////////////////////////////////////////////////////////////////////////
        let top = topSort();
////////////////////////////////////////////////////////////////////////////////
//  i need only top 5
////////////////////////////////////////////////////////////////////////////////        
        let length = 5;
        if(top.length < 5){
            length = top.length;
        }
        for(let i = 0; i < length; i++){
////////////////////////////////////////////////////////////////////////////////
//  draw the name at the beginning of the string and the score at the end
////////////////////////////////////////////////////////////////////////////////
            let drawName = drawWord(top[i][0]);
            let drawScore = drawWord(top[i][1]);
            topCtx.drawImage(drawName[1], 0, i * 50, 40 * drawName[0] / 63, 40);
            topCtx.drawImage(drawScore[1], topCanvas.width - 40 * drawScore[0] / 63, i * 50, 40 * drawScore[0] / 63, 40);
////////////////////////////////////////////////////////////////////////////////
//  divider
////////////////////////////////////////////////////////////////////////////////
            topCtx.fillStyle = 'rgb(255, 255, 255)';
            topCtx.fillRect(0, i * 50 - 8, topCanvas.width, 6);
        }
        $gameArea.append('<div></div>').children().last().attr({
               id: 'top5Table',
            class: 'top'
        }).css({
            left: 0.5 * fieldWidth - 0.5 * parseInt($('#top5Table').css('width')) + 'px',
             top:  $gameArea.css('height')
        }).append(topCanvas).children().last().attr('id', 'top5canvas').css({
             top: '170px',
            left: '20px'
        }).parent().append('<img>').children().last().attr({
             id: 'okButton',
            alt: 'Ok!',
            src: okImage.src
        }).css({
              right: '30px',
            bottom:  '20px'
        }).on('click', hideTop).parent().append('<img>').children().last().attr({
             id: 'showAll',
            alt: 'Ok!',
            src: allImg.src
        }).css({
              left: '30px',
            bottom: '20px'
        }).on('click', showAllTable).parent().animate({
            left: 0.5 * fieldWidth - 0.5 * parseInt($('#top5Table').css('width')) + 'px',
             top: 0.5 * fieldHeight - 0.5 * parseInt($('#top5Table').css('height')) + 'px'
        }, 1000);
    }
}
////////////////////////////////////////////////////////////////////////////////
//  function that shows All scores table to the right from game area
////////////////////////////////////////////////////////////////////////////////
function showAllTable(){
////////////////////////////////////////////////////////////////////////////////
//  if table is not already shown
////////////////////////////////////////////////////////////////////////////////
    if($('#allTableHolder').length == 0){
////////////////////////////////////////////////////////////////////////////////
//  table generator...
////////////////////////////////////////////////////////////////////////////////
        let data = topSort();
        $('body').append('<div></div>').children().last().attr({
            id: 'allTableHolder',
            class: 'top'
        });
        let table = $('<table></table>');
        let tHead = $('<thead><tr><th class ="odd">Player Name</th><th class ="even">Score</th></tr></thead>');
        let tBody = $('<tbody></tbody>');    
        $('#allTableHolder').append(table);
        table.append(tHead);
        table.append(tBody);
        let tr, cell;

        for(let i = 0; i < data.length; i ++){
            tr = $('<tr></tr>');
            for(let j = 0; j < data[i].length; j ++){
                cell = $('<td></td>').append(data[i][j]);
                if(j == 0){
                    cell.attr('class', 'odd');
                }
                else if(j == 1){
                    cell.attr('class', 'even');
                }
                tr.append(cell);
            }
            tBody.append(tr);
        }
    }
}
////////////////////////////////////////////////////////////////////////////////
//  function that hides top5 window and all scores table
////////////////////////////////////////////////////////////////////////////////
function hideTop(e){
////////////////////////////////////////////////////////////////////////////////
//  do not propagate the click on the button to parents
////////////////////////////////////////////////////////////////////////////////
    e.stopPropagation();
////////////////////////////////////////////////////////////////////////////////
//  animate downslide of the window, wait, then remove the window
////////////////////////////////////////////////////////////////////////////////    
    let $gameArea = $('#field');
    let fieldHeight = parseInt($gameArea.css('height'));
    let waitForSlide = 0;
    $('#top5Table').animate({
        top: fieldHeight + 'px'
    }, 1000);
    waitForSlide = setTimeout(removeTop, 1100);
////////////////////////////////////////////////////////////////////////////////
//  help function for waiting animation to end
////////////////////////////////////////////////////////////////////////////////
    function removeTop(){
        $('.top').remove();
        clearTimeout(waitForSlide);
        waitForSlide = 0;
    }
}