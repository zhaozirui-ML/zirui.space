import {
  createCommentValidationError,
  validateCreateCommentPayload,
} from "../../../src/site/lib/comments/comment-schema";
import {
  createComment,
  deleteComment,
  listOpenCommentsByWorkSlug,
  listComments,
  updateCommentStatus,
} from "../../../src/site/lib/comments/comment-service";

export const runtime = "nodejs";

function getErrorStatus(error) {
  return typeof error?.status === "number" ? error.status : 500;
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : "Comment request failed.";
}

function assertCommentsAccess(request) {
  const accessToken = process.env.COMMENTS_ACCESS_TOKEN?.trim();
  const requestUrl = new URL(request.url);
  const access = requestUrl.searchParams.get("access")?.trim();

  if (!accessToken || access !== accessToken) {
    throw createCommentValidationError("Not found.", 404);
  }
}

function getAccessParam(request) {
  const requestUrl = new URL(request.url);
  return requestUrl.searchParams.get("access")?.trim() || "";
}

function getWorkSlugParam(request) {
  const requestUrl = new URL(request.url);
  return requestUrl.searchParams.get("workSlug")?.trim() || "";
}

async function readJsonPayload(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function validateCommentId(value) {
  const commentId = typeof value === "string" ? value.trim() : "";

  if (!commentId) {
    throw createCommentValidationError("Comment id is required.");
  }

  return commentId;
}

function validateCommentStatus(value) {
  const status = typeof value === "string" ? value.trim() : "";

  if (!["open", "archived"].includes(status)) {
    throw createCommentValidationError("Comment status must be open or archived.");
  }

  return status;
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validation = validateCreateCommentPayload(payload);

    if (validation.honeypotTriggered) {
      return Response.json({
        ok: true,
        message: "Feedback submitted.",
      });
    }

    const comment = await createComment(validation.data);

    return Response.json({
      ok: true,
      comment,
      commentId: comment.id,
      message: "Feedback submitted.",
    });
  } catch (error) {
    const status = getErrorStatus(error);

    console.error("Comment submission failed.", error);

    return Response.json(
      {
        ok: false,
        error: getErrorMessage(error),
      },
      { status },
    );
  }
}

export async function GET(request) {
  try {
    const access = getAccessParam(request);
    const workSlug = getWorkSlugParam(request);

    if (access) {
      assertCommentsAccess(request);

      const items = await listComments();

      return Response.json({
        ok: true,
        items,
      });
    }

    if (!workSlug) {
      throw createCommentValidationError("Work slug is required.", 400);
    }

    const items = await listOpenCommentsByWorkSlug(workSlug);

    return Response.json({
      ok: true,
      items,
    });
  } catch (error) {
    const status = getErrorStatus(error);

    if (status >= 500) {
      console.error("Comment listing failed.", error);
    }

    return Response.json(
      {
        ok: false,
        error: getErrorMessage(error),
      },
      { status },
    );
  }
}

export async function PATCH(request) {
  try {
    assertCommentsAccess(request);

    const payload = await readJsonPayload(request);
    const commentId = validateCommentId(payload?.id);
    const status = validateCommentStatus(payload?.status);
    const comment = await updateCommentStatus(commentId, status);

    return Response.json({
      ok: true,
      comment,
    });
  } catch (error) {
    const status = getErrorStatus(error);

    if (status >= 500) {
      console.error("Comment update failed.", error);
    }

    return Response.json(
      {
        ok: false,
        error: getErrorMessage(error),
      },
      { status },
    );
  }
}

export async function DELETE(request) {
  try {
    assertCommentsAccess(request);

    const requestUrl = new URL(request.url);
    const payload = await readJsonPayload(request);
    const commentId = validateCommentId(payload?.id || requestUrl.searchParams.get("id"));

    await deleteComment(commentId);

    return Response.json({
      ok: true,
    });
  } catch (error) {
    const status = getErrorStatus(error);

    if (status >= 500) {
      console.error("Comment deletion failed.", error);
    }

    return Response.json(
      {
        ok: false,
        error: getErrorMessage(error),
      },
      { status },
    );
  }
}
