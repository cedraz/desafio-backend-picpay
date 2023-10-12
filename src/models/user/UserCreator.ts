import prisma from "../../config/prisma";
import { User } from "../../interfaces/interfaces";

class UserCreator {
  async createUser({ name, document, email, password, balance, type }: User) {
    try {
      const passwordHash = await Bun.password.hash(password);
      const user = await prisma.user.create({
        data: {
          name,
          document,
          email,
          password: passwordHash,
          balance,
          type,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new UserCreator();
