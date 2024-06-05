import * as React from "react";
import { Component } from "react";
import { Note } from "../Models/Note";
import { MdOutlineDelete } from "react-icons/md";

interface Props {
  note: Note;
  selectedNote: Note;
  deleteNote: (noteID: string) => void;
  selectNote: (noteID: string) => void;
}

const NoteItem: React.FC<Props> = ({
  note,
  selectedNote,
  deleteNote,
  selectNote,
}) => {
  let className = "note";
  className += selectedNote.key == note.key ? " active" : "";

  return (
    <div
      className={className}
      onClick={() => {
        selectNote(note.key);
      }}
    >
      <div className="title">{note.value.split("\n")[0]}</div>
      <span
        className="delete-note"
        onClick={(event) => {
          deleteNote(note.key);
          event.stopPropagation();
        }}
      >
        <MdOutlineDelete />
      </span>
    </div>
  );
};

export default NoteItem;
