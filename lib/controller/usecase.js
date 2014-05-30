var Path = require('path')

module.exports =function(req,res){
    res.setHeader('Content-Type', 'text/html');    
	res.send('<h1>GypsyClick Basic Usecase Diagram</h1>' +
			'<br/><img src="static/img/usecases.png">' + 
			'<br/>');
}