import * as React from 'react';
import { Component } from 'react';
import { Note } from '../Models/Note';
import NoteItem from "./NoteItem"

interface Props {
    notes: Note[]
    selectedNote: Note
    deleteNote: (noteID:string) => void
    selectNote: (noteID:string) => void
}

const NotesList:React.FC<Props> = ({notes, selectedNote, deleteNote, selectNote}) => {
    return (
        <div className='note-list'>
            {
                notes.map(note => (
                    <NoteItem key={note.key} note={note} selectedNote={selectedNote} deleteNote={deleteNote} selectNote={selectNote} />
                ))
            } 
        </div>
    );
}
 
export default NotesList;
