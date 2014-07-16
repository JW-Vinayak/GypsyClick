#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var Path 	= require('path');
var Moment 	= require('moment');


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8084;
        self.db_host   = process.env.OPENSHIFT_MYSQL_DB_HOST;
        self.db_port   = process.env.OPENSHIFT_MYSQL_DB_PORT;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        var r = require(Path.normalize(__dirname) + '/lib/controller/routes'); 
        self.routes = r.routes;
        console.log(self.routes);
    };

    self.initializeModels = function(){
    	var model, deploymentDB,
        homeDir = Path.normalize(__dirname),
            modelDir = homeDir + '/lib/model';

    	
        model = require(modelDir);
        /*model.init(function(err) {
            if (err) {
            	console.log(err);
                console.error('Could not open Database Models.');
                //return callback(err);
            }
            else
            console.log('\t- Database Models are initialized');
            //callback(null);
        });*/
    }

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
    	self.initializeModels();
        self.createRoutes();
        self.app = express();
        
        self.app.use('/static', express.static(Path.normalize(__dirname)+'/public')); //how to tweak this to cache different value

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
    	
    	var end = new Moment(Moment("05/26/2014" + " 00:00:00").format('YYYY-MM-DDTHH:mm:ss') + "Z");
    	console.log('actual date : ' + end.toDate().toString());
    	
    	var con = new Moment(Moment("05/26/2014" + " 00:00:00").format('YYYY-MM-DDTHH:mm:ss') + "-0800");
    	console.log('pst date : ' + con.toDate().toString());
    	
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
            console.log('DB HOST : %s \n DB PORT : %d', self.db_host, self.db_port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

