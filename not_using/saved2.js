

// async function hashPassword(password){
//     return await bcrypt.hash(password, 12);
// }
// let p1;
// let p2;
// let p3;

// async function hashHelper(){
//     p1 = await hashPassword("password1");
//     p2 = await hashPassword("password2");
//     p3 = await hashPassword("password3");
//     console.log("hashes", "p1", p1, "p2", p2, "p3", p3);
// }


db.run(
    `CREATE TABLE auth (
        username TEXT PRIMARY KEY,
        password text)`,
(err) => {
    if (err) {
        // Table already created
    }else{
        let insert11 = `INSERT INTO server_types (
                            username,
                            password)
                            VALUES (?, ?)`;
        db.run(insert11, ["adamapple", 1100]);
        db.run(insert11, ["bobbaker", 1200]);
        db.run(insert11, ["carlcake", 1300]);

    }
});


app.post("/api/register", (req, res) => {
    bcrypt.hash(req.body.password, 12)
        .then((hashedPassword) => {
            const user = new User({
              username: request.body.username,
              password: hashedPassword,
            });
            user.save().then((result) => {
                response.status(201).send({
                  message: "User Created Successfully",
                  result,
                });
            })
            .catch((error) => {
                response.status(500).send({
                  message: "Error creating user",
                  error,
                });
              });

        })
        .catch((e) => {
            response.status(500).send({
              message: "Password was not hashed successfully",
              e,
            })
        });
});

app.post("/api/login", (request, response) => {
    User.findOne({ username: request.body.username })
    .then((user)=>{
        bcrypt.compare(request.body.password, user.password)
     })
     .then((user)=>{
            bcrypt.compare(request.body.password, user.password)
            .then((passwordCheck) => {

                if(!passwordCheck) {
                  return response.status(400).send({
                    message: "Passwords does not match",
                    error,
                  });
                }
                //   create JWT token
                const token = jwt.sign(
                    {
                      username: user.username
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                  );
                //   return success response
                response.status(200).send({
                    message: "Login Successful",
                    username: user.username,
                    token,
                });
            })
            .catch((error) => {
                response.status(400).send({
                    message: "Password does not match",
                    error,
                });
            })
    })
    .catch((e) => {
        response.status(404).send({
            message: "Email not found",
            e,
        });
    });
});

// authentication endpoint
app.get("/api/auth", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });



  db.run(
    `CREATE TABLE users (
        user_name TEXT PRIMARY KEY,
        password TEXT)`,
(err) => {
    if (err) {
    //  Table already created
    }else{
        let insert11 = `INSERT INTO users (
                            user_name,
                            password)
                            VALUES (?,?)`;
        db.run(insert11, ["adamapple", "password1"]);
        db.run(insert11, ["bobbaker", "password2"]);
        db.run(insert11, ["carlcake", "password3"]);
    }
});