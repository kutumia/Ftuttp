const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;       
const upazilla = db.upazilla;
const trainedFarmer = db.trainedFarmer;
const expense = db.expense;
const fieldDay = db.fieldDay;
const demonstrationInitial = db.demonstrationInitial;       
const demonstrationFinal = db.demonstrationFinal;
const vermiCompostInitial = db.vermiCompostInitial;       
const vermiCompostFinal = db.vermiCompostFinal;
const kormoshuchi = db.kormoshuchi;
const noa = db.noa;
const progress = db.progress;

const multer = require("multer");
const path = require("path");

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');


module.exports.upazillalogin=async(req,res)=>{
    res.render('upazilla/login', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};
module.exports.upazillaloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        upazilla.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "upazilla";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/upazilla/dashboard');
                    }
                    else{
                        return res.status(200).render('upazilla/login', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('upazilla/login', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
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
module.exports.upazillaDashboard = async(req,res) => {
    console.log("upazilladashboard",res.locals.type);
    res.render('upazilla/dashboard', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.upazillasignup=async(req,res)=>{
    await dd.findAll()
    .then(data => {
        console.log("inside");
        res.render('upazilla/signup', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/signup', { title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'',records: err });
    })
};
module.exports.upazillasignuppost=async(req,res)=>{
    try {
        const{dds,uname,upazillas,password,confirmPassword}=req.body;
        const ddata=await dd.findAll();
        const data = await upazilla.findAll({ where: {uname: uname} });
        
        if(data.length > 0){
            res.render('upazilla/signup',{title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: The upazilla is already enrolled!',records: ddata})
        }
        else if(password !== confirmPassword){
           res.render('upazilla/signup',{title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: Passwords do not match!',records: ddata})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createupazilla = await upazilla.create({
                    uname: uname,
                    upazilla:upazillas,
                    password:hashedPassword,
                    dd_id:dds,
                    pd_id:1
                    })
                res.render('upazilla/signup',{title: 'উপজেলা পর্যায়ে প্রযুক্তি হস্তান্তরের জন্য কৃষক প্রশিক্ষণ (৩য় পর্যায়) প্রকল্প',msg:'upazilla Registered Successfully!',records: ddata})
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
    await trainedFarmer.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};
module.exports.trainedFarmerYear=async(req,res)=>{
    await trainedFarmer.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};
module.exports.trainedFarmerForm=async(req,res)=>{
    res.render('upazilla/trainedFarmer/trainedFarmerForm', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.trainedFarmerFormPost=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var village= req.body.village;
    var union= req.body.union;
    var mnum= req.body.mnum;
    var nid= req.body.nid;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await trainedFarmer.create({
        name: name,
        fname:fname,
        village:village,
        union:union,
        mnum:mnum,
        nid:nid,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/trainedFarmer');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.trainedFarmerEdit=async(req,res)=>{
    await trainedFarmer.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/trainedFarmer/trainedFarmerFormEdit', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/trainedFarmer/trainedFarmerFormEdit', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',records:err});
    })
};
module.exports.trainedFarmerFormEditPost=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var village= req.body.village;
    var union= req.body.union;
    var mnum= req.body.mnum;
    var nid= req.body.nid;
    var comment= req.body.comment;
    var user_id =req.body.user_id;

    await trainedFarmer.update({
        name: name,
        fname:fname,
        village:village,
        union:union,
        mnum:mnum,
        nid:nid,
        comment:comment,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/trainedFarmer');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.trainedFarmerDelete=async(req,res)=>{
    var trainedFarmerDelete = await trainedFarmer.findByPk(req.params.id);
    try {
        trainedFarmerDelete.destroy();
        res.redirect("/upazilla/trainedFarmer");
    }
    catch{
        res.render('errorpage',err);
    }
};
//trainedFarmer controller end

//expense controller
module.exports.expense=async(req,res)=>{
    await expense.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/expense/expense', { title: 'হিসাব বিবরণী ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/expense/expense', { title: 'হিসাব বিবরণী ফর্ম',success:'', records: err });
    })
     
    //  records:result

};
module.exports.expenseYear=async(req,res)=>{
    await expense.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/expense/expenseTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/expense/expenseYear', { title: 'হিসাব বিবরণী ফর্ম',success:'', records: err });
    })

};
module.exports.expenseForm=async(req,res)=>{
    res.render('upazilla/expense/expenseForm', { title: 'হিসাব বিবরণী ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.expenseFormPost=async(req,res)=>{
    var code= req.body.code;
    var khat= req.body.khat;
    var boraddo=parseInt(req.body.boraddo);
    var expenses=parseInt(req.body.expense);
    var comment= req.body.comment;
    var baki=boraddo-expenses;
    var year =req.body.year;
    var user_id =req.body.user_id;
    console.log("baki",baki);

    await expense.create({
        code: code,
        khat:khat,
        boraddo:boraddo,
        expense:expenses,
        comment:comment,
        baki:baki,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/expense');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.expenseFormEdit=async(req,res)=>{
    await expense.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/expense/expenseFormEdit', { title: 'হিসাব বিবরণী ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/expense/expenseFormEdit', { title: 'হিসাব বিবরণী ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.expenseFormEditPost=async(req,res)=>{
    var code= req.body.code;
    var khat= req.body.khat;
    var boraddo=parseInt(req.body.boraddo);
    var expenses=parseInt(req.body.expense);
    var comment= req.body.comment;
    var baki=boraddo-expenses;

    await expense.update({
        code: code,
        khat:khat,
        boraddo:boraddo,
        expense:expenses,
        comment:comment,
        baki:baki,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/expense');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.expenseDelete=async(req,res)=>{
    var expenseDelete = await expense.findByPk(req.params.id);
    try {
        expenseDelete.destroy();
        res.redirect("/upazilla/expense");
    }
    catch{
        res.render('errorpage',err);
    }
};
//expense controller end

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    await fieldDay.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', records: err });
    })
     
    //  records:result

};
module.exports.fieldDayYear=async(req,res)=>{
    await fieldDay.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/fieldDay/fieldDayYear', { title: 'মাঠ দিবস ফর্ম',success:'', records: err });
    })

};
module.exports.fieldDayForm=async(req,res)=>{
    res.render('upazilla/fieldDay/fieldDayForm', { title: 'মাঠ দিবস ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.fieldDayFormPost=async(req,res)=>{
    var crop= req.body.crop;
    var block= req.body.block;
    var date= req.body.date;
    var time=req.body.time;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await fieldDay.create({
        crop: crop,
        block:block,
        date:date,
        time:time,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/fieldDay');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.fieldDayFormEdit=async(req,res)=>{
    await fieldDay.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/fieldDay/fieldDayFormEdit', { title: 'মাঠ দিবস ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/fieldDay/fieldDayFormEdit', { title: 'মাঠ দিবস ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.fieldDayFormEditPost=async(req,res)=>{
    var crop= req.body.crop;
    var block= req.body.block;
    var date= req.body.date;
    var time=req.body.time;

    await fieldDay.update({
        crop: crop,
        block:block,
        date:date,
        time:time,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/fieldDay');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.fieldDayDelete=async(req,res)=>{
    var fieldDayDelete = await fieldDay.findByPk(req.params.id);
    try {
        fieldDayDelete.destroy();
        res.redirect("/upazilla/fieldDay");
    }
    catch{
        res.render('errorpage',err);
    }
};
//fieldDay controller end

//demonstrationInitial controller
module.exports.demonstrationInitial=async(req,res)=>{
    await demonstrationInitial.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/demonstrationInitial/demonstrationInitial', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/demonstrationInitial/demonstrationInitial', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};
module.exports.demonstrationInitialYear=async(req,res)=>{
    await demonstrationInitial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/demonstrationInitial/demonstrationInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/demonstrationInitial/demonstrationInitialYear', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন ফর্ম',success:'', records: err });
    })

};
module.exports.demonstrationInitialForm=async(req,res)=>{
    res.render('upazilla/demonstrationInitial/demonstrationInitialForm', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.demonstrationInitialFormPost=async(req,res)=>{
    var name= req.body.name;
    var nid= req.body.nid;
    var saao= req.body.saao;
    var supply=req.body.supply;
    var date= req.body.date;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await demonstrationInitial.create({
        name: name,
        nid:nid,
        saao:saao,
        supply:supply,
        date: date,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/demonstrationInitial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.demonstrationInitialFormEdit=async(req,res)=>{
    await demonstrationInitial.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/demonstrationInitial/demonstrationInitialFormEdit', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/demonstrationInitial/demonstrationInitialFormEdit', { title: 'প্রদর্শনীর (দানাদার ধরণের) প্রাথমিক প্রতিবেদন ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.demonstrationInitialFormEditPost=async(req,res)=>{
    var name= req.body.name;
    var nid= req.body.nid;
    var saao= req.body.saao;
    var supply=req.body.supply;
    var date= req.body.date;
    var comment= req.body.comment;

    await demonstrationInitial.update({
        name: name,
        nid:nid,
        saao:saao,
        supply:supply,
        date: date,
        comment:comment,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/demonstrationInitial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.demonstrationInitialDelete=async(req,res)=>{
    var demonstrationInitialDelete = await demonstrationInitial.findByPk(req.params.id);
    try {
        demonstrationInitialDelete.destroy();
        res.redirect("/upazilla/demonstrationInitial");
    }
    catch{
        res.render('errorpage',err);
    }
};
//demonstrationInitial controller end

//demonstrationFinal controller
module.exports.demonstrationFinal=async(req,res)=>{
    await demonstrationFinal.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/demonstrationFinal/demonstrationFinal', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/demonstrationFinal/demonstrationFinal', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};
module.exports.demonstrationFinalYear=async(req,res)=>{
    await demonstrationFinal.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/demonstrationFinal/demonstrationFinalTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/demonstrationFinal/demonstrationFinalYear', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন ফর্ম',success:'', records: err });
    })

};
module.exports.demonstrationFinalForm=async(req,res)=>{
    res.render('upazilla/demonstrationFinal/demonstrationFinalForm', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.demonstrationFinalFormPost=async(req,res)=>{
    var name= req.body.name;
    var mobile= req.body.mobile;
    var breed= req.body.breed;
    var bdate=req.body.bdate;
    var kdate= req.body.kdate;
    var folon= req.body.folon;
    var bij= req.body.bij;
    var comment=req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await demonstrationFinal.create({
        name: name,
        mobile:mobile,
        breed:breed,
        bdate:bdate,
        kdate: kdate,
        folon:folon,
        bij:bij,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/demonstrationFinal');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.demonstrationFinalFormEdit=async(req,res)=>{
    await demonstrationFinal.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/demonstrationFinal/demonstrationFinalFormEdit', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/demonstrationFinal/demonstrationFinalFormEdit', { title: 'প্রদর্শনীর (দানাদার ধরণের) চূড়ান্ত প্রতিবেদন ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.demonstrationFinalFormEditPost=async(req,res)=>{
    var name= req.body.name;
    var mobile= req.body.mobile;
    var breed= req.body.breed;
    var bdate=req.body.bdate;
    var kdate= req.body.kdate;
    var folon= req.body.folon;
    var bij= req.body.bij;
    var comment=req.body.comment;

    await demonstrationFinal.update({
        name: name,
        mobile:mobile,
        breed:breed,
        bdate:bdate,
        kdate: kdate,
        folon:folon,
        bij:bij,
        comment:comment,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/demonstrationFinal');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.demonstrationFinalDelete=async(req,res)=>{
    var demonstrationFinalDelete = await demonstrationFinal.findByPk(req.params.id);
    try {
        demonstrationFinalDelete.destroy();
        res.redirect("/upazilla/demonstrationFinal");
    }
    catch{
        res.render('errorpage',err);
    }
};
//demonstrationFinal controller end

//kormoshuchi controller
module.exports.kormoshuchi=async(req,res)=>{
    await kormoshuchi.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/kormoshuchi/kormoshuchi', { title: 'প্রশিক্ষণ কর্মসূচী',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/kormoshuchi/kormoshuchi', { title: 'প্রশিক্ষণ কর্মসূচী',success:'', records: err });
    })
     
    //  records:result

};
module.exports.kormoshuchiYear=async(req,res)=>{
    await kormoshuchi.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/kormoshuchi/kormoshuchiTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/kormoshuchi/kormoshuchiYear', { title: 'প্রশিক্ষণ কর্মসূচী ফর্ম',success:'', records: err });
    })

};
module.exports.kormoshuchiForm=async(req,res)=>{
    res.render('upazilla/kormoshuchi/kormoshuchiForm', { title: 'প্রশিক্ষণ কর্মসূচী ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.kormoshuchiFormPost=async(req,res)=>{
    var batch= req.body.batch;
    var time= req.body.time;
    var topic= req.body.topic;
    var teacher=req.body.teacher;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await kormoshuchi.create({
        batch: batch,
        time:time,
        topic:topic,
        teacher:teacher,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/kormoshuchi');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.kormoshuchiFormEdit=async(req,res)=>{
    await kormoshuchi.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/kormoshuchi/kormoshuchiFormEdit', { title: 'প্রশিক্ষণ কর্মসূচী ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/kormoshuchi/kormoshuchiFormEdit', { title: 'প্রশিক্ষণ কর্মসূচী ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.kormoshuchiFormEditPost=async(req,res)=>{
    var batch= req.body.batch;
    var time= req.body.time;
    var topic= req.body.topic;
    var teacher=req.body.teacher;

    await kormoshuchi.update({
        batch: batch,
        time:time,
        topic:topic,
        teacher:teacher,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/kormoshuchi');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.kormoshuchiDelete=async(req,res)=>{
    var kormoshuchiDelete = await kormoshuchi.findByPk(req.params.id);
    try {
        kormoshuchiDelete.destroy();
        res.redirect("/upazilla/kormoshuchi");
    }
    catch{
        res.render('errorpage',err);
    }
};
//kormoshuchi controller end

//noa controller
module.exports.noa=async(req,res)=>{
    await noa.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/noa/noa', { title: 'NOA সংক্রান্ত তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/noa/noa', { title: 'NOA সংক্রান্ত তথ্য',success:'', records: err });
    })
     
    //  records:result

};
module.exports.noaYear=async(req,res)=>{
    await noa.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/noa/noaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/noa/noaYear', { title: 'NOA সংক্রান্ত তথ্য ফর্ম',success:'', records: err });
    })

};
module.exports.noaForm=async(req,res)=>{
    res.render('upazilla/noa/noaForm', { title: 'NOA সংক্রান্ত তথ্য ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.noaFormPost=async(req,res)=>{
    var center= req.body.center;
    var karjadeshDate= req.body.karjadeshDate;
    var karjadeshName= req.body.karjadeshName;
    var value=req.body.value;
    var progress= req.body.progress;
    var time= req.body.time;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await noa.create({
        center: center,
        karjadeshDate:karjadeshDate,
        karjadeshName:karjadeshName,
        value:value,
        progress: progress,
        time:time,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/noa');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.noaFormEdit=async(req,res)=>{
    await noa.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/noa/noaFormEdit', { title: 'NOA সংক্রান্ত তথ্য ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/noa/noaFormEdit', { title: 'NOA সংক্রান্ত তথ্য ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.noaFormEditPost=async(req,res)=>{
    var center= req.body.center;
    var karjadeshDate= req.body.karjadeshDate;
    var karjadeshName= req.body.karjadeshName;
    var value=req.body.value;
    var progress= req.body.progress;
    var time= req.body.time;

    await noa.update({
        center: center,
        karjadeshDate:karjadeshDate,
        karjadeshName:karjadeshName,
        value:value,
        progress: progress,
        time:time,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/noa');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.noaDelete=async(req,res)=>{
    var noaDelete = await noa.findByPk(req.params.id);
    try {
        noaDelete.destroy();
        res.redirect("/upazilla/noa");
    }
    catch{
        res.render('errorpage',err);
    }
};
//noa controller end

//progress controller
module.exports.progress=async(req,res)=>{
    await progress.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/progress/progress', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/progress/progress', { title: 'চলমান কার্যক্রমের অগ্রগতি',success:'', records: err });
    })
     
    //  records:result

};
module.exports.progressYear=async(req,res)=>{
    await progress.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/progress/progressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/progress/progressYear', { title: 'চলমান কার্যক্রমের অগ্রগতি ফর্ম',success:'', records: err });
    })

};
module.exports.progressForm=async(req,res)=>{
    res.render('upazilla/progress/progressForm', { title: 'চলমান কার্যক্রমের অগ্রগতি ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.progressFormPost=async(req,res)=>{
    var nirmanPresent= req.body.nirmanPresent;
    var nirmanComment= req.body.nirmanComment;
    var proshikkhonPresent= req.body.proshikkhonPresent;
    var proshikkhonComment=req.body.proshikkhonComment;
    var prodorshoniPresent= req.body.prodorshoniPresent;
    var prodorshoniComment= req.body.prodorshoniComment;
    var car=req.body.car;
    var user_id =req.body.user_id;

    await progress.create({
        nirmanPresent: nirmanPresent,
        nirmanComment:nirmanComment,
        proshikkhonPresent:proshikkhonPresent,
        proshikkhonComment:proshikkhonComment,
        prodorshoniPresent:prodorshoniPresent,
        prodorshoniComment:prodorshoniComment,
        car:car,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/progress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.progressFormEdit=async(req,res)=>{
    await progress.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/progress/progressFormEdit', { title: 'চলমান কার্যক্রমের অগ্রগতি ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/progress/progressFormEdit', { title: 'চলমান কার্যক্রমের অগ্রগতি ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.progressFormEditPost=async(req,res)=>{
    var nirmanPresent= req.body.nirmanPresent;
    var nirmanComment= req.body.nirmanComment;
    var proshikkhonPresent= req.body.proshikkhonPresent;
    var proshikkhonComment= req.body.proshikkhonComment;
    var prodorshoniPresent= req.body.prodorshoniPresent;
    var prodorshoniComment= req.body.prodorshoniComment;
    var car=req.body.car;

    await progress.update({
        nirmanPresent: nirmanPresent,
        nirmanComment:nirmanComment,
        proshikkhonPresent:proshikkhonPresent,
        proshikkhonComment: proshikkhonComment,
        prodorshoniPresent:prodorshoniPresent,
        prodorshoniComment:prodorshoniComment,
        car:car,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/progress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.progressDelete=async(req,res)=>{
    var progressDelete = await progress.findByPk(req.params.id);
    try {
        progressDelete.destroy();
        res.redirect("/upazilla/progress");
    }
    catch{
        res.render('errorpage',err);
    }
};
//progress controller end

//vermiCompostInitial controller
module.exports.vermiCompostInitial=async(req,res)=>{
    await vermiCompostInitial.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/vermiCompostInitial/vermiCompostInitial', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/vermiCompostInitial/vermiCompostInitial', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};
module.exports.vermiCompostInitialYear=async(req,res)=>{
    await vermiCompostInitial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/vermiCompostInitial/vermiCompostInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};
module.exports.vermiCompostInitialForm=async(req,res)=>{
    res.render('upazilla/vermiCompostInitial/vermiCompostInitialForm', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.vermiCompostInitialFormPost=async(req,res)=>{
    var name= req.body.name;
    var nid= req.body.nid;
    var saao= req.body.saao;
    var supply=req.body.supply;
    var date= req.body.date;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await vermiCompostInitial.create({
        name: name,
        nid:nid,
        saao:saao,
        supply:supply,
        date: date,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/vermiCompostInitial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.vermiCompostInitialFormEdit=async(req,res)=>{
    await vermiCompostInitial.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/vermiCompostInitial/vermiCompostInitialFormEdit', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/vermiCompostInitial/vermiCompostInitialFormEdit', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) প্রাথমিক প্রতিবেদন ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.vermiCompostInitialFormEditPost=async(req,res)=>{
    var name= req.body.name;
    var nid= req.body.nid;
    var saao= req.body.saao;
    var supply=req.body.supply;
    var date= req.body.date;
    var comment= req.body.comment;

    await vermiCompostInitial.update({
        name: name,
        nid:nid,
        saao:saao,
        supply:supply,
        date: date,
        comment:comment,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/vermiCompostInitial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.vermiCompostInitialDelete=async(req,res)=>{
    var vermiCompostInitialDelete = await vermiCompostInitial.findByPk(req.params.id);
    try {
        vermiCompostInitialDelete.destroy();
        res.redirect("/upazilla/vermiCompostInitial");
    }
    catch{
        res.render('errorpage',err);
    }
};
//vermiCompostInitial controller end

//vermiCompostFinal controller
module.exports.vermiCompostFinal=async(req,res)=>{
    await vermiCompostFinal.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/vermiCompostFinal/vermiCompostFinal', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/vermiCompostFinal/vermiCompostFinal', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};
module.exports.vermiCompostFinalYear=async(req,res)=>{
    await vermiCompostFinal.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/vermiCompostFinal/vermiCompostFinalTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};
module.exports.vermiCompostFinalForm=async(req,res)=>{
    res.render('upazilla/vermiCompostFinal/vermiCompostFinalForm', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.vermiCompostFinalFormPost=async(req,res)=>{
    var name= req.body.name;
    var mobile= req.body.mobile;
    var breed= req.body.breed;
    var bdate=req.body.bdate;
    var kdate= req.body.kdate;
    var folon= req.body.folon;
    var bij= req.body.bij;
    var comment=req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await vermiCompostFinal.create({
        name: name,
        mobile:mobile,
        breed:breed,
        bdate:bdate,
        kdate: kdate,
        folon:folon,
        bij:bij,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/vermiCompostFinal');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.vermiCompostFinalFormEdit=async(req,res)=>{
    await vermiCompostFinal.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/vermiCompostFinal/vermiCompostFinalFormEdit', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন ফর্ম',msg:'' ,success:'',records:data,upazilla_id: req.session.user_id});
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/vermiCompostFinal/vermiCompostFinalFormEdit', { title: 'প্রদর্শনীর (ভার্মি কম্পোস্ট) চূড়ান্ত প্রতিবেদন ফর্ম',msg:'' ,success:'',records:err});
    })
};
module.exports.vermiCompostFinalFormEditPost=async(req,res)=>{
    var name= req.body.name;
    var mobile= req.body.mobile;
    var breed= req.body.breed;
    var bdate=req.body.bdate;
    var kdate= req.body.kdate;
    var folon= req.body.folon;
    var bij= req.body.bij;
    var comment=req.body.comment;

    await vermiCompostFinal.update({
        name: name,
        mobile:mobile,
        breed:breed,
        bdate:bdate,
        kdate: kdate,
        folon:folon,
        bij:bij,
        comment:comment,
    },
    {
        where: {id: req.params.id}
    })
       .then(data => {
            res.redirect('/upazilla/vermiCompostFinal');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.vermiCompostFinalDelete=async(req,res)=>{
    var vermiCompostFinalDelete = await vermiCompostFinal.findByPk(req.params.id);
    try {
        vermiCompostFinalDelete.destroy();
        res.redirect("/upazilla/vermiCompostFinal");
    }
    catch{
        res.render('errorpage',err);
    }
};
//vermiCompostFinal controller end