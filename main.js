function printCorrect(inpText){

    var natural = require('natural');
    var soundEx = natural.SoundEx;

    var lineReader = require('readline').createInterface({
        //input: require('fs').createReadStream('/etc/dictionaries-common/words')
    input: require('fs').createReadStream('dictionary.txt')
    });

    var MDistJWD = 0;
    var MDistLeven = 99999999;
    var MDistDamLeven = 99999999;
    var MDistDice = 0;
    var ansJWD = "";
    var ansLeven = "";
    var ansDamLeven = "";
    var ansDice = "";
    var ansArr = ["according to n-gram words can be : "];

    lineReader.on('line', function (line) {
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
        }
    );

    lineReader.on('close', function(){
        console.log("correct words can be : " + ansJWD + " , " + ansLeven + " , " + ansDamLeven + " , " + ansDice );
    });
}

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Enter Query Term: ", function(answer){
	printCorrect(answer);
   rl.close();
});
