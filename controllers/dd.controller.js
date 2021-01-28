const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;       
const upazilla = db.upazilla;
const trainedFarmer = db.trainedFarmer;
const demonstrationInitial = db.demonstrationInitial;
const demonstrationFinal = db.demonstrationFinal;
const vermiCompostInitial = db.vermiCompostInitial;
const vermiCompostFinal = db.vermiCompostFinal;
const expense = db.expense;
const fieldDay = db.fieldDay;
const kormoshuchi = db.kormoshuchi;
const noa = db.noa;
const progress = db.progress;

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.ddlogin=async(req,res)=>{
    res.render('dd/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'' });
    res.send("log");
};

module.exports.ddloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        dd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "dd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/dd/dashboard');
                    }
                    else{
                        return res.status(200).render('dd/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('dd/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // upazilla.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , upazilla.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //             else{
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('upazilla/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.ddDashboard = async(req,res) => {
    console.log("dddashboard",res.locals.type);
    res.render('dd/dashboard', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.ddsignup=async(req,res)=>{
    await ad.findAll()
    .then(data => {
        console.log("inside");
        res.render('dd/signup', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('dd/signup', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'',records: err });
    })
};
module.exports.ddsignuppost=async(req,res)=>{
    try {
        const{ads,uname,district,password,confirmPassword}=req.body;
        const ddata=await ad.findAll();
        const data = await dd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('dd/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: The dd is already enrolled!',records: ddata })
        }
        else if(password !== confirmPassword){
            return res.render('dd/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: Passwords do not match!',records: ddata })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createdd = await dd.create({
                    uname: uname,
                    district:district,
                    password:hashedPassword,
                    ad_id:ads,
                    pd_id:1
                    })
                res.render('dd/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'dd Registered Successfully!',records: ddata })
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end

//trainedFarmer controller
module.exports.trainedFarmer=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.trainedFarmerFilter=async(req,res)=>{
    await trainedFarmer.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};
//trainedFarmer controller end

//demonstrationInitial controller
module.exports.demonstrationInitial=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/demonstrationInitial/demonstrationInitial', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/demonstrationInitial/demonstrationInitial', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.demonstrationInitialFilter=async(req,res)=>{
    await demonstrationInitial.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/demonstrationInitial/demonstrationInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/demonstrationInitial/demonstrationInitialYear', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};
//demonstrationInitial controller end

//demonstrationFinal controller
module.exports.demonstrationFinal=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/demonstrationFinal/demonstrationFinal', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/demonstrationFinal/demonstrationFinal', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.demonstrationFinalFilter=async(req,res)=>{
    await demonstrationFinal.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/demonstrationFinal/demonstrationFinalTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/demonstrationFinal/demonstrationFinalYear', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};
//demonstrationFinal controller end

//expense controller
module.exports.expense=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/expense/expense', { title: 'হিসাব বিবরণী',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/expense/expense', { title: 'হিসাব বিবরণী',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.expenseFilter=async(req,res)=>{
    await expense.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/expense/expenseTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/expense/expenseYear', { title: 'হিসাব বিবরণী',success:'', records: err });
    })

};
//expense controller end

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/fieldDay/fieldDayYear', { title: 'মাঠ দিবস',success:'', records: err });
    })

};
//fieldDay controller end

//kormoshuchi controller
module.exports.kormoshuchi=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/kormoshuchi/kormoshuchi', { title: 'প্রশিক্ষণ কর্মসূচী',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/kormoshuchi/kormoshuchi', { title: 'প্রশিক্ষণ কর্মসূচী',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.kormoshuchiFilter=async(req,res)=>{
    await kormoshuchi.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/kormoshuchi/kormoshuchiTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/kormoshuchi/kormoshuchiYear', { title: 'প্রশিক্ষণ কর্মসূচী',success:'', records: err });
    })

};
//kormoshuchi controller end

//noa controller
module.exports.noa=async(req,res)=>{ 
    try{
        var noass= await noa.findAll({where: {dd_id: req.session.user_id}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/noa/noa', { title: 'NOA সংক্রান্ত তথ্য',success:'',upazillas:upazillass,noas:noass });
    }
    catch(err){
        console.log("outside",err);
    }
     
    //  records:result

};

//noa controller end

//progress controller
module.exports.progress=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/progress/progress', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/progress/progress', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.progressFilter=async(req,res)=>{
    await progress.findAll({ 
        where: {upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/progress/progressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/progress/progressYear', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'', records: err });
    })

};
//progress controller end

//vermiCompostInitial controller
module.exports.vermiCompostInitial=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/vermiCompostInitial/vermiCompostInitial', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/vermiCompostInitial/vermiCompostInitial', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.vermiCompostInitialFilter=async(req,res)=>{
    await vermiCompostInitial.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/vermiCompostInitial/vermiCompostInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/vermiCompostInitial/vermiCompostInitialYear', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};
//vermiCompostInitial controller end

//vermiCompostFinal controller
module.exports.vermiCompostFinal=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/vermiCompostFinal/vermiCompostFinal', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/vermiCompostFinal/vermiCompostFinal', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.vermiCompostFinalFilter=async(req,res)=>{
    await vermiCompostFinal.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/vermiCompostFinal/vermiCompostFinalTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/vermiCompostFinal/vermiCompostFinalYear', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};
//vermiCompostFinal controller end