import { Request, Response } from "https://deno.land/x/oak/mod.ts";

interface Clip {
  content: string;
  updatedAt: Date;
}

// For simplicity, store data in-memory. Probably need a dedicated persistence layer at some point
let sharedClips: Clip[] = [];

const getClips = ({ response }: { response: Response }) => {
  response.body = sharedClips;
};

const createClip = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const requestBody: Clip = await request.body({ type: "json" }).value;
  if (requestBody.content === undefined) {
    response.body = { error: "Invalid message. Missing `content` field" };
    response.status = 400;
    return;
  }
  const createdClip = { ...requestBody, updatedAt: new Date() };
  response.body = createdClip;
  sharedClips.push(createdClip);
  response.status = 200;
};

export { getClips, createClip };
