import type { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionIdAndTokenExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = request.cookies.sessionId;
  const token = request.cookies.token;

  if (!sessionId && !token) {
    return reply.status(401).send({
      error: "Unauthorized",
    });
  }
}
