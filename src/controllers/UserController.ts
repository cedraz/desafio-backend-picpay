import UserCreator from "../models/user/UserCreator";
import UserFinder from "../models/user/UserFinder";
import { User, Set } from "../interfaces/interfaces";
import Zod from "../config/zod";

class UserController {
  async register(body: User, set: Set) {
    try {
      const { name, document, email, password, balance, type } = body;
      const isBodyValid = Zod.validateUser(body);

      if (!isBodyValid.success) {
        set.status = 400;
        return isBodyValid;
      }

      const documentFormatted: string = document.replace(/\D/g, "");

      const emailExists = await UserFinder.findByEmail(email);
      const documentExists = await UserFinder.findByDocument(documentFormatted);

      if (emailExists || documentExists) {
        set.status = 400;
        return { message: "User already exists" };
      }

      const user = await UserCreator.createUser({
        name,
        document: documentFormatted,
        email,
        password,
        balance,
        type,
      });

      if (user) {
        const { password: pass, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    } catch (error) {
      return { message: "Internal server error" };
    }
  }

  async login(body: User, set: Set) {
    try {
      const { email, password } = body;
      const user = await UserFinder.findByEmail(email);

      if (!user) {
        set.status = 400;
        return { error: "User not found" };
      }

      const hash = user.password;
      const isMatch = await Bun.password.verify(password, hash);

      if (!isMatch) {
        set.status = 403;
        return { message: "Wrong password" };
      }

      const { password: pass, ...userWithoutPassword } = user;

      const result = {
        user: userWithoutPassword,
      };
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new UserController();
