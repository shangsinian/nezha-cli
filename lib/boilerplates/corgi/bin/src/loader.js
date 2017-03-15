'use strict'
const is = require('is-type-of')
const assert = require('assert')
const Router = require('koa-router')
const mount = require('koa-mount')

const util = require('./util')

class AppLoader {
    constructor(config,app){
        var self = this
        this.config = config
        this.app = app
        this.control = {}
        this.service = {}
        this.dao = {}
        this.plugin = {}
    }

    init(){
        this._loadPlugin()
        this._loadMiddleware()
        this._loadService()
        this._loadDao()
        this._loadControl(()=>{
            this._loadRouter()
        })
    }

    _loadPlugin () {
        const pluginPaths = [
            './node_modules',
            './app/plugin',
        ]

        this._loadModule(pluginPaths,'plugin')
    }

    _loadMiddleware () {
        const middlewarePaths = [
            './app/middleware',
        ]

        this._loadModule(middlewarePaths,'middleware')
    }

    _loadRouter () {
        const routerPaths = [
            './app/router',
        ]

        this._loadModule(routerPaths,'router')
    }

    _loadControl (cb) {
        const controlPaths = [
            './app/control',
        ]

        cb(this._loadModule(controlPaths,'control'))
    }

    _loadService () {
        const servicePaths = [
            './app/service',
        ]

        this._loadModule(servicePaths,'service')
    }

    _loadDao () {
        const daoPaths = [
            './app/dao',
        ]

        this._loadModule(daoPaths,'dao')
    }

    _loadModule (paths,type){
        let allImport = util.getAllImport(paths,type)
        let needImport = (this.config[type])?this.config[type]:[]
        let importOrder = util.getImportOrder(allImport,needImport)
        assert(is.array(importOrder), `Modules of util.loadModule should be Array`)
        importOrder.map((item)=>{
            console.log(item.name,type)
            assert(item.name && item.path, `Modules of util.loadModule is illegal`)
            assert(util.existsModule(item.path), `Module ${item.name} path ${item.path} is not exists`)
            assert(!this[item.name], `Duplicate module imports`)
            let module = require(`../../${item.path}`)
            if(type === "middleware"){
                this.app.use(module)
            }else if(type === "router"){
                let router = new Router()
                module(router,this.middleware,this.control)
                this.app.use(mount('/', router.middleware()))
            }else{
                this[type][item.name] = module
                let self = this
                this.app.use(function *(next){
                    console.log(this)
                    this.control = self.control
                    this.service = self.service
                    this.dao = self.dao
                    this.plugin = self.plugin
                    console.log(this)
                    yield next;
                })
                
            }
        })
    }
}

module.exports = AppLoader