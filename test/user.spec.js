'use strict';

var request = require('supertest')
	, should = require('should')
	, mongojs = require('mongojs')
	, db = require('../lib/db');
	

var url = 'http://localhost:5099'
	
describe('Test users api\n', function() {

	var url_user_api = '/api/users';
	
	describe('Test get a list of users: GET->' + url_user_api, function() {
		
		it('should return 4 users for url ', function(done) {
			request(url)
			.get(url_user_api)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(4);
				res.body[0].should.have.property('firstname', 'Annie');
				if (err) return done(err);
				done();
			});
		});
	});
	
	describe('Test get user by id: GET-> /api/users/52e9ce56977f8a8b113a09f9', function() {
		
		it('should be able to query user by id ', function(done) {
			request(url)
			.get(url_user_api + '/52e9ce56977f8a8b113a09f9')
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				
				res.body.should.have.property('firstname', 'Dustin');
				if (err) return done(err);
				done();
			});
		});
	});
	
	describe('Test add user: POST -> /api/users', function() {
		
		afterEach(function(done) {
			db.remove('user', {'firstname': "Bill"}, function(err, numberOfRemovedDocs) {
				should.not.exist(err);
				// console.log('delete %j user', numberOfRemovedDocs);
				done();
			});
		});
		
		it('should be able to add user ' + url_user_api, function(done) {
			
			var user = {
				"firstname" : "Bill",
				"lastname" : "Gates",
				"age" : 56
			}
			
			request(url)
			.post(url_user_api)
			.send(user)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				
				res.body.should.have.property('firstname', 'Bill');
				if (err) return done(err);
				done();
			});
		});
	});

	describe('Test delete user: DELETE -> /api/users/52e9ce56977f8a8b113a09f9', function() {
		
		afterEach(function(done) {
			
			var user = {
				"_id": new mongojs.ObjectId("52e9ce56977f8a8b113a09f9"),
				"firstname" : "Dustin",
				"lastname" : "Light",
				"age" : 35
			}
			
			db.save('user', user, function(err, numberOfRemovedDocs) {
				should.not.exist(err);
				// console.log('delete %j user', numberOfRemovedDocs);
				done();
			});
		});
		
		it('should be able to delete user ' + url_user_api, function(done) {
			
			request(url)
			.del(url_user_api + '/52e9ce56977f8a8b113a09f9')
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				//console.log(res.body);
				res.body.should.be.true;
				//res.body.should.have.lengthOf(3);
				if (err) return done(err);
				done();
			});
		});
	});

//	describe('Test update user: PUT -> /api/users', function() {
//		
//		var user = {
//			"_id": "52e9ce56977f8a8b113a09f9",
//			"firstname" : "Dustinx"
//		}
//			
//		afterEach(function(done) {
//			var id = user._id;
//			db.update('user',  {'_id': mongojs.ObjectId(id)}, {$set: {"firstname" : "Dustin"}}, {upsert: true, multi:false}, function(err, numberOfUpdatedDocs) {
//				should.not.exist(err);
//				// console.log('delete %j user', numberOfRemovedDocs);
//				done();
//			});
//		});
//		
//		it('should be able to update user ' + url_user_api, function(done) {
//			
//			request(url)
//			.put(url_user_api)
//			.send(user)
//			.expect('Content-Type', /json/)
//			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
//			.expect(200)
//			.end(function(err,res){
//				should.not.exist(err);
//				
//				res.body.should.have.property('firstname', 'Dustinx');
//				//console.log(res.body);
//				if (err) return done(err);
//				done();
//			});
//		});
//	});
});