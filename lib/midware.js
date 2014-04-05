
module.exports = {
	/**
	 * Add Access-Control-Allow-Headers in HTTP response
	 */
	header : function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
		next();
	},
	
	/**
	 * Authentication each /api/* request with the tokenid
	 */
	authentication: function(req, res, next) {
		// console.log('in authentication');
	},
	
	/**
	 * Authorization: check if the user with tokenid has rights to access the api 
	 */
	authorization: function(tokenid, url) {
		//return {status: status_code, message : 'xxxx'}
	}	
}
