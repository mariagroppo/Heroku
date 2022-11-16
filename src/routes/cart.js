import express from 'express';
const routerCart = express.Router();

/* El cliente puede acceder a la sección "Carrito" y:
 1. Crear un nuevo carrito.
 2. Borrar carrito (siempre y cuando le pertenezca).
 3. Ver el contenido de un carrito (siempre y cuando le pertenezca).
 4. Incluir productos a un carrito (siempre y cuando le pertenezca).
NO puede acceder a la sección "Listado de carritos".
 El admin puede hacer todo. */

import { getAllCarts, listAllCarts, createNewCart, deleteCartById, listCartContent, includeProductById } from "../controllers/cartControllers.js";
routerCart.get('/', getAllCarts) //Vista de tableros de control de carritos
routerCart.get('/listado', listAllCarts); // Listado de carritos creados
routerCart.post('/', createNewCart); // Crea nuevo carrito
routerCart.post('/delete', deleteCartById); //Elimina un carrito segùn su id
routerCart.post('/list', listCartContent); //Muestra contenido de carrito por ID. 
routerCart.post('/include', includeProductById); //Incluye productos por ID

export default routerCart;