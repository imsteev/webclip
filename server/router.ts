import { Router } from "https://deno.land/x/oak/mod.ts";
import { getClips, createClip } from "./controller.ts";

const router = new Router();
router.get("/clips", getClips).post("/clips", createClip);

export default router;
