'use strict';
const knex = require('knex');
const app = require('../src/app');
const { makeClimbsArray } = require('./test-helpers');

describe('Climb Endpoints', function() {
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

	// GET climbs
	describe(`GET /api/climbs`, () => {
		context(`Given no climbs`, () => {
			it(`Responds with 200 and empty list`, () => {
				return supertest(app).get('/api/climbs').expect(200, []);
			});
		});

		context(`Given climbs in database`, () => {
			const testClimbs = makeClimbsArray();

			beforeEach(`Insert Climbs`, () => {
				return db.into('climbs').insert(testClimbs);
			});

			it('Responds with 200 and get all store', () => {
				return supertest(app).get('/api/climbs').expect(200, testClimbs);
			});
		});
	});

	describe(`GET /api/climbs/:id`, () => {
		context(`Given no climbs`, () => {
			it(`Responds with 404`, () => {
				const ClimbsId = 123456;

				return supertest(app).get(`/api/climbs/${ClimbsId}`).expect(404, {
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

			it('Responds with 200 and specified climb', () => {
				const ClimbsId = 2;
				const expectedClimbs = testClimbs[ClimbsId - 1];

				return supertest(app).get(`/api/climbs/${ClimbsId}`).expect(200, expectedClimbs);
			});
		});
	});

	// POST climbs
	describe(`POST /api/climbs`, () => {
		it(`Creates climbs with 201 responds and adds a new climb`, function() {
			const newClimb = {
				name: 'test name',
				location: 'test location',
				description: 'test description',
				grade: 'test grade',
				type: 'Boulder',
				rating: 3
			};

			return supertest(app)
				.post('/api/climbs')
				.send(newClimb)
				.expect(201)
				.expect((res) => {
					expect(res.body).to.have.property('id');
					expect(res.body.name).to.eql(newClimb.name);
					expect(res.body.location).to.eql(newClimb.location);
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
				name: 'test name',
				location: 'test location',
				description: 'test description',
				grade: 'test grade',
				type: 'Boulder',
				rating: 3
			};

			it(`response with 400 and an error message when somthing is missing`, () => {
				delete newClimb[field];

				return supertest(app).post('/api/climbs').send(newClimb).expect(400, {
					error: { message: `Missing ${field}` }
				});
			});
		});
	});

	//DELETE climb
	describe(`DELETE /api/climbs/:id`, () => {
		context(`Given no climbs in the database`, () => {
			it(`responds with 404`, () => {
				const ClimbsId = 123456;
				return supertest(app).delete(`/api/climbs/${ClimbsId}`).expect(404, {
					error: { message: `Climb doesn't exist` }
				});
			});
		});

		context('Given there are climbs in the database', () => {
			const testClimbs = makeClimbsArray();

			beforeEach('insert climbs', () => {
				return db.into('climbs').insert(testClimbs);
			});

			it('get climbs from store with 204', () => {
				const idToRemove = 1;
				const expectedClimbs = testClimbs.filter((climb) => climb.id !== idToRemove);

				return supertest(app)
					.delete(`/api/recipes/${idToRemove}`)
					.expect(204)
					.then((res) => supertest(app).get(`/api/recipes`).expect(expectedClimbs));
			});
		});
	});

	// PATCH climb
	describe(`PATCH /api/climbs/:id`, () => {
		context(`Given no climbs in the database`, () => {
			it(`responds with 404`, () => {
				const ClimbsId = 123456;
				return supertest(app).delete(`/api/climbs/${ClimbsId}`).expect(404, {
					error: { message: `Climb doesn't exist` }
				});
			});
		});

		context('Given there are climbs in the database', () => {
			const testClimbs = makeClimbsArray();

			beforeEach('insert climbs', () => {
				return db.into('climbs').insert(testClimbs);
			});

			it('Responds wtih 204 and updated climb', () => {
				const idToUpdate = 3;
				const testClimbs = makeClimbsArray();
				const updateClimb = {
					name: 'Update  name',
					location: 'Update  location',
					description: 'Update  description',
					grade: 'Update grade',
					type: 'Sport',
					rating: 2
				};
				const expectedClimbs = {
					...testClimbs[idToUpdate - 1],
					...updateClimb
				};

				return supertest(app)
					.patch(`/api/climbs/${idToUpdate}`)
					.send(updateClimb)
					.expect(204)
					.then((res) => supertest(app).get(`/api/climbs/${idToUpdate}`).expect(expectedClimbs));
			});
		});
	});
});
