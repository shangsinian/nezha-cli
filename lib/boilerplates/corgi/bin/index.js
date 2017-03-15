'use strict';

const koa = require('koa');
const cors = require('koa-cors');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const render = require('koa-ejs');
const session = require('koa-session');

const path = require('path');
const app = koa();
const appLoader = require('./src/loader');
const config = require('./config');

new appLoader(config,app).init()

app.use(serve(__dirname + '/static'));

app.keys = [config.appName];
app.use(session(app));
app.use(bodyParser());

render(app, {
	root: path.join(process.cwd(), 'app/views'),
	layout: false,
	viewExt: 'ejs',
	cache: false,
	debug: true
});

app.use(compress());

app.listen(8080);
