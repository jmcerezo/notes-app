const NOTES_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://notes-api.adaptable.app";

const alphabetRegex = /^[A-Za-z]+$/;
const minThreeCharactersRegex = /(.*[a-z]){3}/i;
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export { NOTES_API, alphabetRegex, minThreeCharactersRegex, emailRegex };
