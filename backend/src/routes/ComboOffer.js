const express = require('express');
const {
  addComboOffer,
  getComboOffers,
  deleteComboOffer,
} = require('../controller/ComboOffer');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/add-combo-offer', upload.single('image'), addComboOffer);
router.get('/all-combo-offers', getComboOffers);
router.delete('/delete-combo-offer/:id', deleteComboOffer);

module.exports = router;
