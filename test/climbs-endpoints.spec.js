/* eslint-disable indent */
'use strict';
const knex = require('knex');
const app = require('../src/app');
const { makeClimbsArray } = require('./test-helpers');

describe('Climbs Endpoints', function() {
	let db;

	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DATABASE_URL
		});
		app.set('db', db);
	});

	after('disconnect from db', () => db.destroy());
	before('clean the table', () => db.raw('TRUNCATE climbs RESTART IDENTITY CASCADE'));
	afterEach('cleanup', () => db.raw('TRUNCATE climbs RESTART IDENTITY CASCADE'));

	// get recipes
	describe(`GET /api/climbs`, () => {
		context(`Given no climbs`, () => {
			it(`Responds with 200 and empty list`, () => {
				return supertest(app).get('/api/climbs').expect(200, []);
			});
		});

		context(`Given climbs in database`, () => {
			const testClimbs = makeClimbsArray();

			beforeEach(`Insert climbs`, () => {
				return db.into('climbs').insert(testClimbs);
			});

			it('Responds with 200 and climbs', () => {
				return supertest(app).get('/api/climbs').expect(200, testClimbs);
			});
		});
	});

	describe(`GET /api/climbs/:id`, () => {
		context(`Given no climbs`, () => {
			it(`Responds with 404`, () => {
				const ClimbId = 123456;

				return supertest(app).get(`/api/climbs/${ClimbId}`).expect(404, {
					error: {
						message: `Climb doesn't exist`
					}
				});
			});
		});

		context(`Given climbs in database`, () => {
			const testClimbs = makeClimbsArray();

			beforeEach(`Insert climbs`, () => {
				return db.into('climbs').insert(testClimbs);
			});

			it('Responds with 200 and specific climb by id', () => {
				const ClimbId = 2;
				const expectedClimbs = testClimbs[ClimbId - 1];

				return supertest(app).get(`/api/climbs/${ClimbId}`).expect(200, expectedClimbs);
			});
		});
	});

	describe(`POST /api/climbs`, () => {
		it(`Creates climb with 201 responds and new climb`, function() {
			const newClimb = {
				name: 'climb name',
				location: 'climb location',
				description: 'climb description',
				type: 'climb type',
				grade: 'climb grade',
				rating: 0
			};

			return supertest(app)
				.post('/api/climbs')
				.send(newClimb)
				.expect(201)
				.expect((res) => {
					expect(res.body).to.have.property('id');
					expect(res.body.name).to.eql(newClimb.name);
					expect(res.body.location).to.eql(newClimb.loaction);
					expect(res.body.description).to.eql(newClimb.description);
					expect(res.body.grade).to.eql(newClimb.grade);
					expect(res.body.type).to.eql(newClimb.type);
					expect(res.body.rating).to.eql(newClimb.rating);

					expect(res.headers.location).to.eql(`/api/climbs/${res.body.id}`);
				})
				.then((res) => supertest(app).get(`/api/climbs/${res.body.id}`).expect(res.body));
		});

		const requiredFields = [ 'name', 'location', 'description', 'grade', 'type', 'rating' ];

		requiredFields.forEach((field) => {
			const newClimb = {
				name: 'climb name',
				location: 'climb location',
				description: 'climb description',
				type: 'climb type',
				grade: 'climb grade',
				rating: 0
			};

			it(`responds with 400 and an error message when somthing missing`, () => {
				delete newClimb[field];

				return supertest(app).post('/api/climbs').send(newClimb).expect(400, {
					error: { message: `Missing ${field}` }
				});
			});
		});
	});

	describe(`DELETE /api/climbs/:id`, () => {
		context(`Given no climbs in the database`, () => {
			it(`responds with 404`, () => {
				const ClimbId = 123456;
				return supertest(app).delete(`/api/climbs/${ClimbId}`).expect(404, {
					error: { message: `Climb does not exist` }
				});
			});
		});

		context('Given there are climbs in the database', () => {
			const testClimbs = makeClimbsArray();

			beforeEach('insert climbs', () => {
				return db.into('climbs').insert(testClimbs);
			});

			it('get climbs from store with 204', () => {
				const idToRemove = 5;
				const expectedClimbs = testClimbs.filter((climb) => climb.id !== idToRemove);

				return supertest(app)
					.delete(`/api/climbs/${idToRemove}`)
					.expect(204)
					.then((res) => supertest(app).get(`/api/climbs`).expect(expectedClimbs));
			});
		});
	});
});
