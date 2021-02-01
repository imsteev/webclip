import { Router } from "https://deno.land/x/oak/mod.ts";
import { getShared, createShared } from "./controller.ts";

const router = new Router();
router.get("/shared_content", getShared).post("/shared_content", createShared);

export default router;
