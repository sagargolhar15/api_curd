const express = require('express');
const router = express.Router();

const jwtvalidate=require('../middleware/auth')

const { postProduct, getProduct, getProductById, deleteProduct, updateProduct,login,saveRegister,access} = require('../controllers/productControllers')
const { body, validationResult } = require('express-validator');

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
        }
        return res.status(400).json({
            error: 1,
            errors: errors.array()
        })
    }
}

router.post('/product/add', postProduct)

router.get('/product/get', getProduct)
router.get("/product/getProductById/:id",getProductById)
router.delete("/product/delete/:id", deleteProduct)
router.put("/product/update/:id", updateProduct)

module.exports = router