var Path = require('path')

module.exports =function(req,res){
    res.setHeader('Content-Type', 'text/html');    
	res.send('<h1>This is a page to demo how static resources are rendered</h1>' +
			'<br/><img src="static/img/slice.png">' + 
			'<br/> Can you see the image?');
}