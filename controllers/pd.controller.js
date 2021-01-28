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


module.exports.pdlogin=async(req,res)=>{
    res.render('pd/login', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};

module.exports.pdloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        pd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "pd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/pd/dashboard');
                    }
                    else{
                        return res.status(200).render('pd/login', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('pd/login', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
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

module.exports.pdDashboard = async(req,res) => {
    console.log("pddashboard",res.locals.type);
    res.render('pd/dashboard', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};
module.exports.pdsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await pd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('pd/signup',{title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: The pd is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('pd/signup',{title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createpd = await pd.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('pd/signup',{title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'pd Registered Successfully!'})
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
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.trainedFarmerFilter=async(req,res)=>{
    await trainedFarmer.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};

module.exports.trainedFarmerDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', upazillas:err });
    }
     

};
//trainedFarmer controller end

//demonstrationInitial controller
module.exports.demonstrationInitial=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/demonstrationInitial/demonstrationInitial', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/demonstrationInitial/demonstrationInitial', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:''});
    }
     
    //  records:result

};

module.exports.demonstrationInitialFilter=async(req,res)=>{
    await demonstrationInitial.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/demonstrationInitial/demonstrationInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/demonstrationInitial/demonstrationInitialYear', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};

module.exports.demonstrationInitialDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/demonstrationInitial/demonstrationInitial', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//demonstrationInitial controller end

//demonstrationFinal controller
module.exports.demonstrationFinal=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/demonstrationFinal/demonstrationFinal', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/demonstrationFinal/demonstrationFinal', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:''});
    }
     
    //  records:result

};

module.exports.demonstrationFinalFilter=async(req,res)=>{
    await demonstrationFinal.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/demonstrationFinal/demonstrationFinalTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/demonstrationFinal/demonstrationFinalYear', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};

module.exports.demonstrationFinalDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/demonstrationFinal/demonstrationFinal', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//demonstrationFinal controller end

//expense controller
module.exports.expense=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/expense/expense', { title: 'হিসাব বিবরণী',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/expense/expense', { title: 'হিসাব বিবরণী',success:''});
    }
     
    //  records:result

};

module.exports.expenseFilter=async(req,res)=>{
    await expense.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/expense/expenseTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/expense/expenseYear', { title: 'হিসাব বিবরণী',success:'', records: err });
    })

};

module.exports.expenseDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/expense/expense', { title: 'হিসাব বিবরণী',success:'', upazillas:err });
    }
     

};
//expense controller end

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:''});
    }
     
    //  records:result

};

module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/fieldDay/fieldDayYear', { title: 'মাঠ দিবস',success:'', records: err });
    })

};

module.exports.fieldDayDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', upazillas:err });
    }
     

};
//fieldDay controller end

//kormoshuchi controller
module.exports.kormoshuchi=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/kormoshuchi/kormoshuchi', { title: 'প্রশিক্ষণ কর্মসূচী',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/kormoshuchi/kormoshuchi', { title: 'প্রশিক্ষণ কর্মসূচী',success:''});
    }
     
    //  records:result

};

module.exports.kormoshuchiFilter=async(req,res)=>{
    await kormoshuchi.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/kormoshuchi/kormoshuchiTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/kormoshuchi/kormoshuchiYear', { title: 'প্রশিক্ষণ কর্মসূচী',success:'', records: err });
    })

};

module.exports.kormoshuchiDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/kormoshuchi/kormoshuchi', { title: 'প্রশিক্ষণ কর্মসূচী',success:'', upazillas:err });
    }
     

};
//kormoshuchi controller end

//noa controller
module.exports.noa=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/noa/noa', { title: 'NOA সংক্রান্ত তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/noa/noa', { title: 'NOA সংক্রান্ত তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.noaFilter=async(req,res)=>{
    await noa.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/noa/noaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/noa/noaYear', { title: 'NOA সংক্রান্ত তথ্য',success:'', records: err });
    })

};

module.exports.noaDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/noa/noa', { title: 'NOA সংক্রান্ত তথ্য',success:'', upazillas:err });
    }
     

};
//noa controller end

//progress controller
module.exports.progress=async(req,res)=>{
    try{
        var districts=await ad.findAll();
        console.log("inside");
        res.render('pd/progress/progress', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/progress/progress', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:''});
    }
     
    //  records:result

};

module.exports.progressFilter=async(req,res)=>{
    await progress.findAll({ 
        where: {ad_id: req.body.district}
    })
    .then(data => {
        res.render('pd/progress/progressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/progress/progressYear', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'', records: err });
    })

};

// module.exports.progressDistrictFilter=async(req,res)=>{
//     try{
//         // var dds=await dd.findAll({where: {id: req.body.district}});
//         var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
//         console.log("inside");
//         res.send(upazillass)
//     }
//     catch(err){
//         console.log("outside",err);
//         res.render('pd/progress/progress', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'', upazillas:err });
//     }
     

// };
//progress controller end

//vermiCompostInitial controller
module.exports.vermiCompostInitial=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/vermiCompostInitial/vermiCompostInitial', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/vermiCompostInitial/vermiCompostInitial', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:''});
    }
     
    //  records:result

};

module.exports.vermiCompostInitialFilter=async(req,res)=>{
    await vermiCompostInitial.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/vermiCompostInitial/vermiCompostInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/vermiCompostInitial/vermiCompostInitialYear', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};

module.exports.vermiCompostInitialDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/vermiCompostInitial/vermiCompostInitial', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//vermiCompostInitial controller end

//vermiCompostFinal controller
module.exports.vermiCompostFinal=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/vermiCompostFinal/vermiCompostFinal', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/vermiCompostFinal/vermiCompostFinal', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:''});
    }
     
    //  records:result

};

module.exports.vermiCompostFinalFilter=async(req,res)=>{
    await vermiCompostFinal.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/vermiCompostFinal/vermiCompostFinalTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/vermiCompostFinal/vermiCompostFinalYear', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};

module.exports.vermiCompostFinalDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/vermiCompostFinal/vermiCompostFinal', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//vermiCompostFinal controller end