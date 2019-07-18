////////////////////////////////////////////////////////////////////////////////
//  function that shows help window
////////////////////////////////////////////////////////////////////////////////
function showHelp(e){
////////////////////////////////////////////////////////////////////////////////
//  do not propagate the click at how to pplay button to game area
////////////////////////////////////////////////////////////////////////////////
    e.stopPropagation();
////////////////////////////////////////////////////////////////////////////////
//  create, set and animate the help window, create button to close the window,
//  set event listener on the button
////////////////////////////////////////////////////////////////////////////////
    if($('#helpWindow').length === 0){
        let $gameArea = $('#field');
        let fieldWidth = parseInt($gameArea.css('width'));
        let fieldHeight = parseInt($gameArea.css('height'));
        $gameArea.append('<div></div>').children().last().attr('id', 'helpWindow').css({
            left: 0.5 * fieldWidth - 0.5 * parseInt($('#helpWindow').css('width')) + 'px',
             top:  $gameArea.css('height')
        }).append('<img>').children().last().attr({
             id: 'okButton',
            alt: 'Ok!',
            src: okImage.src
        }).css({
              right: '30px',
            bottom:  '20px'
        }).on('click', hideHelp).parent().animate({
            left: 0.5 * fieldWidth - 0.5 * parseInt($('#helpWindow').css('width')) + 'px',
             top: 0.5 * fieldHeight - 0.5 * parseInt($('#helpWindow').css('height')) + 'px'
        }, 1000);
    }    
}
////////////////////////////////////////////////////////////////////////////////
//  function that hides the help window
////////////////////////////////////////////////////////////////////////////////
function hideHelp(e){
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
    $('#helpWindow').animate({
        top: fieldHeight + 'px'
    }, 1000);
    waitForSlide = setTimeout(removeHelp, 1100);
////////////////////////////////////////////////////////////////////////////////
//  help function for waiting animation to end
////////////////////////////////////////////////////////////////////////////////
    function removeHelp(){
        $('#helpWindow').remove();
        clearTimeout(waitForSlide);
        waitForSlide = 0;
    }
}
