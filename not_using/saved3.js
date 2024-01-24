
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



app.post("/token", async function (req, res, next) {

    const { username, password } = req.body;
    console.log("/token u-p", username, password);
    const user = await authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  });

app.post("/auth", async function (req, res, next) {
    console.log("-----");
    console.log("run login route: '/api/auth'");

    // if (req.body === undefined) throw new BadRequestError();

    // const password = req.body;
    // const result = await db.query(
    //       `SELECT user, password
    //          FROM users
    //          WHERE name = $1`,
    //       [username]);
    // const user = result.rows[0];
    // console.log("auth user", user);
    return res.json({ "test":"test" });
    // if (user) {
    //     if (await bcrypt.compare(password, user.password) === true) {
    //         return res.json({ message: "Logged in!" });
    //     }
    // }
    // throw new UnauthorizedError("Invalid user/password");
});


async function register(username, password){

    const duplicateCheck = await db.query(`
        SELECT username
        FROM users
        WHERE username = $1`, [username],
    );

    if (duplicateCheck.rows.length > 0) {
      throw new Error(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(`
                INSERT INTO users
                (username,
                 password)
                VALUES ($1, $2)
                RETURNING
                    username`, [
          username,
          hashedPassword
        ],
    );

    const user = result.rows[0];

    return user;
  }


  async function authenticate(username, password) {
    // try to find the user first
    const result = await db.query(`
        SELECT username,
               password
        FROM users
        WHERE username = $1`, [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/


  async function register(
    { username, password }) {
  const duplicateCheck = await db.query(`
      SELECT username
      FROM users
      WHERE username = $1`, [username],
  );

  if (duplicateCheck.rows.length > 0) {
    throw new BadRequestError(`Duplicate username: ${username}`);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await db.query(`
              INSERT INTO users
              (username,
               password)
              VALUES ($1, $2)
              RETURNING
                  username`,
                  [username,
                   hashedPassword],
  );

  const user = result.rows[0];

  return user;
}

