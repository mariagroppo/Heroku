import express from 'express';
const routerAuth = express.Router();
import passport from 'passport';
import "../passport/local-auth.js";

/* LOGIN ----------------------------------------------------------------------------------------- */
routerAuth.get('/login', (req, res) => {
    /* if (req.isAuthenticated()) {
        res.redirect("/api/productos")
    } */
    res.render('../src/views/partials/loginForm.hbs', { userStatus: false})
})

routerAuth.post('/login', passport.authenticate('login', {
    successRedirect: '/api/productos',
    failureRedirect: '/api/auth/errorLogin',
    passReqToCallback: true
}))

routerAuth.get('/errorLogin', (req, res) => {
    res.render('../src/views/partials/errorLogin.hbs', { userStatus: false})
})

/* SIGN UP ----------------------------------------------------------------------------------------- */
routerAuth.get('/signup', (req, res) => {
    res.render('../src/views/partials/signUpForm.hbs', { userStatus: false})
})

routerAuth.post('/signup', passport.authenticate('signup', {
    successRedirect: '/api/auth/login',
    failureRedirect: '/api/auth/errorSignUp',
    passReqToCallback: true
}));

routerAuth.get('/errorSignUp', (req, res) => {
    res.render('../src/views/partials/errorSignUp.hbs', { userStatus: false})
})

/* LOG OUT  ----------------------------------------------------------------------------------------- */
/* router.get('/logout', async (req, res) => {
    let idUser = req.session.passport.user;
    let userName = await userMongo.showUserName(idUser);
    try {
        console.log("Hasta luego " + userName);
        req.session.destroy();
        res.render('../views/main.hbs', { userStatus: false})
    } catch (error) {
		res.send('Error: ', error);
	}
    
}); */
export default routerAuth;