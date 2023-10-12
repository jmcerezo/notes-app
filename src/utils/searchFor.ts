import Note from "../types/Note";

const searchFor = (keyword: string) => {
  return (note: Note) => {
    return (
      note.title.toLowerCase().includes(keyword.toLowerCase()) ||
      note.content.toLowerCase().includes(keyword.toLowerCase()) ||
      !keyword
    );
  };
};

export default searchFor;
