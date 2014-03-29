/*
 * Serve JSON to our AngularJS client
 */
var request = require('request')

exports.getReportList = function (req, res) {

	var reportList = {}

	console.log('start report get')

	request('http://www.radreport.org/json/', function(error, result, body) {
		reportList = result.body
		res.send('200', reportList)
	})

	console.log('end report get')
}

exports.getTemplate = function (req, res) {

	var template = {}

	console.log('start get Template')

	request('http://www.radreport.org/json/template/?id=2|7&format=text', function(error, result, body) {
		template = body
		//console.log(result)
		res.send('200', template)
	})

	console.log('end get Template')

}