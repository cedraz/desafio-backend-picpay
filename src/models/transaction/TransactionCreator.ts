import prisma from "../../config/prisma";
import { Transaction } from "../../interfaces/interfaces";

class UserCreator {
  async createTransaction({
    amount,
    payerId,
    receiverId,
    DateTime,
  }: Transaction) {
    try {
      const transaction = await prisma.transaction.create({
        data: {
          amount,
          payerId,
          receiverId,
          DateTime,
        },
      });

      return transaction;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new UserCreator();
