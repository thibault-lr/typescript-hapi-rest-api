import JWTUtils from "./../../utilities/jwt"
import UserModel from "./../../api/users/user.model"

describe("JWT Utils testing", () => {
  it("Should generate a proper token", () => {
    const userModel = new UserModel();
    userModel.id = 1;

    const token = JWTUtils.generateToken(userModel)
    expect(typeof token).toBe("string")

  })
})