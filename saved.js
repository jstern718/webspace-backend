// app.all("/api/:name/:table/:info", (req, res, next) => {
//     console.log("-----");
//     console.log("run route: '/api/:name/:table/:info'");

//     let nameVar = req.params.name || null;
//     let tableVar = req.params.table || null;
//     let infoVar = req.params.info || null;

//     let sql = `SELECT * FROM ${tableVar}
//                 JOIN ${infoVar}
//                 ON ${tableVar}.language_name=${infoVar}.language_name
//                 WHERE name = ?`;
//     let params = [nameVar];

//     db.all(sql, params, (err, row) => {
//         console.log("db.all runs:", "sql =", sql);
//         console.log("params =", params);
//         if (err) {
//             console.log("sql error at line 60");
//             res.status(400).json({"error":err.message});
//             return;
//         }
//         res.json({
//             "message":"success",
//             "data":row
//         })
//     });
// });



    // if (tableVar === "applications"){

    //     let sql = `SELECT * FROM applications
    //     JOIN languages_used
    //     ON applications.application_name=languages_used.application_name
    //     WHERE applications.name = ?`;
    //     let params = [nameVar];

    //     db.all(sql, params, (err, row) => {
    //         console.log("db.all runs:", "sql =", sql);
    //         console.log("params =", params);
    //         if (err) {
    //             console.log("sql error at line 32");
    //             res.status(400).json({"error":err.message});
    //             return;
    //         }
    //         res.json({
    //             "message":"success",
    //             "data":row
    //         })
    //     });
    // }
    // else{