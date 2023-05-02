
const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
  const conn = await MongoClient.connect("mongodb+srv://savage:code01@cluster0.yvotxu2.mongodb.net/?retryWrites=true&w=majority");
  if(!conn) return new Error("Can't connect");
  global.db = await conn.db("workshop");
  return global.db;
}


exports.module = connect;