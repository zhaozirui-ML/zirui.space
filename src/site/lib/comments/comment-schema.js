const COMMENT_MIN_LENGTH = 3;
const COMMENT_MAX_LENGTH = 1000;
const VISITOR_NAME_MAX_LENGTH = 40;

const allowedLanguages = new Set(["zh", "en"]);

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function createCommentValidationError(message, status = 400) {
  return Object.assign(new Error(message), { status });
}

export function validateCreateCommentPayload(payload) {
  const honeypot = normalizeText(payload?.company);

  if (honeypot) {
    return {
      data: null,
      honeypotTriggered: true,
    };
  }

  const workSlug = normalizeText(payload?.workSlug);
  const sectionId = normalizeText(payload?.sectionId);
  const sectionLabel = normalizeText(payload?.sectionLabel);
  const comment = normalizeText(payload?.comment);
  const visitorName = normalizeText(payload?.visitorName);
  const language = payload?.language === "en" ? "en" : payload?.language;

  if (!workSlug) {
    throw createCommentValidationError("Work slug is required.");
  }

  if (!sectionId) {
    throw createCommentValidationError("Section id is required.");
  }

  if (!sectionLabel) {
    throw createCommentValidationError("Section label is required.");
  }

  if (!comment) {
    throw createCommentValidationError("Comment is required.");
  }

  if (comment.length < COMMENT_MIN_LENGTH) {
    throw createCommentValidationError("Comment is too short.");
  }

  if (comment.length > COMMENT_MAX_LENGTH) {
    throw createCommentValidationError("Comment is too long.");
  }

  if (visitorName.length > VISITOR_NAME_MAX_LENGTH) {
    throw createCommentValidationError("Visitor name is too long.");
  }

  if (!allowedLanguages.has(language)) {
    throw createCommentValidationError("Language must be zh or en.");
  }

  return {
    data: {
      comment,
      language,
      sectionId,
      sectionLabel,
      visitorName: visitorName || null,
      workSlug,
    },
    honeypotTriggered: false,
  };
}

export function serializeCommentRecord(record) {
  return {
    id: record.id,
    comment: record.comment,
    createdAt: record.created_at,
    language: record.language,
    sectionId: record.section_id,
    sectionLabel: record.section_label,
    status: record.status,
    visitorName: record.visitor_name,
    workSlug: record.work_slug,
  };
}
