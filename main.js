function check1(inpText,line){
    var lenL = line.length;
    var lenI = inpText.length;
    var rt = false;
    for(let i = 0;i+lenI-1 < lenL;i++){
        //process.stdout.write("hello: ");
        let match = true;
        for(let j = 0;j < lenI;j++){
            if(inpText[j] != line[i+j]){
                match = false;
                break;
            }
        }
        if(match == false)
            continue;
        else{
            rt = true;
            break;
        }
    }
    return rt;
}

function printCorrect(inpText){

    var natural = require('natural');
    var soundEx = natural.SoundEx;

    var lineReader = require('readline').createInterface({
        //input: require('fs').createReadStream('/etc/dictionaries-common/words')
    input: require('fs').createReadStream('dictionary.txt')
    });

    var MDistHamm = 99999999;
    var MDistJWD = 0;
    var MDistLeven = 99999999;
    var MDistDamLeven = 99999999;
    var MDistDice = 0;
    var ansHamm = "";
    var ansJWD = "";
    var ansLeven = "";
    var ansDamLeven = "";
    var ansDice = "";
    var ansArr = ["according to n-gram words can be : "];

    lineReader.on('line', function (line) {
        //if(soundEx.compare(inpText, line)){
            if(check1(inpText,line) == true)
                console.log(line);
            if(natural.HammingDistance(inpText,line) != -1&&natural.HammingDistance(inpText,line) < MDistHamm){
                MDistHamm = natural.HammingDistance(inpText,line);
                ansHamm = line;
            }
            if(natural.JaroWinklerDistance(inpText,line) > MDistJWD){
                MDistJWD = natural.JaroWinklerDistance(inpText,line);
                ansJWD = line;
            }
            if(natural.LevenshteinDistance(inpText,line) != -1&&natural.LevenshteinDistance(inpText,line) < MDistLeven){
                MDistLeven = natural.LevenshteinDistance(inpText,line);
                ansLeven = line;
            }
            if(natural.DamerauLevenshteinDistance(inpText,line) != -1&&natural.DamerauLevenshteinDistance(inpText,line) < MDistDamLeven){
                MDistDamLeven = natural.DamerauLevenshteinDistance(inpText,line);
                ansDamLeven = line;
            }
            if(natural.DiceCoefficient(inpText,line) != -1&&natural.DiceCoefficient(inpText,line) > MDistDice){
                MDistDice = natural.DiceCoefficient(inpText,line);
                ansDice = line;
            }
        //}
        }
    );

    lineReader.on('close', function(){
        console.log("correct words can be : " + ansHamm + " , " + ansJWD + " , " + ansLeven + " , " + ansDamLeven + " , " + ansDice );
    });
}
var SpellChecker = require('./sym.js');

var maxEditDistance = 4;

var corrector = new SpellChecker(maxEditDistance);

corrector.addWords('./dictionary.txt', null);

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Enter Query Term: ", function(answer){
	console.log(corrector.lookup(answer));
   rl.close();
});
