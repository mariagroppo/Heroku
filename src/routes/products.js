import express from 'express';
const router = express.Router();

/* El usuario tiene acceso a la lista de productos unicamente.
El admin puede, además, acceder a la sección "Edición de productos". */

import { getAllProducts, deleteProductById, editProducts, addNewProduct, showProductById, updateProductById } from "../controllers/productsController.js"
router.get('/', getAllProducts)  //Vista de todos los productos 
router.get('/edicionProductos', editProducts); // Vista de formularios para administrador o dueño del producto
router.post('/edicionProductos', addNewProduct); // Agrega nuevo producto
router.post('/delete', deleteProductById); //Elimina un producto segùn su id
router.get('/:id', showProductById);// devuelve un producto segùn su id 
router.post('/update', updateProductById); //  recibe y actualizA UN producto segun su id.

export default router;