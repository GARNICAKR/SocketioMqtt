const mysql=require("mysql");
const {promisify}=require("util");
const {database}=require("./keys")

const pool =mysql.createPool(database);
pool.getConnection((err,connection)=>{
    if(err){
        if(err==='PROTOCOL_CONNECTION_LOST'){
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if(err==='ER_CON_COUNT_ERROR'){
            console.error("DATABASE HAS TO MANY CONNECTIONS");
        }
        if(err==="ECONNREFUSED"){
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
    }else if (connection){ 
        connection.release();
        console.log('DB is Connected');
    }
    return;
});
pool.query=promisify(pool.query);
module.exports=pool;