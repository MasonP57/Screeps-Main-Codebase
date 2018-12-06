var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var numharvester = 5;
var numupgrader = 4;
var numbuilder = 4;

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + upgrader.length);
    if(upgrader.length < numupgrader){
        var newName = 'Upgrader' + Game.time;
        //console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Origin'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
    }
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builder.length);
    if(builder.length < numbuilder){
        var newName = 'Builder' + Game.time;
        //console.log('Spawning new builder: ' + newName);
        Game.spawns['Origin'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'builder'}});
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);
    if(harvesters.length < numharvester) {
        var newName = 'Harvester' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        Game.spawns['Origin'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    if(Game.spawns['Origin'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Origin'].spawning.name];
        Game.spawns['Origin'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Origin'].pos.x + 1, 
            Game.spawns['Origin'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
    }
}