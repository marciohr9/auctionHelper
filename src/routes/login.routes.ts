import express from 'express';

const loginRouter = express.Router();

// LOGIN
loginRouter.route('/login')
    .post((req,res)=>{
        res.status(200).json({mensage: 'efetuar login'});
    })
    .get((req, res) => {
        res.status(200).json({mensage: 'get someting'});
    });
// NOVO USUARIO
loginRouter.post('/register', (req, res) => {
    try{
        const {email, password, bnetTag} = req.body
    }catch(err){
        res.status(501).json({mensage: 'erro inesperado.'});
    }
});
// RECUPERAR USER
loginRouter.post('/recover', (req,res)=>{
    res.status(200).json({mensage: 'email enviado!'});
});

export default loginRouter;