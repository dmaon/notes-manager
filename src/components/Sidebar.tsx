import * as React from "react";
import { Component } from "react";
import { Note } from "../Models/Note";
import NoteHeader from "./NoteHeader";
import NotesList from "./NotesList";

interface Props {
  notes: Note[];
  selectedNote: Note;
  addNote: () => void;
  deleteNote: (noteID: string) => void;
  selectNote: (noteID: string) => void;
  deleteAllNotes: () => void;
  changeDisplayMode: () => void;
  isLightMode: boolean;
  changeDirectionMode: () => void;
  isLTRMode: boolean;
  showDownloadModal: () => void;
}

const Sidebar: React.FC<Props> = ({
  notes,
  selectedNote,
  addNote,
  deleteNote,
  selectNote,
  deleteAllNotes,
  changeDisplayMode,
  isLightMode,
  changeDirectionMode,
  isLTRMode,
  showDownloadModal,
}) => {
  return (
    <div className="sidebar">
      <NoteHeader
        addNote={addNote}
        deleteAllNotes={deleteAllNotes}
        changeDisplayMode={changeDisplayMode}
        isLightMode={isLightMode}
        changeDirectionMode={changeDirectionMode}
        isLTRMode={isLTRMode}
        showDownloadModal={showDownloadModal}
      />
      <NotesList
        notes={notes}
        selectedNote={selectedNote}
        deleteNote={deleteNote}
        selectNote={selectNote}
      />
    </div>
  );
};

export default Sidebar;
