import * as React from 'react';
import { Component, useRef } from 'react';
import { Note } from '../Models/Note';

interface Props {
    notes: Note[]
    modalRef:  React.RefObject<HTMLDivElement>
}

const Modal:React.FC<Props> = ({notes, modalRef}) => {

    const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === modalRef.current)
            event.currentTarget.style.display = "none"
    }
    
    return (
        <div className='modal' ref={modalRef} onClick={closeModal}>
            <div className='modal-body'>
                <div className='db-data'>
                    {JSON.stringify(notes)}
                </div>
            </div>
        </div>
    );
}
 
export default Modal;