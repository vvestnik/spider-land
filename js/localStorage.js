////////////////////////////////////////////////////////////////////////////////
//  save new data to LS
////////////////////////////////////////////////////////////////////////////////
function saveLS(info){
    let array = [];
////////////////////////////////////////////////////////////////////////////////
//  flag for detection if new info is written
////////////////////////////////////////////////////////////////////////////////
    let written = false;
////////////////////////////////////////////////////////////////////////////////
//  get info from LS
////////////////////////////////////////////////////////////////////////////////
    array = readLS();
////////////////////////////////////////////////////////////////////////////////
//  if player name is already in LS, then check, which try is better, then write
//  the best try
////////////////////////////////////////////////////////////////////////////////
    for(let i = 0; i < array.length; i ++){
        if(array[i][0] == info[0]){
            written = true;
            if(info[1] > array[i][1]){
                array[i][1] = info[1];
            }
        }
    }
////////////////////////////////////////////////////////////////////////////////
//  if no such a player name in LS, the just push info
////////////////////////////////////////////////////////////////////////////////
    if(!written){
        array.push(info);
    }
////////////////////////////////////////////////////////////////////////////////
//  JSON and LS write...
////////////////////////////////////////////////////////////////////////////////
    let JSONdata = JSON.stringify(array);
    localStorage.setItem('hiScore', JSONdata);
}
////////////////////////////////////////////////////////////////////////////////
//  read data from LS, return [] if no data there
////////////////////////////////////////////////////////////////////////////////
function readLS(){
    let content = localStorage.getItem('hiScore');
    if(!content){        
        return [];
    }
    return JSON.parse(content);    
}
////////////////////////////////////////////////////////////////////////////////
//  get data from LS and sort from highest score
////////////////////////////////////////////////////////////////////////////////
function topSort(){
    let array = readLS();
    array.sort(function(a, b){
        return b[1] - a[1];
    });
    return array;
}