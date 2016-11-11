var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var harvesters = [];
var upgraders = [];
var builders = [];

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
}

module.exports.loop = function () {
    var tower = Game.getObjectById('0bc4a79bbd073c7e0099a714');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    if (harvesters.length < 4) {
        Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], 'H'+(harvesters.length+1), {role: 'harvester'} );
    } else if (builders.length < 3) {
        Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], 'B'+(builders.length+1), {role: 'builder'} );
    } else if (upgraders.length < 3) {
        Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], 'U'+(upgraders.length+1), {role: 'upgrader'} );
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
    }
}

// Note
/**
 * Create Harvester: 
 * Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], 'Harvester2', {role: 'harvester'} );
 * 
 * Game.spawns['Main'].createCreep( [WORK, CARRY, MOVE], 'Builder1', {role: 'builder'} );
 * 
 */