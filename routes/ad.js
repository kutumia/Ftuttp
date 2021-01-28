const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {adsignup,adsignuppost,adlogin,adloginpost,adDashboard,
    trainedFarmer,trainedFarmerFilter,trainedFarmerDistrictFilter,
    demonstrationInitial,demonstrationInitialFilter,demonstrationInitialDistrictFilter,
    demonstrationFinal,demonstrationFinalFilter,demonstrationFinalDistrictFilter,
    vermiCompostInitial,vermiCompostInitialFilter,vermiCompostInitialDistrictFilter,
    vermiCompostFinal,vermiCompostFinalFilter,vermiCompostFinalDistrictFilter,
    expense,expenseFilter,expenseDistrictFilter,
    fieldDay,fieldDayFilter,fieldDayDistrictFilter,
    kormoshuchi,kormoshuchiFilter,kormoshuchiDistrictFilter,
    noa,noaFilter,noaDistrictFilter,
    progress,progressYear,progressForm,progressFormPost,
    progressFormEdit,progressDelete,progressFormEditPost} = require('../controllers/ad.controller');
    router.get('/login',adlogin);
    router.post('/logins',adloginpost);
    router.get('/dashboard',adDashboard);
    
    
    router.get('/signup',adsignup);
    router.post('/signups',adsignuppost);
    
    router.get('/trainedFarmer',trainedFarmer);
    router.post('/trainedFarmerFilter',trainedFarmerFilter);
    router.post('/trainedFarmerDistrictFilter',trainedFarmerDistrictFilter);
    
    router.get('/demonstrationInitial',demonstrationInitial);
    router.post('/demonstrationInitialFilter',demonstrationInitialFilter);
    router.post('/demonstrationInitialDistrictFilter',demonstrationInitialDistrictFilter);
    
    router.get('/demonstrationFinal',demonstrationFinal);
    router.post('/demonstrationFinalFilter',demonstrationFinalFilter);
    router.post('/demonstrationFinalDistrictFilter',demonstrationFinalDistrictFilter);
    
    
    router.get('/vermiCompostInitial',vermiCompostInitial);
    router.post('/vermiCompostInitialFilter',vermiCompostInitialFilter);
    router.post('/vermiCompostInitialDistrictFilter',vermiCompostInitialDistrictFilter);
    
    router.get('/vermiCompostFinal',vermiCompostFinal);
    router.post('/vermiCompostFinalFilter',vermiCompostFinalFilter);
    router.post('/vermiCompostFinalDistrictFilter',vermiCompostFinalDistrictFilter);
    
    
    router.get('/expense',expense);
    router.post('/expenseFilter',expenseFilter);
    router.post('/expenseDistrictFilter',expenseDistrictFilter);
    
    router.get('/fieldDay',fieldDay);
    router.post('/fieldDayFilter',fieldDayFilter);
    router.post('/fieldDayDistrictFilter',fieldDayDistrictFilter);
    
    router.get('/kormoshuchi',kormoshuchi);
    router.post('/kormoshuchiFilter',kormoshuchiFilter);
    router.post('/kormoshuchiDistrictFilter',kormoshuchiDistrictFilter);
    
    router.get('/noa',noa);
    router.post('/noaFilter',noaFilter);
    router.post('/noaDistrictFilter',noaDistrictFilter);
    
    router.get('/progress',progress);
    router.post('/progressYear',progressYear);
    router.get('/progressForm',progressForm);
    router.post('/progressFormPost',progressFormPost);
    router.get('/progressFormEdit/:id',progressFormEdit);
    router.post('/progressFormEditPost/:id',progressFormEditPost);
    router.get('/progressDelete/:id',progressDelete);

    
    




module.exports = router;