const db = require('../db')

module.exports = {
    all(callback){
        db.query(`SELECT salesman.*, count(customer) AS total_customers
        FROM salesman
        LEFT JOIN customer ON (customer.salesman_id = salesman.id)
        GROUP BY salesman.id
        ORDER BY total_customers DESC
        `, 
        function(err, results){
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
        INSERT INTO salesman (
            avatar_url,
            name,
            email,
            tel
        ) VALUES ($1, $2, $3, $4)
        RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.tel
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`SELECT * FROM salesman WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database error! ${err}`
            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
        UPDATE salesman SET
            avatar_url=($1),
            name=($2),
            email=($3),
            tel=($4)
        WHERE id = $5
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.tel,
            data.id
        ]

        db.query(query,values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM salesman WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database error! ${err}`

            return callback()
        })
    }
}