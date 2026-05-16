import { serializeCommentRecord } from "./comment-schema";

const COMMENTS_TABLE = "portfolio_comments";
const COMMENT_COLUMNS = [
  "id",
  "work_slug",
  "section_id",
  "section_label",
  "comment",
  "visitor_name",
  "language",
  "status",
  "created_at",
].join(",");

function getSupabaseRestConfig() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    throw Object.assign(new Error("Comment storage is not configured."), {
      status: 503,
    });
  }

  return {
    endpoint: `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${COMMENTS_TABLE}`,
    serviceRoleKey,
  };
}

async function readSupabaseError(response) {
  const fallbackMessage = `Supabase request failed with status ${response.status}.`;

  try {
    const body = await response.json();
    return body?.message || body?.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

async function requestSupabase(path = "", options = {}) {
  const { endpoint, serviceRoleKey } = getSupabaseRestConfig();
  const response = await fetch(`${endpoint}${path}`, {
    ...options,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await readSupabaseError(response);
    throw Object.assign(new Error(message), {
      status: response.status >= 500 ? 502 : response.status,
    });
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function createComment(comment) {
  const rows = await requestSupabase(`?select=${COMMENT_COLUMNS}`, {
    body: JSON.stringify({
      comment: comment.comment,
      language: comment.language,
      section_id: comment.sectionId,
      section_label: comment.sectionLabel,
      visitor_name: comment.visitorName,
      work_slug: comment.workSlug,
    }),
    headers: {
      Prefer: "return=representation",
    },
    method: "POST",
  });

  return serializeCommentRecord(rows[0]);
}

export async function listComments() {
  const params = new URLSearchParams({
    order: "created_at.desc",
    select: COMMENT_COLUMNS,
  });
  const rows = await requestSupabase(`?${params.toString()}`, {
    method: "GET",
  });

  return rows.map(serializeCommentRecord);
}

export async function listOpenCommentsByWorkSlug(workSlug) {
  const params = new URLSearchParams({
    order: "created_at.desc",
    select: COMMENT_COLUMNS,
    status: "eq.open",
    work_slug: `eq.${workSlug}`,
  });
  const rows = await requestSupabase(`?${params.toString()}`, {
    method: "GET",
  });

  return rows.map(serializeCommentRecord);
}

export async function updateCommentStatus(commentId, status) {
  const params = new URLSearchParams({
    id: `eq.${commentId}`,
    select: COMMENT_COLUMNS,
  });
  const rows = await requestSupabase(`?${params.toString()}`, {
    body: JSON.stringify({ status }),
    headers: {
      Prefer: "return=representation",
    },
    method: "PATCH",
  });

  if (!rows[0]) {
    throw Object.assign(new Error("Comment not found."), { status: 404 });
  }

  return serializeCommentRecord(rows[0]);
}

export async function deleteComment(commentId) {
  const params = new URLSearchParams({
    id: `eq.${commentId}`,
  });

  await requestSupabase(`?${params.toString()}`, {
    method: "DELETE",
  });
}
