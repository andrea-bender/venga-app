/* eslint-disable indent */
'use strict';
const express = require('express');
const ClimbsService = require('./climbs-service');
const climbsRouter = express.Router();
const jsonParser = express.json();
const path = require('path');

const ClimbForm = (climbs) => ({
	id: climbs.id,
	name: climbs.name,
	location: climbs.ingredients,
	description: climbs.description,
	type: climbs.type,
	grade: climbs.grade,
	rating: climbs.rating
});

climbsRouter
	.route('/')
	.get((req, res, next) => {
		const knexInstance = req.app.get('db');

		ClimbsService.getAllClimbs(knexInstance)
			.then((climbs) => {
				res.json(climbs.map(ClimbForm));
			})
			.catch(next);
	})
	.post(jsonParser, (req, res, next) => {
		const { name, location, description, grade, type, rating } = req.body;
		const newClimb = { name, location, description, grade, type, rating };

		if (!name) {
			return res.status(400).json({
				error: {
					message: `Missing name`
				}
			});
		}

		if (!location) {
			return res.status(400).json({
				error: {
					message: `Missing location`
				}
			});
		}

		if (!description) {
			return res.status(400).json({
				error: {
					message: `Missing description`
				}
			});
		}
		if (!grade) {
			return res.status(400).json({
				error: {
					message: `Missing grade`
				}
			});
		}
		if (!type) {
			return res.status(400).json({
				error: {
					message: `Missing type`
				}
			});
		}
		if (!rating) {
			return res.status(400).json({
				error: {
					message: `Missing rating`
				}
			});
		}

		ClimbsService.insertClimb(req.app.get('db'), newClimb)
			.then((climbs) => {
				res.status(201).location(path.posix.join(req.originalUrl + `/${climbs.id}`)).json(ClimbForm(climbs));
			})
			.catch(next);
	});

climbsRouter
	.route('/:id')
	.all((req, res, next) => {
		const { id } = req.params;

		ClimbsService.getById(req.app.get('db'), id)
			.then((climbs) => {
				if (!climbs) {
					return res.status(404).json({
						error: {
							message: `Climb does not exist`
						}
					});
				}
				res.climbs = climbs;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		console.log(res.climbs);
		res.json(ClimbForm(res.climbs));
	})
	.delete((req, res, next) => {
		const { id } = req.params;
		const knexInstance = req.app.get('db');

		ClimbsService.deleteClimb(knexInstance, id)
			.then((climbs) => {
				res.status(204).end();
			})
			.catch(next);
	})
	.patch(jsonParser, (req, res, next) => {
		const { name, location, description, type, grade, rating } = req.body;
		const climbToUpdate = { name, location, description, type, grade, rating };

		const numberOfValues = Object.values(climbToUpdate).filter(Boolean).length;
		if (numberOfValues === 0)
			return res.status(400).json({
				error: {
					message: `Request body must contain informations`
				}
			});

		console.log(req.params);
		const { id } = req.params;
		const knexInstance = req.app.get('db');

		ClimbsService.updateClimb(knexInstance, id, climbToUpdate)
			.then(() => {
				res.status(204).json();
			})
			.catch(next);
	});

module.exports = climbsRouter;
