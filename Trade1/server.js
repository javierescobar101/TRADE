var express = require('express');
var app = express();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/contactlist');

var contact = mongoose.model('contact', {
	url: String,
	model: String,
	year: String,
	company: String,
	condition: String
});


var db = mongojs('contactlist', ['contacts']);
	db.contacts.find(function (err, docs){
		console.log('docs', docs);
		
	});	 



app.get('/contactlist', function (req, res){

	contact.find({}, function (err, contacts){
		console.log('contacts:', contacts);
		res.json(contacts);
	});	 
});
app.post('/contactlist', function (req, res){
		console.log(req.body);
		db.contacts.insert(req.body, function (err, docs){
			res.json(docs);
		});
});
app.delete('/contactlist/:id',function (req, res){
	var id = req.params.id;
	console.log(id);
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function (err, docs){
		res.json(docs);
	})
});

app.get('/contactlist/:id',function (req, res){
	var id = req.params.id;
	console.log(id);
	db.contacts.findOne({_id: mongojs.ObjectId(id)}, function (err, docs){
		res.json(docs);
	})
})
app.put('/contactlist/:id', function (req, res){
	var id = req.params.id;
	db.contacts.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {url: req.body.url, model:req.body.model, year: req.body.year, company: req.body.company, condition: req.body.condition}},
		new: true }, function (err, docs){
			res.json(docs);
	});
});

app.listen(3000);
console.log("Server running on port 3000");
