import { Router } from "express";
import { CreateUserController } from "./Controllers/CreateUserController";
import { CreateTagController } from "./Controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./Controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./Controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./Controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./Controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./Controllers/ListTagsController";
import { ListUsersController } from "./Controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();


router.post(
  "/users", 
  createUserController.handle
);

router.post(
  "/tags", 
  ensureAuthenticated, 
  ensureAdmin, 
  createTagController.handle
);

router.post(
  "/login", 
  authenticateUserController.handle
);

router.post(
  "/compliments", 
  ensureAuthenticated, 
  createComplimentController.handle
);

router.get(
  "/users/compliments/send", 
  ensureAuthenticated,
  listUserSendComplimentsController.handle
)

router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
)

router.get(
  "/tags",
  ensureAuthenticated,
  listTagsController.handle
)

router.get(
  "/users",
  ensureAuthenticated,
  listUsersController.handle
)

export{router};