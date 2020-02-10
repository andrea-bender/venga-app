/* eslint-disable indent */
'use strict';
const ClimbsService = {
	getAllClimbs(knex) {
		return knex.select('*').from('climbs');
	},

	insertClimb(knex, newClimb) {
		return knex.insert(newClimb).into('climbs').returning('*').then((rows) => {
			return rows[0];
		});
	},

	getById(knex, id) {
		return knex.from('climbs').select('*').where('id', id).first();
	},

	deleteClimb(knex, id) {
		return knex.from('climbs').where({ id }).delete();
	},

	updateClimb(knex, id, newClimbField) {
		return knex.from('climbs').where({ id }).update(newClimbField);
	}
};

module.exports = ClimbsService;
