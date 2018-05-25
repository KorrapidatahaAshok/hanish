const regschema=require('.././models/users.js');
const express = require('express');
const router= express.Router();
router.post('/register',(req,res)=>{
	console.log(req.body);
	var registerSchema = new regschema({
			firstname:req.body.body.data.firstname,
			lastname:req.body.body.data.lastname,
			username:req.body.body.data.username,
			email:req.body.body.data.email,
			password:req.body.body.data.password

	})
	regschema.reg(registerSchema,(result)=>{
		res.send(result);
	})

})
router.post('/login',(req,res)=>{
	console.log("login");
console.log(req.body.body);
regschema.login((req.body.body),(result)=>{
	// console.log(result)
	res.send(result);
})
})

module.exports = router;
