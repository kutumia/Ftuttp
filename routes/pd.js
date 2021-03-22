const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {pdsignup,pdsignuppost,pdlogin,pdloginpost,pdDashboard,
    trainedFarmer,trainedFarmerFilter,trainedFarmerDistrictFilter,trainedFarmerUpload,trainedFarmerUploadFilter,trainedFarmerUploadDistrictFilter,
    demonstrationInitial,demonstrationInitialFilter,demonstrationInitialDistrictFilter,demonstrationInitialUpload,demonstrationInitialUploadFilter,demonstrationInitialUploadDistrictFilter,
    demonstrationFinal,demonstrationFinalFilter,demonstrationFinalDistrictFilter,demonstrationFinalUpload,demonstrationFinalUploadFilter,demonstrationFinalUploadDistrictFilter,
    vermiCompostInitial,vermiCompostInitialFilter,vermiCompostInitialDistrictFilter,vermiCompostInitialUpload,vermiCompostInitialUploadFilter,vermiCompostInitialUploadDistrictFilter,
    vermiCompostFinal,vermiCompostFinalFilter,vermiCompostFinalDistrictFilter,vermiCompostFinalUpload,vermiCompostFinalUploadFilter,vermiCompostFinalUploadDistrictFilter,
    expense,expenseFilter,expenseDistrictFilter,expenseUpload,expenseUploadFilter,expenseUploadDistrictFilter,
    fieldDay,fieldDayFilter,fieldDayDistrictFilter,fieldDayUpload,fieldDayUploadFilter,fieldDayUploadDistrictFilter,
    kormoshuchi,kormoshuchiFilter,kormoshuchiDistrictFilter,kormoshuchiUpload,kormoshuchiUploadFilter,kormoshuchiUploadDistrictFilter,
    noa,noaFilter,noaDistrictFilter,noaUpload,noaUploadFilter,noaUploadDistrictFilter,
    progress,progressFilter,progressUpload,progressUploadFilter,
} = require('../controllers/pd.controller');
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);


router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);
router.post('/trainedFarmerDistrictFilter',trainedFarmerDistrictFilter);
router.get('/trainedFarmerUpload',trainedFarmerUpload);
router.post('/trainedFarmerUploadFilter',trainedFarmerUploadFilter);
router.post('/trainedFarmerUploadDistrictFilter',trainedFarmerUploadDistrictFilter);

router.get('/demonstrationInitial',demonstrationInitial);
router.post('/demonstrationInitialFilter',demonstrationInitialFilter);
router.post('/demonstrationInitialDistrictFilter',demonstrationInitialDistrictFilter);
router.get('/demonstrationInitialUpload',demonstrationInitialUpload);
router.post('/demonstrationInitialUploadFilter',demonstrationInitialUploadFilter);
router.post('/demonstrationInitialUploadDistrictFilter',demonstrationInitialUploadDistrictFilter);

router.get('/demonstrationFinal',demonstrationFinal);
router.post('/demonstrationFinalFilter',demonstrationFinalFilter);
router.post('/demonstrationFinalDistrictFilter',demonstrationFinalDistrictFilter);
router.get('/demonstrationFinalUpload',demonstrationFinalUpload);
router.post('/demonstrationFinalUploadFilter',demonstrationFinalUploadFilter);
router.post('/demonstrationFinalUploadDistrictFilter',demonstrationFinalUploadDistrictFilter);


router.get('/vermiCompostInitial',vermiCompostInitial);
router.post('/vermiCompostInitialFilter',vermiCompostInitialFilter);
router.post('/vermiCompostInitialDistrictFilter',vermiCompostInitialDistrictFilter);
router.get('/vermiCompostInitialUpload',vermiCompostInitialUpload);
router.post('/vermiCompostInitialUploadFilter',vermiCompostInitialUploadFilter);
router.post('/vermiCompostInitialUploadDistrictFilter',vermiCompostInitialUploadDistrictFilter);


router.get('/vermiCompostFinal',vermiCompostFinal);
router.post('/vermiCompostFinalFilter',vermiCompostFinalFilter);
router.post('/vermiCompostFinalDistrictFilter',vermiCompostFinalDistrictFilter);
router.get('/vermiCompostFinalUpload',vermiCompostFinalUpload);
router.post('/vermiCompostFinalUploadFilter',vermiCompostFinalUploadFilter);
router.post('/vermiCompostFinalUploadDistrictFilter',vermiCompostFinalUploadDistrictFilter);


router.get('/expense',expense);
router.post('/expenseFilter',expenseFilter);
router.post('/expenseDistrictFilter',expenseDistrictFilter);
router.get('/expenseUpload',expenseUpload);
router.post('/expenseUploadFilter',expenseUploadFilter);
router.post('/expenseUploadDistrictFilter',expenseUploadDistrictFilter);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);
router.post('/fieldDayDistrictFilter',fieldDayDistrictFilter);
router.get('/fieldDayUpload',fieldDayUpload);
router.post('/fieldDayUploadFilter',fieldDayUploadFilter);
router.post('/fieldDayUploadDistrictFilter',fieldDayUploadDistrictFilter);

router.get('/kormoshuchi',kormoshuchi);
router.post('/kormoshuchiFilter',kormoshuchiFilter);
router.post('/kormoshuchiDistrictFilter',kormoshuchiDistrictFilter);
router.get('/kormoshuchiUpload',kormoshuchiUpload);
router.post('/kormoshuchiUploadFilter',kormoshuchiUploadFilter);
router.post('/kormoshuchiUploadDistrictFilter',kormoshuchiUploadDistrictFilter);

router.get('/noa',noa);
router.post('/noaFilter',noaFilter);
router.post('/noaDistrictFilter',noaDistrictFilter);
router.get('/noaUpload',noaUpload);
router.post('/noaUploadFilter',noaUploadFilter);
router.post('/noaUploadDistrictFilter',noaUploadDistrictFilter);

router.get('/progress',progress);
router.post('/progressFilter',progressFilter);
router.get('/progressUpload',progressUpload);
router.post('/progressUploadFilter',progressUploadFilter);


module.exports = router;