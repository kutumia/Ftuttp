const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();
const {ddsignup,ddsignuppost,ddlogin,ddloginpost,ddDashboard,
    trainedFarmer,trainedFarmerFilter,demonstrationInitial,demonstrationInitialFilter,demonstrationFinal,demonstrationFinalFilter,
    vermiCompostInitial,vermiCompostInitialFilter,vermiCompostFinal,vermiCompostFinalFilter,
    expense,expenseFilter,fieldDay,fieldDayFilter,
    kormoshuchi,kormoshuchiFilter,noa,progress,progressFilter
    } = require('../controllers/dd.controller');
router.get('/login',ddlogin);
router.post('/logins',ddloginpost);
router.get('/dashboard',ddDashboard);


router.get('/signup',ddsignup);
router.post('/signups',ddsignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);

router.get('/demonstrationInitial',demonstrationInitial);
router.post('/demonstrationInitialFilter',demonstrationInitialFilter);

router.get('/demonstrationFinal',demonstrationFinal);
router.post('/demonstrationFinalFilter',demonstrationFinalFilter);

router.get('/vermiCompostInitial',vermiCompostInitial);
router.post('/vermiCompostInitialFilter',vermiCompostInitialFilter);

router.get('/vermiCompostFinal',vermiCompostFinal);
router.post('/vermiCompostFinalFilter',vermiCompostFinalFilter);

router.get('/expense',expense);
router.post('/expenseFilter',expenseFilter);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);

router.get('/kormoshuchi',kormoshuchi);
router.post('/kormoshuchiFilter',kormoshuchiFilter);

router.get('/noa',noa);

router.get('/progress',progress);
router.post('/progressFilter',progressFilter);




module.exports = router;