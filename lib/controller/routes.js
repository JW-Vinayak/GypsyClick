	var routes = {};
	var fs = require('fs');
	
	routes['/asciimo'] = function(req, res) {
        var link = "http://i.imgur.com/kmbjB.png";
        res.send("<html><body><img src='" + link + "'></body></html>");
    };

    routes['/'] = function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.send(fs.readFileSync('./index.html'));
    };
    
    routes['/query'] = function(req, res) {
        require('./db_connect')(req,res);
    };
    
    routes['/struct'] = function(req, res) {
        require('./verify_user')(req,res);
    };
    
    routes['/ex'] = function(req, res) {
        require('./show_ex')(req,res);
    };
    
    routes['/render'] = function(req, res) {
        require('./Img')(req,res);
    };
    

module.exports.routes = routes;