const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {upazillasignup,upazillasignuppost,upazillalogin,upazillaloginpost,upazillaDashboard,
    trainedFarmer,trainedFarmerYear,trainedFarmerForm,trainedFarmerFormPost,
    trainedFarmerEdit,trainedFarmerDelete,trainedFarmerFormEditPost,
    expense,expenseYear,expenseForm,expenseFormPost,
    expenseFormEdit,expenseDelete,expenseFormEditPost,
    fieldDay,fieldDayYear,fieldDayForm,fieldDayFormPost,
    fieldDayFormEdit,fieldDayDelete,fieldDayFormEditPost,
    demonstrationInitial,demonstrationInitialYear,demonstrationInitialForm,demonstrationInitialFormPost,
    demonstrationInitialFormEdit,demonstrationInitialDelete,demonstrationInitialFormEditPost,
    demonstrationFinal,demonstrationFinalYear,demonstrationFinalForm,demonstrationFinalFormPost,
    demonstrationFinalFormEdit,demonstrationFinalDelete,demonstrationFinalFormEditPost,
    vermiCompostInitial,vermiCompostInitialYear,vermiCompostInitialForm,vermiCompostInitialFormPost,
    vermiCompostInitialFormEdit,vermiCompostInitialDelete,vermiCompostInitialFormEditPost,
    vermiCompostFinal,vermiCompostFinalYear,vermiCompostFinalForm,vermiCompostFinalFormPost,
    vermiCompostFinalFormEdit,vermiCompostFinalDelete,vermiCompostFinalFormEditPost,
    kormoshuchi,kormoshuchiYear,kormoshuchiForm,kormoshuchiFormPost,
    kormoshuchiFormEdit,kormoshuchiDelete,kormoshuchiFormEditPost,
    noa,noaYear,noaForm,noaFormPost,
    noaFormEdit,noaDelete,noaFormEditPost,
    progress,progressYear,progressForm,progressFormPost,
    progressFormEdit,progressDelete,progressFormEditPost} = require('../controllers/upazilla.controller');

router.get('/login',upazillalogin);
router.post('/logins',upazillaloginpost);
router.get('/dashboard',upazillaDashboard);

router.get('/signup',upazillasignup);
router.post('/signups',upazillasignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerYear',trainedFarmerYear);
router.get('/trainedFarmerForm',trainedFarmerForm);
router.post('/trainedFarmerFormPost',trainedFarmerFormPost);
router.get('/trainedFarmerEdit/:id',trainedFarmerEdit);
router.post('/trainedFarmerFormEditPost/:id',trainedFarmerFormEditPost);
router.get('/trainedFarmerDelete/:id',trainedFarmerDelete);

router.get('/expense',expense);
router.post('/expenseYear',expenseYear);
router.get('/expenseForm',expenseForm);
router.post('/expenseFormPost',expenseFormPost);
router.get('/expenseFormEdit/:id',expenseFormEdit);
router.post('/expenseFormEditPost/:id',expenseFormEditPost);
router.get('/expenseDelete/:id',expenseDelete);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayYear',fieldDayYear);
router.get('/fieldDayForm',fieldDayForm);
router.post('/fieldDayFormPost',fieldDayFormPost);
router.get('/fieldDayFormEdit/:id',fieldDayFormEdit);
router.post('/fieldDayFormEditPost/:id',fieldDayFormEditPost);
router.get('/fieldDayDelete/:id',fieldDayDelete);

router.get('/demonstrationInitial',demonstrationInitial);
router.post('/demonstrationInitialYear',demonstrationInitialYear);
router.get('/demonstrationInitialForm',demonstrationInitialForm);
router.post('/demonstrationInitialFormPost',demonstrationInitialFormPost);
router.get('/demonstrationInitialFormEdit/:id',demonstrationInitialFormEdit);
router.post('/demonstrationInitialFormEditPost/:id',demonstrationInitialFormEditPost);
router.get('/demonstrationInitialDelete/:id',demonstrationInitialDelete);

router.get('/demonstrationFinal',demonstrationFinal);
router.post('/demonstrationFinalYear',demonstrationFinalYear);
router.get('/demonstrationFinalForm',demonstrationFinalForm);
router.post('/demonstrationFinalFormPost',demonstrationFinalFormPost);
router.get('/demonstrationFinalFormEdit/:id',demonstrationFinalFormEdit);
router.post('/demonstrationFinalFormEditPost/:id',demonstrationFinalFormEditPost);
router.get('/demonstrationFinalDelete/:id',demonstrationFinalDelete);

router.get('/vermiCompostInitial',vermiCompostInitial);
router.post('/vermiCompostInitialYear',vermiCompostInitialYear);
router.get('/vermiCompostInitialForm',vermiCompostInitialForm);
router.post('/vermiCompostInitialFormPost',vermiCompostInitialFormPost);
router.get('/vermiCompostInitialFormEdit/:id',vermiCompostInitialFormEdit);
router.post('/vermiCompostInitialFormEditPost/:id',vermiCompostInitialFormEditPost);
router.get('/vermiCompostInitialDelete/:id',vermiCompostInitialDelete);

router.get('/vermiCompostFinal',vermiCompostFinal);
router.post('/vermiCompostFinalYear',vermiCompostFinalYear);
router.get('/vermiCompostFinalForm',vermiCompostFinalForm);
router.post('/vermiCompostFinalFormPost',vermiCompostFinalFormPost);
router.get('/vermiCompostFinalFormEdit/:id',vermiCompostFinalFormEdit);
router.post('/vermiCompostFinalFormEditPost/:id',vermiCompostFinalFormEditPost);
router.get('/vermiCompostFinalDelete/:id',vermiCompostFinalDelete);

router.get('/kormoshuchi',kormoshuchi);
router.post('/kormoshuchiYear',kormoshuchiYear);
router.get('/kormoshuchiForm',kormoshuchiForm);
router.post('/kormoshuchiFormPost',kormoshuchiFormPost);
router.get('/kormoshuchiFormEdit/:id',kormoshuchiFormEdit);
router.post('/kormoshuchiFormEditPost/:id',kormoshuchiFormEditPost);
router.get('/kormoshuchiDelete/:id',kormoshuchiDelete);

router.get('/noa',noa);
router.post('/noaYear',noaYear);
router.get('/noaForm',noaForm);
router.post('/noaFormPost',noaFormPost);
router.get('/noaFormEdit/:id',noaFormEdit);
router.post('/noaFormEditPost/:id',noaFormEditPost);
router.get('/noaDelete/:id',noaDelete);

router.get('/progress',progress);
router.post('/progressYear',progressYear);
router.get('/progressForm',progressForm);
router.post('/progressFormPost',progressFormPost);
router.get('/progressFormEdit/:id',progressFormEdit);
router.post('/progressFormEditPost/:id',progressFormEditPost);
router.get('/progressDelete/:id',progressDelete);

module.exports = router;