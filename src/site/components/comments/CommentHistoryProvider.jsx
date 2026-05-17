"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CommentHistoryContext = createContext(null);

function mergeComments(currentComments, incomingComments) {
  const commentsById = new Map();

  [...incomingComments, ...currentComments].forEach((comment) => {
    if (comment?.id) {
      commentsById.set(comment.id, comment);
    }
  });

  return Array.from(commentsById.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function useCommentHistory() {
  return useContext(CommentHistoryContext);
}

export default function CommentHistoryProvider({ children, workSlug }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function loadComments() {
      try {
        const response = await fetch(
          `/api/comments?workSlug=${encodeURIComponent(workSlug)}`,
          {
            cache: "no-store",
          },
        );
        const data = await response.json();

        if (!isActive || !response.ok || data?.ok !== true) {
          return;
        }

        setComments(data.items || []);
      } catch (error) {
        console.error("Failed to load public comments.", error);
      }
    }

    if (workSlug) {
      loadComments();
    }

    return () => {
      isActive = false;
    };
  }, [workSlug]);

  const value = {
    addComment(comment) {
      setComments((currentComments) => mergeComments(currentComments, [comment]));
    },
    getCommentsForTarget(targetId) {
      return comments.filter((comment) => comment.sectionId === targetId);
    },
    removeComment(commentId) {
      setComments((currentComments) =>
        currentComments.filter((comment) => comment.id !== commentId),
      );
    },
    updateComment(nextComment) {
      if (!nextComment?.id) {
        return;
      }

      setComments((currentComments) => {
        if (nextComment.status !== "open") {
          return currentComments.filter((comment) => comment.id !== nextComment.id);
        }

        return mergeComments(
          currentComments.filter((comment) => comment.id !== nextComment.id),
          [nextComment],
        );
      });
    },
  };

  return <CommentHistoryContext.Provider value={value}>{children}</CommentHistoryContext.Provider>;
}
