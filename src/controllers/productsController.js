import ProductMongoDB from "../dbMongo/cruds/productsMongoCRUD.js";
const productMongo = new ProductMongoDB();
import { userName, adminLicence, userState } from '../middlewares/user.js';

/* GET Vista de todos los productos -------------------------------- */
export const getAllProducts = async (req, res) => {
    try {
        let listado= await productMongo.getAll();
        if (listado.length>0) {
            res.render('../src/views/main.hbs', { prods: listado, productsExists: true, user: userName, userStatus: userState, licence: adminLicence})
        } else {
            res.render('../src/views/main.hbs', { prods: listado, productsExists: false, user: userName , userStatus: userState, licence: adminLicence})
        }
    } catch (error) {
        return res.status(404).json({
            error: `Error al obtener todos los productos${error}`
        });
    }
    
}

/* GET Vista de formularios para administrador o dueño del producto --------------------- */
export const editProducts = async (req, res) => {
    /* AGREGAR TRY CATCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    if (adminLicence) {
        res.render('../src/views/partials/formsAdmin.hbs', {user: userName, licence: adminLicence})
    } else {
        let answerError = { error: -1, description: "Ruta no autorizada"};
        console.log("Error: " + answerError.error + ". " + answerError.description)   
        res.render('../src/views/partials/formsAdmin.hbs', {user: userName, licence: adminLicence}) 
    }
}

export const deleteProductById = async (req, res) => {
    /* AGREGAR TRY CATCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    let id = req.body.id;
    let validateFields=true;
    if (id === "") {
       validateFields=false;
    }

    if (validateFields === true) {
        if (isNaN(id)){
            res.status(400).send({ error: 'El parámetro no es un número.'})    
        } else {
            productMongo.deleteById(id);
            res.redirect('/api/productos/edicionProductos');
        }
    } else {
       console.log("El campo ID debe estar completo.")   
    }
}

export const addNewProduct = async (req, res) => {
    /* AGREGAR TRY CATCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    const {title, description, code, thumbnail, price, stock} = req.body;
    let validateFields=true;
    if (title === "") {
        validateFields=false;
    }
    if (description === "") {
        validateFields=false;
    }
    if (code === "") {
        validateFields=false;
    }
    if (thumbnail === "") {
        validateFields=false;
    }
    if (price === "") {
        validateFields=false;
    }
    if (stock === "") {
        validateFields=false;
    }

    if (validateFields === true) {
        const prod = {title, description, code, thumbnail, price, stock};
        productMongo.save(prod);
        res.redirect('/api/productos/edicionProductos');    
    } else {
        console.log("Todos los campos deben estar completos.");    
    }
    req.body.reset;
 }

 export const showProductById = async (req, res) => { // devuelve un producto segùn su id 
    let id = req.params.id;
    let prod=[];
    if (isNaN(id)){
        res.status(400).send({ error: 'El parámetro no es un número.'})    
    } else {
        prod = await productMongo.getById(id);
        res.render('../src/views/partials/lookForId.hbs', { prod: prod, productsExists: true, user:userName, licence: adminLicence})
        
    }
}

export const updateProductById = async (req, res) => {
    const {id, newTitle, newDescription, newCode, newThumbnail, newPrice, newStock} = req.body;
    let validateFields=true;
    if (id === "") {
        validateFields=false;
    }

    if (validateFields === true) {
        const prod = {id, newTitle, newDescription, newCode, newThumbnail, newPrice, newStock};
        productMongo.updateById(prod);
        res.redirect('/api/productos/edicionProductos');
    } else {
        console.log("El campo ID debe estar completo.");
    }

}