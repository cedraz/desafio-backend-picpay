import { User, Transaction, Set } from "../interfaces/interfaces";
import TransactionCreator from "../models/transaction/TransactionCreator";
import UserFinder from "../models/user/UserFinder";
import UserEditor from "../models/user/UserEditor";
import axios from "axios";

async function sendNotification(user: User, message: string) {
  const body = {
    message,
    email: user.email,
  };

  const requestMocky = await axios
    .post("https://run.mocky.io/v3/7e09a7a8-4286-4a97-a354-8f28d267961d", body)
    .catch((error) => {
      console.log("Notification service if offline");
      return false;
    });

  if (requestMocky) {
    console.log("notification sent");
  }
}

class TransactionController {
  async createTransaction(body: Transaction, set: Set, headers: any) {
    const { amount, payerId, receiverId } = body;

    try {
      const payer = await UserFinder.findById(payerId);

      if (!payer) {
        set.status = 404;
        return { message: "Payer not found" };
      }

      if (payer.type === "SHOPKEEPER") {
        set.status = 400;
        return { message: "Shopkeeper cannot make transactions" };
      }

      const receiver = await UserFinder.findById(receiverId);

      if (!receiver) {
        set.status = 404;
        return { message: "Receiver not found" };
      }

      if (payerId === receiverId) {
        set.status = 400;
        return { message: "Payer and receiver cannot be the same" };
      }

      if (payer.balance < amount) {
        set.status = 400;
        return { message: "Insufficient balance" };
      }

      const authorization = await axios.get(
        "https://run.mocky.io/v3/7e09a7a8-4286-4a97-a354-8f28d267961d"
      );

      if (authorization.status !== 200) {
        set.status = 403;
        return { message: "Transaction not authorized" };
      }

      const transaction = await TransactionCreator.createTransaction({
        amount,
        payerId,
        receiverId,
        DateTime: new Date(),
      });

      if (!transaction) {
        set.status = 400;
        return { message: "Transaction not created" };
      }

      const payerNewBalance = payer.balance - amount;
      const receiverNewBalance = receiver.balance + amount;

      const payerUpdated = await UserEditor.updateBalance({
        id: payer.id,
        newBalance: payerNewBalance,
      });

      const receiverUpdated = await UserEditor.updateBalance({
        id: receiver.id,
        newBalance: receiverNewBalance,
      });

      const notify = await sendNotification(payer, "Transaction completed");

      const response = {
        id: transaction.id,
        amount: transaction.amount,
        payer: {
          id: payer.id,
          name: payer.name,
          document: payer.document,
          email: payer.email,
          balance: payerNewBalance,
        },
        receiver: {
          id: receiver.id,
          name: receiver.name,
          document: receiver.document,
          email: receiver.email,
          balance: receiverNewBalance,
        },
        DateTime: transaction.DateTime,
      };

      return response;
    } catch (error) {
      return { message: "Internal server error" };
    }
  }
}

export default new TransactionController();
