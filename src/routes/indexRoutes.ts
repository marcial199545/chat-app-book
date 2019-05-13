import { Router, Response, Request } from "express";
import indexControllers from "../controllers/indexControllers";
const router = Router();
router.route("/").get(indexControllers.renderIndex);
export default router;
