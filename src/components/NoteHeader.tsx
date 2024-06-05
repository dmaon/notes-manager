import * as React from "react";
import { Component } from "react";
import {
  MdOutlineNoteAdd,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdFormatTextdirectionLToR,
  MdFormatTextdirectionRToL,
  MdOutlineCloudDownload,
  MdOutlineDeleteForever,
} from "react-icons/md";
import NoteLogo from "./NoteLogo";

interface Props {
  addNote: () => void;
  deleteAllNotes: () => void;
  changeDisplayMode: () => void;
  isLightMode: boolean;
  changeDirectionMode: () => void;
  isLTRMode: boolean;
  showDownloadModal: () => void;
}

const NoteHeader: React.FC<Props> = ({
  addNote,
  deleteAllNotes,
  changeDisplayMode,
  isLightMode,
  changeDirectionMode,
  isLTRMode,
  showDownloadModal,
}) => {
  return (
    <div className="note-header">
      <NoteLogo />
      <div className="note-features">
        <span className="icon" onClick={addNote}>
          <MdOutlineNoteAdd />
        </span>
        <span className="icon" onClick={deleteAllNotes}>
          <MdOutlineDeleteForever />
        </span>
        <span className="icon" onClick={changeDisplayMode}>
            {isLightMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </span>
        <span className="icon" onClick={changeDirectionMode}>
            {isLTRMode ? <MdFormatTextdirectionRToL /> : <MdFormatTextdirectionLToR />}
        </span>
        <span className="icon" onClick={showDownloadModal}>
          <MdOutlineCloudDownload />
        </span>
      </div>
    </div>
  );
};

export default NoteHeader;
