import prisma from "../../config/prisma";

class UserFinder {
  async findByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {}
  }

  async findByDocument(document: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          document,
        },
      });

      return user;
    } catch (error) {}
  }

  async findById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new UserFinder();
