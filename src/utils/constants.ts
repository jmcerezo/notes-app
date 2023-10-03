export const NOTES_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://notes-api.adaptable.app";
