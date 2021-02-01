import { Request, Response } from "https://deno.land/x/oak/mod.ts";

interface Message {
  updatedAt: string;
  content: string;
}

// For simplicity, store data in-memory. Probably need a dedicated persistence layer at some point
let sharedMessages: Message[] = [];

const getShared = ({ response }: { response: Response }) => {
  response.body = sharedMessages;
};

const createShared = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const message: Message = await request.body({ type: "json" }).value;
  if (message.content === undefined) {
    response.body = { error: "Invalid message. Missing `content` field" };
    response.status = 400;
  } else {
    response.body = { ...message };
    response.status = 200;
  }
  sharedMessages.push(message);
};

export { getShared, createShared };
