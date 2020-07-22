const db = require('../db')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM customer`, function(err, results){
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
        INSERT INTO customer (
            avatar_url,
            name,
            cpf,
            email,
            tel,
            salesman_id
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.cpf,
            data.email,
            data.tel,
            data.salesman
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`SELECT customer.*, salesman.name AS salesman_name
         FROM customer 
         LEFT JOIN salesman ON (customer.salesman_id = salesman.id)
         WHERE customer.id = $1`, [id], function(err, results){
            if(err) throw `Database error! ${err}`
            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
        UPDATE customer SET
            avatar_url=($1),
            name=($2),
            cpf=($3),
            email=($4),
            tel=($5),
            salesman_id=($6)
        WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            data.cpf,
            data.email,
            data.tel,
            data.salesman,
            data.id
        ]

        db.query(query,values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM customer WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database error! ${err}`

            return callback()
        })
    },

    salesmanSelectOptions(callback) {
        db.query(`SELECT name, id FROM salesman`, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}