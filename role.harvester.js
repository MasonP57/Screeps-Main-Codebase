var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.harvesting && creep.carry.energy == 0){
            creep.memory.harvesting = true;
        }
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity){
            creep.memory.harvesting = false;
        }
        if(creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            var nearfar = 0;
            if(creep.harvest(sources[nearfar]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[nearfar]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;