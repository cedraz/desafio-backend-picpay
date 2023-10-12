import prisma from "../../config/prisma";

class UserEditor {
  async updateBalance({ newBalance, id }: { newBalance: number; id: number }) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          balance: newBalance,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new UserEditor();
