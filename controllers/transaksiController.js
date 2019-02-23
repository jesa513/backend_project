const conn = require('../database');
var fs = require('fs');
var { uploader } = require('../helpers/uploader');



module.exports = {

    cart: (req,res) => {

        var dataCart = {
            username: req.body.username,
            productId: req.body.productId,
            productname: req.body.productname,
            price: req.body.price,
            quantity: req.body.quantity
           
        }

        sql = `INSERT into cart SET ?`
        conn.query(sql,dataCart, (err1,results1) =>{
            if(err1) 
                throw err1
                // res.semd({status : 'error', message: 'System Error'});
             res.send(results1);
        }
        )
},

daftarcart: (req,res) => {
    var username = req.params.username;
    console.log(username)
    var sql = `SELECT * from cart where username = '${username}';`
    conn.query(sql, (err,results) =>{
        if(err) {
            console.log('error dari query')
            throw err
        }
        console.log(results)
        res.send(results)

        } 
       )
     },

datatransaksi: (req,res) => {

    var dttransaksi = {
        username: req.body.username,
        tglTransaksi: new Date(),
        //tglTransaksi: req.body.tglTransaksi,
        totalPrice: req.body.totalPrice,
        totalItem: req.body.totalItem
       
    }
            sql = `INSERT into datatransaksi SET ?`
            conn.query(sql,dttransaksi, (err2,results2) =>{
                if(err2) 
                throw err2
            // res.semd({status : 'error', message: 'System Error'});
                res.send(results2);

            sql = `select * from datatransaksi;`;
            conn.query(sql,(err3,results3) => {
                if(err3)
                throw err3
                res.send(results3);

              })
                
            }
        )
   },

   transaksiitem: (req,res) => {

    var transaction = {
        transaksiId: req.body.transaksiId,
        productId: req.body.productId,
        productname: req.body.productname,
        price: req.body.price,
        quantity: req.body.quantity
    }
            sql = `INSERT into transaksiitem SET ?`
            conn.query(sql,transaction, (err2,results2) =>{
                if(err2) 
                throw err2
            // res.semd({status : 'error', message: 'System Error'});
                res.send(results2);

            sql = `select * from datatransaksi;`;
            conn.query(sql,(err3,results3) => {
                if(err3)
                throw err3
                res.send(results3);

              })
                
            }
        )
   },

    hapusdaftarcart:(req,res) => {
        var id = req.params.id;
        var sql = `SELECT * from cart where id = ${id};`;

        conn.query(sql, (err, results) => {
            if(err) {
                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
            }
            if(results.length > 0) {
                sql = `DELETE * from cart where id = ${id};`;
                conn.query(sql, (err1,results1) => {
                    if(err1) 
                    throw err1
                    res.send(results1);
                })
            }

        } )
    }
}

