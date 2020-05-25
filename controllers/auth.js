const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);
    
    const { name, email, password, phno, clg, city, state, country } = req.body;
    
    
    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, results =>
        {
         if(error){
            console.log(error);
         } 
         if(results.length > 0){
            return res.render('register', {
                message: 'The email is already in use!'
            })
         }

         let hashedPassword = await bcrypt.hash(password, 8);
         console.log(hashedPassword);
         

        }
    }
    ));

         db.query ( 'INSERT INTO user SET ?', {name: name, email: email, password: hashedPassword, phno: phno, clg: clg, city: city, state: state, country: country}, (error, results) => {
           if(error){
               console.log("error");
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered!'
                })
            };

         });
        }

   