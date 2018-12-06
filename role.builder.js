var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
			} else {
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: object => object.hits < (object.hitsMax / 3)
				})

				if (targets.length) {
					if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);
					}
				}
			}
	    }
	    else { //if not in building state
	        var sources = creep.room.find(FIND_SOURCES);
	        var nearfar = 1;
            if(creep.harvest(sources[nearfar]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[nearfar]);
			}
			// withdraw from extensions first, otherwise harvest from sources
			//var extensions = creep.room.find(FIND_STRUCTURES)

			// get a list of all extensions
			// Do I need to check which one has energy in it or will it do that automatically?


	    }
	    if(creep.carry.energy == creep.carryCapacity && creep.memory.building == false)
	    {
	    	var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
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

module.exports = roleBuilder;