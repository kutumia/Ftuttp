const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {pdsignup,pdsignuppost,pdlogin,pdloginpost,pdDashboard,
    trainedFarmer,trainedFarmerFilter,trainedFarmerDistrictFilter,
    demonstrationInitial,demonstrationInitialFilter,demonstrationInitialDistrictFilter,
    demonstrationFinal,demonstrationFinalFilter,demonstrationFinalDistrictFilter,
    vermiCompostInitial,vermiCompostInitialFilter,vermiCompostInitialDistrictFilter,
    vermiCompostFinal,vermiCompostFinalFilter,vermiCompostFinalDistrictFilter,
    expense,expenseFilter,expenseDistrictFilter,
    fieldDay,fieldDayFilter,fieldDayDistrictFilter,
    kormoshuchi,kormoshuchiFilter,kormoshuchiDistrictFilter,
    noa,noaFilter,noaDistrictFilter,
    progress,progressFilter,
} = require('../controllers/pd.controller');
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);


router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

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
router.post('/progressFilter',progressFilter);


module.exports = router;