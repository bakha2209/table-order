const MemberModel = require("../schema/memberSchema");
const bcrypt = require("bcryptjs");
const Definer = require("../lib/mistake");
const assert = require("assert");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.password = await bcrypt.hash(input.password, salt);

      const new_member = new this.memberModel(input);
      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }

      result.password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = await this.memberModel
        .findOne({ username: input.username }, { username: 1, password: 1 })
        .exec();

      assert.ok(member, Definer.auth_err3);
      //console.log(member)
      const isMatch = await bcrypt.compare(
        input.password,
        member.password
      );
      assert.ok(isMatch, Definer.auth_err4);

      return await this.memberModel
        .findOne({ username: input.username })
        .exec();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
