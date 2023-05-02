


const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
  const conn = await MongoClient.connect("mongodb+srv://savage:code01@cluster0.yvotxu2.mongodb.net/?retryWrites=true&w=majority");
  if(!conn) return new Error("Can't connect");
  global.db = await conn.db("unifor");
  return global.db;
}



const express = require('express');

const app = express()
const connection = require('./database/database')
const router = express.Router();


app.use(express.urlencoded({ extended: true })); 
app.use(express.json());



router.get('/teste',(req,res)=>{
    res.json({message: 'Funcionando'})
})

app.use('/', router);


router.post('/aluno', async function(req,res,next){

    try{
        const aluno = req.body;
        const db = await connect();

        res.json(await db.collection("alunos").insertOne(aluno))
    }catch(ex){
        console.log(ex)
        res.json({erro: `${ex}`}).status(400)
    }

})


router.get('/aluno/:id?', async (req,res,next)=>{
    

    try {
        const db = await connect();
        var id = req.params.id;
        if(id){
            res.json(await db.collection("alunos").findOne({_id: new ObjectId(id)}))
        } else{
            res.json(await db.collection("alunos").find().toArray())
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/aluno/:id',  async (req,res,next)=>{
    try {
        const aluno = req.body;
        var id = req.params.id;
        const db = await connect();
         res.json(await db.collection("alunos").updateOne({_id: new ObjectId(id)}, {$set: aluno}  ))
    } catch (error) {
        console.log(ex)
        res.json({erro: `${ex}`}).status(400)
    }
       
})

router.delete('/aluno/:id', async (req,res,next)=>{
    var id = req.params.id;
    
        const db = await connect();
         res.json(await db.collection("alunos").deleteOne({_id: new ObjectId(id)} ))
})


app.listen('3333', ()=>{
console.log('Conectado')
})