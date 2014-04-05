var db = require('../lib/db.js');

module.exports = function(app) {

	/**
	 * Spec b1.1 get the setting by object id with GET
	 */
	app.get('/api/setting/:id', function(req, res){
		var id = req.params.id;
		db.findOne('setting', {'id': parseInt(id)}, {}, function(err, setting){
			if (!err) {
				return res.send(200,setting);
			} else {
				return console.log(err);
			}
		});
	});
	
	/**
	 * Spec b1.2 edit a setting with PUT
	 */
//	app.put('/api/setting/:id', function(req, res){
//		var id = req.params.id;
//		delete req.body['_id'];
//		db.update('setting',  {'id': parseInt(id)}, {$set: req.body},
//			{upsert: false, multi:false}, function(err, updated){
//				//console.log('in update setting updated=%j', updated);
//				if(err){
//					console.log('in update setting err=%j', err);
//				}else{
//					res.send(200,req.body);
//				}
//				
//		});
//	});

	app.get('/api/options', function(req, res){
		var options = [
		               {name: 'entry1', value: 0},
		               {name: 'entry2', value: 1},
		               {name: 'entry3', value: 2}
		             ];
		return res.send(200,options);
	});
};
