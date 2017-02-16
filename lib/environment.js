class Environment {
  constructor () {
    this.home = __dirname + "/";
		this.cwd = process.cwd();
		this.boilerplates_path = this.home + "boilerplates";
		this.plugins_path = this.home + "plugins";
  }
}

module.exports = Environment