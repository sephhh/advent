var instructions = document.body.textContent.trim().split('\n');
var bots = [];
var outputs = [];

function Bot(number) {
    bots[number] = bots[number] || this;
}
Bot.prototype.get = function(lowOrHigh){
    this.number1 = this.number1 || this.getNumber1();
    this.number2 = this.number2 || this.getNumber2();
    if (this.number1 > this.number2){
        this.high = this.number1;
        this.low = this.number2;
    }else{
        this.high = this.number2;
        this.low = this.number1;
    }
    return this[lowOrHigh];
};


function addLookupToBot(bot, lookupFunction){
    if (!bot.getNumber1){
        bot.getNumber1 = function(){
            this.number1 = this.number1 || lookupFunction();
            return this.number1;
        };
    }
    else if (!bot.getNumber2){
        bot.getNumber2 = function(){
            this.number2 = this.number2 || lookupFunction();
            return this.number2;
        };
    }
}

function addValueLookupToBot(botNum, value){
    new Bot(botNum);
    addLookupToBot(bots[botNum], function(){
        return value;
    });
}

function addBotLookupToBot(toBotNum, fromBotNum, lowOrHigh){
    new Bot(toBotNum);
    new Bot(fromBotNum);
    addLookupToBot(bots[toBotNum], function(){
        return bots[fromBotNum].get(lowOrHigh);
    });
}

function addOutputLookup (outputNum, botNum, lowOrHigh){
    // new Bot(botNum);
    outputs[outputNum] = function(){
        console.log(botNum, lowOrHigh);
        return bots[botNum].get(lowOrHigh);
    };
}

for (var i = 0; i < instructions.length; i++) {
    var instruction = instructions[i].split(' ');
    if (instruction[0] == 'bot'){
        var bot1Num = parseInt(instruction[1]);
        // console.log(bot1Num);

        var splitPoint = instruction.indexOf('and');
        var part1 = instruction.slice(3, splitPoint);
        var part2 = instruction.slice(splitPoint + 1, instruction.length);
        // console.log(bot1Num, part1, part2);
        lowTargetType = part1[2];
        lowTargetNum = parseInt(part1[3]);
        if (lowTargetType == 'bot'){
            addBotLookupToBot(lowTargetNum, bot1Num, 'low');
        }else{
            addOutputLookup(lowTargetNum, bot1Num, 'low');
        }
        highTargetType = part2[2];
        highTargetNum = parseInt(part2[3]);
        if (highTargetType == 'bot'){
            addBotLookupToBot(highTargetNum, bot1Num, 'high');
        }else{
            addOutputLookup(highTargetNum, bot1Num, 'high');
        }
    }else if (instruction[0] == 'value'){
        botNum = parseInt(instruction[5]);
        var value = parseInt(instruction[1]);
        addValueLookupToBot(botNum, value);
        // addLookupToBot(bots[botNum], function(){return number;});        
        // addLookupToBot(bots[botNum], function(){return bot.getHighNumber()});

    }
}
for (var i = 0; i < bots.length; i++) {
    console.log(i, bots[i].get('high'), bots[i].get('low'));
}
console.log(outputs[0](), outputs[1](), outputs[2]() );
