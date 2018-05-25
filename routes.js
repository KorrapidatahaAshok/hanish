var Register = require('./Register/Register.controller')
var Project = require('./Projects/Project.controller')
var Admin = require('./Admin/Admin.controller')
var UpdateCalculation = require("./Projects/updateVHModelController")
module.exports = function (app) {
	
    //user routing
    app.post('/api/userRegister', Register.register)
    app.post('/api/userUpdate', Register.update)
    app.post('/api/userDelete', Register.delete1)
    app.post('/api/userActiveAccount', Register.ActiveAccount)
    app.post('/api/userLogin', Register.UserLogin)
    app.get('/api/findUsers', Register.findUsers)
    app.post('/api/fgtpswd', Register.fgtpswd)
    app.post('/api/changepswd', Register.changepswd)
    app.post('/api/changePwdBasedId', Register.changePwdBasedId)
    
    

    //project routing
    app.post('/api/createProject', Project.create)
    app.post('/api/ProjectUpdate', Project.update)
    app.post('/api/ProjectDelete', Project.delete)
    app.get('/api/findProjects', Project.findProjects)
    app.get('/api/findUserProjects/:data', Project.findUserProjects)
    app.get('/api/projectBasis/:id', Project.projectBasis)
   
    

    //Admin routing
    app.post('/api/AdminRegister', Admin.register)
    app.post('/api/AdminUpdate', Admin.update)
    app.post('/api/adminchangepswd', Admin.adminchangepswd)
   
    //Median income
    app.get('/api/medianIncome/:num', Admin.medianIncome)
    app.post('/api/addMedianIncome', Admin.addMedianIncomeData)
    app.post('/api/updateMedianIncome', Admin.updateMedianIncome)
    app.post('/api/deleteMedianIncome', Admin.deleteMedianIncome)

    // FMR Rents
    app.get('/api/fmrRents/:num', Admin.fmrRents)
    app.post('/api/addfmrRents', Admin.addfmrRents)
    app.post('/api/updatefmrRents', Admin.updatefmrRents)
    app.post('/api/deletefmrRents', Admin.deletefmrRents)

    //RC Assumptions
    app.get('/api/rcAssumption', Admin.rcAssumption)
    app.post('/api/addRCAData', Admin.addRCAData)
    app.post('/api/updateRCAData', Admin.updateRCAData)
    app.post('/api/deleteRCAData', Admin.deleteRCAData)

     app.post('/api/adminVhmodelEdit', Project.vhmodeledit) 
    //  app.get('/api/vhModeldata/:id', Project.vhModeldata)

    app.get('/api/getVHModel/:id', UpdateCalculation.getById)
    app.post('/api/updatevhmodel', UpdateCalculation.updateById)
    // app.post('/api/usereditvhmodel', Project.userupdatevhmodel)

    app.get("/api/server", (req,res) => {



        var a={
            "Fname":"Jaya"
        }

        var b={
            "lname":"Lakshmi"
        }
        var c={
            a,b
        }
        res.json(c)



    })

}