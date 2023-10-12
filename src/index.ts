import { Elysia } from "elysia";

// Controllers
import UserController from "./controllers/UserController";
import TransactionController from "./controllers/TransactionController";

// Interface
import { User, Transaction, Set } from "./interfaces/interfaces";

const app = new Elysia();

app.get("/", () => {
  return "Hello Elysia";
});

app.post("/register", ({ body, set }) =>
  UserController.register(body as User, set as Set)
);

app.post("/login", ({ body, set }) =>
  UserController.login(body as User, set as Set)
);

app.post("/transaction", ({ body, set, headers }) =>
  TransactionController.createTransaction(
    body as Transaction,
    set as Set,
    headers
  )
);

app.listen(8080, () => {
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  );
});
