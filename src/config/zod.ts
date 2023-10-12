import { z } from "zod";
import { User, Transaction } from "../interfaces/interfaces";
import cpfValidator from "../utils/cpfValidator";
import cnpjValidator from "../utils/cnpjValidator";

const UserTypes = ["COMMON", "SHOPKEEPER"] as const;

const documentSchema = z.string().min(11).max(18);

const UserSchema = z.object({
  name: z.string().min(1).max(255),
  document: documentSchema,
  email: z.string().email(),
  password: z.string().min(5).max(255),
  balance: z.number().min(0),
  type: z.enum(UserTypes),
});

const TransactionSchema = z.object({
  amount: z.number().min(0),
  payerId: z.number().min(1),
  receiverId: z.number().min(1),
  DateTime: z.date(),
});

class Zod {
  validateUser(body: User) {
    if (!cpfValidator(body.document) && !cnpjValidator(body.document)) {
      return { success: false, error: "Invalid CPF or CNPJ" };
    }

    return UserSchema.safeParse(body);
  }

  validateTransaction(body: Transaction) {
    return TransactionSchema.safeParse(body);
  }
}

export default new Zod();
