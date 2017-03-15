exports.getLogByMachineId = function * (){
    const {machineid} = this.params
    console.log(this.service.log)
    let data = yield this.service.log.getLogByMachineId.call(this, machineid)
    this.body = {
        code: "200",
        message: "success",
        data: data
    }
}