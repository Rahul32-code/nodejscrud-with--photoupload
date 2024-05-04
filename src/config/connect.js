import mysql  from "mysql";

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testing'
})

con.getConnection((err) => {
    if(err) throw err;
    console.log("success");
})

export default con;