var Path = require('path')

module.exports =function(req,res){
    res.setHeader('Content-Type', 'text/html');    
	res.send('<h1>GypsyClick Basic Class Diagram</h1>' +
			'<br/><img src="static/img/classdiagram.png">' + 
			'<br/>');
}