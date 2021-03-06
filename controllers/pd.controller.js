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
const trainedFarmerUpload = db.trainedFarmerUpload;
const expenseUpload = db.expenseUpload;
const fieldDayUpload = db.fieldDayUpload;
const demonstrationInitialUpload = db.demonstrationInitialUpload;
const demonstrationFinalUpload = db.demonstrationFinalUpload;
const vermiCompostInitialUpload = db.vermiCompostInitialUpload;
const vermiCompostFinalUpload = db.vermiCompostFinalUpload;
const kormoshuchiUpload = db.kormoshuchiUpload;
const noaUpload = db.noaUpload;
const progressUpload = db.progressUpload;

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
        console.log("outside",err);    })

};

module.exports.trainedFarmerDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err);    }
     

};
module.exports.trainedFarmerUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/trainedFarmer/trainedFarmerUpload', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
    }
     
    //  records:result

};

module.exports.trainedFarmerUploadFilter=async(req,res)=>{
    await trainedFarmerUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/trainedFarmer/trainedFarmerUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);     })

};

module.exports.trainedFarmerUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
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
        console.log(err); 
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
        console.log(err); 
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
        console.log(err); 
    }
     

};
module.exports.demonstrationInitialUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/demonstrationInitial/demonstrationInitialUpload', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

 module.exports.demonstrationInitialUploadFilter=async(req,res)=>{
    await demonstrationInitialUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/demonstrationInitial/demonstrationInitialUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err); 
    })

};

module.exports.demonstrationInitialUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
    }
     

};
//demonstrationInitialUpload controller end

//demonstrationFinal controller
module.exports.demonstrationFinal=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/demonstrationFinal/demonstrationFinal', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
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
        console.log(err); 
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
        console.log(err); 
    }
     

};
module.exports.demonstrationFinalUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/demonstrationFinal/demonstrationFinalUpload', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.demonstrationFinalUploadFilter=async(req,res)=>{
    await demonstrationFinalUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/demonstrationFinal/demonstrationFinalUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err); 
    })

};

module.exports.demonstrationFinalUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
    }
     

};
//demonstrationFinalUpload controller end

//expense controller
module.exports.expense=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/expense/expense', { title: 'হিসাব বিবরণী',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
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
        console.log(err); 
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
        console.log(err); 
    }
     

};
module.exports.expenseUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/expense/expenseUpload', { title: 'হিসাব বিবরণী',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.expenseUploadFilter=async(req,res)=>{
    await expenseUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/expense/expenseUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err); 
    })

};

module.exports.expenseUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
    }
     

};
//expenseUpload controller end

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
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
        console.log(err); 
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
        console.log(err); 
    }
     

};
module.exports.fieldDayUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/fieldDay/fieldDayUpload', { title: 'মাঠ দিবস',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.fieldDayUploadFilter=async(req,res)=>{
    await fieldDayUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/fieldDay/fieldDayUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err); 
    })

};

module.exports.fieldDayUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
    }
     

};
//fieldDayUpload controller end

//kormoshuchi controller
module.exports.kormoshuchi=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/kormoshuchi/kormoshuchi', { title: 'প্রশিক্ষণ কর্মসূচী',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
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
        console.log(err); 
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
        console.log(err); ;
    }
     

};
module.exports.kormoshuchiUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/kormoshuchi/kormoshuchiUpload', { title: 'প্রশিক্ষণ কর্মসূচী',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.kormoshuchiUploadFilter=async(req,res)=>{
    await kormoshuchiUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/kormoshuchi/kormoshuchiUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err); 
    })

};

module.exports.kormoshuchiUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); ;
    }
     

};
//kormoshuchiUpload controller end

//noa controller
module.exports.noa=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/noa/noa', { title: 'NOA সংক্রান্ত তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
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
        console.log(err); 
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
        console.log(err); 
    }
     

};
module.exports.noaUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/noa/noaUpload', { title: 'NOA সংক্রান্ত তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.noaUploadFilter=async(req,res)=>{
    await noaUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/noa/noaUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err); 
    })

};

module.exports.noaUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
    }
     

};
//noaUpload controller end

//progress controller
module.exports.progress=async(req,res)=>{
    try{
        var districts=await ad.findAll();
        console.log("inside");
        res.render('pd/progress/progress', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
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
        console.log(err); 
    })

};
module.exports.progressUpload=async(req,res)=>{
    try{
        var districts=await ad.findAll();
        console.log("inside");
        res.render('pd/progress/progressUpload', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.progressUploadFilter=async(req,res)=>{
    await progressUpload.findAll({ 
        where: {ad_id: req.body.district}
    })
    .then(data => {
        res.render('pd/progress/progressUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err); 
    })

};



//vermiCompostInitial controller
module.exports.vermiCompostInitial=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/vermiCompostInitial/vermiCompostInitial', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
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
        console.log(err);     })

};

module.exports.vermiCompostInitialDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
    }
     

};
module.exports.vermiCompostInitialUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/vermiCompostInitial/vermiCompostInitialUpload', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.vermiCompostInitialUploadFilter=async(req,res)=>{
    await vermiCompostInitialUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/vermiCompostInitial/vermiCompostInitialUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);     })

};

module.exports.vermiCompostInitialUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
    }
     

};
//vermiCompostInitialUpload controller end

//vermiCompostFinalUpload controller
module.exports.vermiCompostFinal=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/vermiCompostFinal/vermiCompostFinal', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.vermiCompostFinalFilter=async(req,res)=>{
    await vermiCompostFinal.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        console.log("data",data);
        res.render('pd/vermiCompostFinal/vermiCompostTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err)
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
        console.log(err); 
    }
     

};
module.exports.vermiCompostFinalUpload=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/vermiCompostFinal/vermiCompostFinalUpload', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log(err); 
    }
     
    //  records:result

};

module.exports.vermiCompostFinalUploadFilter=async(req,res)=>{
    await vermiCompostFinalUpload.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        console.log("data",data);
        res.render('pd/vermiCompostFinal/vermiCompostUploadTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err)
    })

};

module.exports.vermiCompostFinalUploadDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log(err); 
    }
     

};
//vermiCompostFinalUpload controller end