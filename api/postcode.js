var db = require('../lib/db.js')
	, mongojs = require('mongojs');

module.exports = function(app) {
	
	/**
	 * Spec b2.1 get post codes by segment with GET
	 * 
	 * Sample query:
	 * default query: /api/postcodes/1  (first segment)
	 * query for segment 2: /api/postcodes/2?last_id=adf214123445
	 */
	app.get('/api/postcodes/:segment', function(req, res) {
		// order by insertion time with ascendant. future > past
		
		// default 5 pages and 10 docs per page
		var size = 50, skip, query={};
		var sort = [['_id', -1]];

		/**
		 * skip implementation
		 */
		var segment = parseInt(req.params.segment);
		if (segment > 1){
			query = {sort:sort, limit:size, skip: (segment - 1)* size};
		} else {
			query = {sort:sort, limit:size};
		}
		
		db.find('postcode',query, function(err, postcodes) {
			if (!err) {
				//var result = db.filterId(postcode);
				return res.send(200,postcodes);
			} else {
				return console.log(err);
			}
		});
		
		
//		if('last_id' in req.query){
//			last_id = req.query.last_id;
//			
//			var query = {};
//			// here assume default direction -1
//			query[field] = { '$lt' : last_id };
//			
////			if(direction == 1){
////				query[field] = { '$gt' : lastValue };
////			} else {
////				query[field] = { '$lt' : lastValue };
////			}
//
//			db.find('postcode',{query: query, sort:sort,limit:50}, function(err, postcodes) {
//				if (!err) {
//					//var result = db.filterId(postcode);
//					return res.send(200,postcodes);
//				} else {
//					return console.log(err);
//				}
//			});	
//		}else{
//			db.find('postcode',{sort:sort,limit:50}, function(err, postcodes) {
//				if (!err) {
//					//var result = db.filterId(postcode);
//					return res.send(200,postcodes);
//				} else {
//					return console.log(err);
//				}
//			});	
//		}
	});

	/**
	 * Spec b2.2 get the total number of post codes with GET
	 */
	app.get('/api/count/:collection', function(req, res){
		var collection = req.params.collection;
		console.log('visiting /api/count/' + collection);
		db.count(collection,{}, function(err, numDocs){
			
			if (!err) {
				//console.log('/api/postcode/:id got numDocs=%j', numDocs);
				return res.send(200,{total: numDocs});
			} else {
				return console.log(err);
			}
		});
	});
	
	/**
	 * Spec b2.3 get the postcode by object id with GET
	 */
	app.get('/api/postcode/:id', function(req, res){
		var id = req.params.id;
		//console.log('visiting GET /api/postcode/:id');
		db.findOne('postcode', {'_id': mongojs.ObjectId(id)}, {}, function(err, postcode){
			if (!err) {
				return res.send(200,postcode);
			} else {
				return console.log(err);
			}
		});
	});
	
//	/**
//	 * Spec 1.4 edit a postcode with PUT
//	 */
//	app.put('/api/postcode/:id', function(req, res){
//		var id = req.params.id;
//		delete req.body['_id'];
//		db.update('postcode',  {'_id': mongojs.ObjectId(id)}, {$set: req.body},
//			{upsert: false, multi:false}, function(){res.send(200,req.body);
//		});
//	});
//	
//	/**
//	 * Spec 1.5 delete a postcode by object id with DELETE
//	 */
//	app.delete('/api/postcode/:id', function(req, res){
//		var id = req.params.id;
//		db.remove('postcode', {'_id': mongojs.ObjectId(id)}, function(err, message){
//			if (!err) {
//				res.json(true);
//			} else {
//				console.log(err);
//				res.json(false);
//			}
//		});
//	});
};
