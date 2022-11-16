/* MONGO ----------------------------------------------------- */
import CartMongoDB from "../dbMongo/cruds/cartsMongoCRUD.js";
const cartMongo = new CartMongoDB();
import { userName, adminLicence } from '../middlewares/user.js';

/* GET Vista de todos los carritos -------------------------------- */
export const getAllCarts = async (req, res) => {
    res.render('../src/views/partials/carts.hbs', {user: userName, licence: adminLicence})
}

export const listAllCarts = async (req, res) => {
    let listado = await cartMongo.getAllCarts();
      
    if (adminLicence) {
        if (listado.length>0) {
            res.render('../src/views/partials/listadoCarts.hbs', { carts: listado, cartsExists: true, user: userName, licence: adminLicence})
        } else {
            res.render('../src/views/partials/listadoCarts.hbs', { carts: listado, cartsExists: false, user: userName, licence: adminLicence})
        }
    } else {
        let answerError = { error: -1, description: "Ruta no autorizada"};
        console.log("Error: " + answerError.error + ". " + answerError.description)   
        res.render('../src/views/partials/listadoCarts.hbs', { carts: listado, cartsExists: false, user: userName, licence: adminLicence})
    }
}

export const createNewCart = async (req, res) => {
    cartMongo.createCart(userName);
    res.redirect('/api/cart');
 }

export const deleteCartById = async (req, res) => {
    let id = parseInt(req.body.idCart);
    if (isNaN(id)){
        res.status(400).send({ error: 'El parámetro no es un número.'})    
    } else {
       cartMongo.deleteById(id, userName);
       res.redirect('/api/cart');
   }
}

export const listCartContent = async (req, res) => {
    let id = parseInt(req.body.idCart);
    let cart = [];
    let exists=false;
    let prodsCart=[];
     if (isNaN(id)){
         res.status(400).send({ error: 'El parámetro no es un número.'})    
     } else {
        let resp = await cartMongo.listById(id, userName);
        cart = resp.cartToBeListed;
        prodsCart=resp.prodsCart;
        exists=resp.exists;
                        
        /* Si el carrito existe y es del usuario, lo muestro */
        let access=true;
        if (exists) {
            if (cart.user === userName || userName === "admin") {
                res.render('../src/views/partials/cartContainer.hbs', { carts: cart, cartsExists: true, pExist: prodsCart, user: userName, licence: access})
            } else {
                access=false;
                res.render('../src/views/partials/cartContainer.hbs', { carts: [], cartsExists: false, pExist:false, user: userName, licence: adminLicence})
            }
        } else {
            console.log("El carrito no existe.");
            res.redirect('/api/cart');
        }
             
        
     }
}

export const includeProductById = async (req, res) => {
    /* FALTA INCLUIR CANTIDAD Y QUE AL AGREGAR MISMO ID SUME LA CANTIDAD. */
    const {idCart, id } = req.body;
    if (isNaN(idCart)){
        res.status(400).send({ error: 'El Id del carrito no es un número.'})    
    } else {
        if (isNaN(id)){
            res.status(400).send({ error: 'El Id del producto no es un número.'})    
        } else {
            await cartMongo.includeProductById(idCart, id, userName);
            res.redirect('/api/cart');
        }    
    }
}