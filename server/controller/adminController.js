const db = require("../config/db");
const JWT = require("jsonwebtoken");
const { comparePassword } = require("../helpers/helper");

const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        message: "invalid credentials",
        success: false,
      });
    }

    const user = await db.pool.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);

    if (!user.rows.length === 0) {
      return res.status(404).send({
        message: "user not found",
        success: false,
      });
    }

    const passwordMatch = await comparePassword(
      password,
      user.rows[0].password
    );

    if (!passwordMatch) {
      return res.status(401).send({
        message: "invalid password",
        success: false,
      });
    }

    if (user.rows[0].role !== 1) {
      return res.status(401).send({
        message: "Unauthorised User",
        success: false,
      });
    }

    const token = JWT.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: {
        name: user.rows[0].name,
        email: user.rows[0].email,
        phone: user.rows[0].phone,
        img: user.rows[0].img,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await db.pool.query(
      "SELECT id,name,email,phone FROM users WHERE role <> 1 ;"
    );

    res.status(200).json({
      users: users.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await db.pool.query("DELETE FROM users WHERE id = $1;", [id]);

    return res.status(200).send({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "user deleted failed",
    });
  }
};

const getUserDetailsController = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const user = await db.pool.query("SELECT * FROM users WHERE id = $1;", [
      id,
    ]);

    user.rows[0].password = undefined;
    user.rows[0].role = undefined;

    return res.json({ success: true, user: user.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const editUserDetailsController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, phone } = req.body;

    const exist = await db.pool.query("SELECT * FROM users WHERE email = $1 AND id <> $2", [
      email,id
    ]);
    if (exist.rowCount) {
      return res.send({
        success: false,
        message: "user already exist",
      });
    }

    let user = await db.pool.query(
      "UPDATE users SET name = $1, email = $2, phone = $3 where id = $4;",
      [name, email, phone,id]
    );

    return res.send({
      success: true,
      message: "user update successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminLoginController,
  getAllUsersController,
  deleteUserController,
  getUserDetailsController,
  editUserDetailsController,
};
