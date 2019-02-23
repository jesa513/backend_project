var Crypto = require('crypto');
var conn = require('../database');
var transporter = require('../helpers/pengirimemail');

module.exports = {
    register: (req,res) => {
        var {nama, perusahaan, alamat, telepon, email, username, password} = req.body;
        var sql = `select username from customer where username='${username}'`
        conn.query(sql, (err,results) => {
            if(err){
                throw err
            }
            if(results.length > 0) {
                res.send ({status: 'error', message: 'Username has been taken!'})
            }
            else {
                var hashPassword = Crypto.createHmac ( "sha256", "abc123").update(password).digest("hex")
                var dataUser = {
                    nama,
                    perusahaan,
                    alamat,
                    telepon,
                    username,
                    email,
                    password : hashPassword,
                    status: 'Unverified'
                }
    
                sql = `INSERT into customer SET ?`
                conn.query(sql,dataUser, (err1,results1) =>{
                    if(err1) {
                        throw err1
                        // res.semd({status : 'error', message: 'System Error'});
                        // res.end();
                    }
                    var linkVerification = `http://localhost:3000/verified?username=${username}&password=${hashPassword}`
                    var mailOptions = {
                        from : 'Go Office <jsetiadi512@gmail.com>',
                        to : email,
                        subject : 'Please verification your email',
                        html:`Please CLick link below for verification your email : <a href= "${linkVerification}">Verify Me</a>`
                    }
    
                    transporter.sendMail(mailOptions, (err2, res2) => {
                        if (err2) {
                            console.log(err2)
                            throw err2
                        }
                        else {
                            console.log('Success!')
                            res.send({ username, email, status:"Unverified"})
                        }
                    })
                })
            }
        })
    },

    verified:(req,res)=>{
        var {username, password} = req.body
        var sql = `SELECT * from customer 
                WHERE username='${username}'
                and password='${password}'`;
        conn.query(sql,(err,results) => {
            if(err) 
                throw err
                if(results.length > 0) {
                    sql = `UPDATE customer set status='Verified' WHERE id =${results[0].id}`;
                    conn.query(sql,(err1,results1) => {
                if(err1) throw err1;
                
                res.send({
                    username,
                    email: results[0].email,
                    role: results[0].role,
                    status: 'Verified',
                    
                })
                    })
                }
                else {
                    throw 'User not exist!'
                }
        })
    },

    signin:(req,res) => {
        var { username, password } = req.body;
        var hashPassword = Crypto.createHmac('sha256', 'abc123').update(password).digest('hex');
        var sql = `select * from customer where username='${username}' and password='${hashPassword}'`;
        conn.query(sql, (err,results)=> {
            if(err) throw err;
            // console.log(err)
            if (results.length > 0){
                console.log(results)
                // res.send(results)
                var dataLogin = { 
                    lastlogin: new Date()
                }
                sql = `update customer set ? where username='${username}' and password='${hashPassword}'`;
                conn.query(sql, dataLogin, (err1, res1) => {
                    if(err1) throw err1
                    console.log(res1)
                    console.log(results)
                    res.send(results)
                })
            }
            else {
                res.send ({status: 'error', message: 'Username or password invalid'})
            } 
        })
    },

    keepsignin: (req,res) => {
        var sql = `select username from customer where username='${req.body.username}';`
        conn.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results)
            res.send(results)
        })},


    admsignin: (req,res) => {
            var { admusername, password } = req.body;
            // var hashPassword = Crypto.createHmac('sha256', 'abc123').update(password).digest('hex');
            var sql = `select * from admin where admusername='${admusername}' and password='${password}'`;
            conn.query(sql, (err,results)=> {
                if(err) throw err;
                // console.log(err)
                if (results.length > 0){
                    console.log(results)
                    // res.send(results)
                    var dataLogin = { 
                        lastlogin: new Date()
                    }
                    sql = `update admin set ? where admusername='${admusername}' and password='${password}'`;
                    conn.query(sql, dataLogin, (err1, res1) => {
                        if(err1) throw err1
                        console.log(res1)
                        console.log(results)
                        res.send(results)
                    })
                }
                else {
                    res.send ({status: 'error', message: 'Username or password invalid'})
                } 
            })
        },

    admkeepsignin: (req,res) => {
            var sql = `select admusername from admin where admusername='${req.body.admusername}';`
            conn.query(sql, (err, results) => {
                if (err) throw err;
                console.log(results)
                res.send(results)
            })},

    }




 