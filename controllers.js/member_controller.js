const Member = require("../models/Member");
const assert = require("assert");
const jwt = require("jsonwebtoken");
const Definer = require("../lib/mistake");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log(`POST: cont/signup`);
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);
    //console.log("result::", new_member);
    const token = memberController.createToken(new_member);
    //console.log("token:", token);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log(`POST: cont/login`);
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    const token = memberController.createToken(result);
    //console.log("token:", token);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifasidasiz");
};

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      username: result.username,
    };

    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err2);
    return token;
  } catch (err) {
    throw err;
  }
};

memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("GET cont/checkMyAuthentication");
    let token = req.cookies["access_token"];
    console.log("tokencha:", token);

    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(member, Definer.auth_err2);

    res.json({ state: "succeed", data: member });
  } catch (err) {
    throw err;
  }
};
memberController.retrieveAuthMember = (req, res, next) => {
  try {
    const token = req.cookies["access_token"];
    req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    next();
  } catch (err) {
    console.log(`ERROR, cont/retrieveAuthMember, ${err.message}`);
    next();
  }
};