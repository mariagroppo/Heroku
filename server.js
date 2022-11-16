import express from 'express';
export const app = express();
import passport from 'passport';

/* ROUTERS ----------------------------------------------------------------------------------- */
import router from './src/routes/products.js';
import routerCart from './src/routes/cart.js';
import routerAuth from "./src/routes/routerAuth.js";
app.use('/productos', router);
app.use('/api/cart', routerCart);
app.use('/api/auth', routerAuth);
app.use(express.static("src/public"));

/* SESSION --------------------------------------------------------------------------------------- */
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true};

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://mariagroppo:ctNZIOUDTyQzX680@cluster0.dud6uob.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: advancedOptions,
        ttl: 60,
        collectionName: 'sessions'
    }),
    secret: 'secret',
    /* Resave true es para que se guarde cada cierto tiempo */
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000000 }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

/* SERVIDOR ------------------------------------------------------------------------------------  */
const puerto = process.env.PORT || 8080;
const server = app.listen(puerto, () => {console.log(`servidor escuchando en http://localhost:${puerto}`);});
server.on('error', error => {console.log('error en el servidor:', error);});
export default server;

/* CONEXION CON MONGODB ----------------------------------------------------------------------- */
import { connection } from "./src/dbMongo/config.js";
connection();

/* CONFIGURACION DE HANDLEBARS ----------------------------------------------------------- */
import { engine } from 'express-handlebars';
app.engine('hbs', engine( {
    extname: '.hbs', // Extensión a utilizar
    defaultLayout: 'index.hbs', // Plantilla principal
    layoutsDir: 'src/views/layouts', // Ruta de la plantilla principal
    partialsDir: 'src/views/partials' // Ruta de las plantillas parciales
} ));
app.set('view engine', 'hbs');