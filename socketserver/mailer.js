var NM = require('nodemailer');
var util = require('util');
var config = require('../serverconfig');
var xoauth2 = require('xoauth2');
var mg = require('mailgun-js')({domain: 'fuechschen.org', apiKey: 'key-a8b1b2c6348edf6d459904dde4e53157'});
var fs = require('fs');

function Mailer(){
	var opts = config.room.email.options;
	this.trans = NM.createTransport(opts.auth.xoauth2 ? util._extend(opts, {
		auth: {
			xoauth2: xoauth2.createXOAuth2Generator(opts.auth.xoauth2),
		},
	}) : opts);
}

Mailer.prototype.sendEmail = function(type, opts, receiver, callback){
	mg.messages().send({
		from: 'Musiqpad <pad@fuechschen.org>',
		to: receiver,
		subject: this.getType(type).subject,
		html: this.getType(type).body.replace(/%%[A-Z]+%%/g, function(k){ return opts[k.slice(2, -2).toLowerCase()] || k; })
	}, function(err, body){
		console.log(err, body);
	});
};

Mailer.prototype.makeEmailObj = function(type, receiver, opts){
	//Get email type
	type = this.getType(type);

	//Replace all variables
	type.body = type.body.replace(/%%[A-Z]+%%/g, function(k){ return opts[k.slice(2, -2).toLowerCase()] || k; });

	//Return email options
	return {
	    from: config.room.email.sender,
	    to: receiver,
	    subject: type.subject,
	    html: type.body,
	};
};

Mailer.prototype.getType = function(type){
	var returnObj;

	switch(type){
		case 'signup':
			returnObj = {
				subject :'Welcome to musiqpad!',
				body:'Thanks you for registering on musiqpad, %%USER%%!<br>\
				Before you are able to do anything, you are required to confirm your email address.<br>\
				To do so, type the following line in chat<br><br>\
				<h1>/confirm %%CODE%%</h1>'
			};
			break;
		case 'recovery':
			returnObj = {
				subject :'Password recovery',
				body:'There is a pending request to reset your password on musiqpad for your account %%USER%%<br>\
				If you did not request this, plese ignore this email<br>\
				To reset your password, go to musiqpad, open the login / signup dialog, click "Forgot password" button and fill in the following:<br>\
				E-mail: %%EMAIL%%<br>\
				Recovery Code: %%CODE%%<br>\
				New Password: &lt;your new password&gt;<br>\
				The recovery code will be valid until %%TIMEOUT%%'
			};
			break;
	}

	return returnObj;
};

module.exports = new Mailer();
