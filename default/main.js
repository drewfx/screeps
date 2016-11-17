var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');


module.exports.loop = function () {


var harvesters = [];
var upgraders = [];
var builders = [];
var repairers = [];

for (var i in Game.creeps) {
    if(Game.creeps[i].memory.role == 'harvester') {
        harvesters.push(Game.creeps[i]);
    }
    if(Game.creeps[i].memory.role == 'builder') {
        builders.push(Game.creeps[i]);
    }
    if(Game.creeps[i].memory.role == 'upgrader') {
        upgraders.push(Game.creeps[i]);
    }
    if(Game.creeps[i].memory.role == 'repairer') {
        repairers.push(Game.creeps[i]);
    }
}

    if (builders.length < 3) {
        Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], null, {role: 'builder'} );
    }
    if (upgraders.length < 3) {
        Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], null, {role: 'upgrader'} );
    }
    if (repairers.length < 1) {
        Game.spawns['Main'].createCreep( [WORK, WORK, CARRY, CARRY, MOVE], null, {role: 'repairer'} );
    }
    if (harvesters.length < 1) {
        Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], null, {role: 'harvester'} );
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
    
    // population report
    var report = "Builders: "+builders.length+"  Harvesters: "+harvesters.length+"  Upgraders: "+upgraders.length+"  Repairers: "+repairers.length;
    console.log(report);
}

// Note
/**
 * Create Harvester:
 * Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], null, {role: 'harvester'} );
 * 
 * Game.spawns['Main'].createCreep( [WORK, WORK, CARRY, CARRY, MOVE], null, {role: 'harvester'} );
 * 
 * 
 * REPAIRER STOPS WORKING HARD RESET
 * Game.getObjectById('id').memory.repairing = false;
 */