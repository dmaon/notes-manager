import * as React from 'react';
import { Component } from 'react';
import { MdNoteAdd } from "react-icons/md";

interface Props {
    addNote: () => void
}

const NoNotes:React.FC<Props> = ({addNote}) => {
    return (
        <div className='no-note'>
            <div className='message'><p className='title'>There is no Note.</p><button className='' onClick={addNote}><MdNoteAdd /></button></div>
        </div>
    );
}

export default NoNotes;