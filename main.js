var word = "";
var tpedWord = [];
$("#txtContent").on("keydown", function(e){
    if(e.which >= 65 && e.which <= 90){
        var character = String.fromCharCode(event.keyCode).toLowerCase();
        word += character;
    }
    else if(e.which == 32 && word.length > 0){
        console.log(word);
        tpedWord.push(word);
        word = "";
    }
  });