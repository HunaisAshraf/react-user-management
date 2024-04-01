const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { hashPassword, comparePassword } = require("../helpers/helper");

const getUserController = async (req, res) => {
  try {
    const users = await db.pool.query("select * from users where role <> 1");
    return res.status(200).send(users.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in getting users details",
    });
  }
};

const userSignUpController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "enter valid details",
      });
    }

    const exist = await db.pool.query("SELECT * FROM users where email = $1;", [
      email,
    ]);

    if (exist.rowCount) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.pool.query(
      "INSERT INTO users (name,email,phone,password) values($1,$2,$3,$4) RETURNING *;",
      [name, email, phone, hashedPassword]
    );

    return res.status(200).json({
      success: true,
      message: "signup successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in user signup",
      error,
    });
  }
};

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.pool.query("SELECT * FROM users where email = $1;", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    const matchPassword = await comparePassword(
      password,
      user.rows[0].password
    );

    if (!matchPassword) {
      return res.json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });
    return res.status(200).json({
      success: true,
      message: "user login successfull",
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        phone: user.rows[0].phone,
        role: user.rows[0].role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const addImageController = async (req, res) => {
  try {
    const id = Number(req.body.id);
    const image = req.file.filename;

    const imageExist = await db.pool.query(
      "select * from image where userid = $1;",
      [id]
    );

    if (imageExist.rows.length === 0) {
      const img = await db.pool.query(
        "INSERT INTO image (userid,img) VALUES($1,$2);",
        [id, image]
      );
      res.status(200).json({
        success: true,
        message: "Image added successfully",
      });
    }
    const img = await db.pool.query(
      "UPDATE image SET img = $1 WHERE userid = $2;",
      [image, id]
    );
    res.status(200).json({
      success: true,
      message: "Image added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to add image",
    });
  }
};

module.exports = {
  getUserController,
  userSignUpController,
  userLoginController,
  addImageController,
};
