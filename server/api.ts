import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from "./router.ts";

const env = Deno.env.toObject();
const HOST = env.HOST || "127.0.0.1";
const PORT = env.PORT || 8000;

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.request.method} ${ctx.request.url}`);
});

app.use(
  oakCors({
    origin: "http://localhost:5000",
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Serving requests at http://${HOST}:${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
