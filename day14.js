function Reindeer(km, fly, rest){
    this.km = km;
    this.fly = fly;
    this.rest = rest;
    this.total = this.totalDistance(2503);
}

Reindeer.prototype.totalDistance = function(time) {
    var restPlusFly = this.fly + this.rest;
    var numFullCycles = Math.floor(time/restPlusFly);
    var distancePerCycle = this.fly * this.km;
    var remainder = time % restPlusFly;
    var totalDistance = numFullCycles * distancePerCycle;
    if (remainder > this.fly){
        totalDistance += this.fly * this.km;
    }else{
        totalDistance += remainder * this.km;
    }
    return totalDistance;
};

var reindeers = {};

var lines = document.body.textContent.split('\n');

// var lines = ['Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.','Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.'];

for (var i = 0; i < lines.length; i++) {
    var matches = lines[i].match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
    if (matches){
        console.log(matches[1]);
        reindeers[matches[1]] = new Reindeer(parseInt(matches[2]), parseInt(matches[3]), parseInt(matches[4]));
    }
}


