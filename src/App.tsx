import './App.css';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import Split from 'react-split';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'nanoid';
import { Note } from './Models/Note';
import NoNotes from './components/NoNotes';
import Modal from './components/Modal';

const App:React.FC = () => {


  const stringToBoolean = (stringVar: string):boolean => {
    if (stringVar === 'true')
      return true
    return false
  }


  const dataTbl:string = 'nnote-data'
  const LightModeTbl:string = 'nnote-lightmode-state'
  const DirectionModeTbl:string = 'nnote-direction-state'
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  let dbNotes: Note[] = []
  let lightModeState: boolean = true
  let directionModeState: boolean = true
  
  // for db data
  if (!localStorage.getItem(dataTbl))
    localStorage.setItem(dataTbl, JSON.stringify([]))
  else {
    const data = localStorage.getItem(dataTbl)
    if (data)
    dbNotes = JSON.parse( data )
  }
    
  // for light mode
  if (!localStorage.getItem(LightModeTbl)) {
    const defaultDisplayMode = (prefersDark) ? prefersDark : true
    localStorage.setItem(LightModeTbl, `${defaultDisplayMode}`)
    lightModeState = defaultDisplayMode
  }
  else {
    const data = localStorage.getItem(LightModeTbl)
    if(data !== null)
      lightModeState = stringToBoolean(data)
  }
    
  // for direction mode
  if (!localStorage.getItem(DirectionModeTbl)) {
    const defaultDirectionMode = true
    localStorage.setItem(DirectionModeTbl, `${defaultDirectionMode}`)
    directionModeState = defaultDirectionMode
  }
  else {
    const data = localStorage.getItem(DirectionModeTbl)
    if(data !== null)
      directionModeState = stringToBoolean(data)
  }
    

  const [notes, setNotes] = useState<Note[]>(dbNotes);
  const [selectedNote, setSelectedNote] = useState<Note>({key:'0', value: ''});
  const [editorValue, setEditorValue] = React.useState<string>('');
  const [editorSelectedTab, setEditorSelectedTab] = React.useState<"write" | "preview">("write");
  const [isLightMode, setIsLightMode] = useState<boolean>(lightModeState);
  const [isLTRMode, setIsLTRMode] = useState<boolean>(directionModeState);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSaveNotesToLocalStorage = (allNotes: Note[]) => {
    localStorage.setItem(dataTbl, JSON.stringify(allNotes))
  }

  const handleAddNote = () => {
    let notesClone:Note[] = [...notes]
    let note:Note = {key: nanoid(), value: `Note #${notesClone.length+1}`}
    notesClone.push(note)
    handleSaveNotesToLocalStorage(notesClone)
    setNotes(notesClone)
  }

  const handleDeleteNote = (noteID: string) => {
    let notesClone:Note[] = [...notes]
    notesClone = notesClone.filter(note => note.key !== noteID)
    handleSaveNotesToLocalStorage(notesClone)
    setNotes(notesClone)
  }
  
  const handleDeleteAllNotes = () => {
    handleSaveNotesToLocalStorage([])
    setNotes([])
  }

  const handleSelectNote = (noteID: string) => {
    let notesClone:Note[] = [...notes]
    let selected:Note
    selected = notesClone.filter(note => note.key === noteID)[0]
    if (notesClone.length > 0)
    {
      setSelectedNote(selected)
      setEditorValue(selected.value)
    }
  }

  const handleSaveNote = (value: string) => {
    let newNotes: Note[] = [{key: selectedNote.key, value: value}]
    const otherNotes: Note[] = notes.filter(note => note.key !== selectedNote.key)
    newNotes = [...newNotes, ...otherNotes]
    handleSaveNotesToLocalStorage(newNotes)
    setNotes(newNotes)
  }

  const handleFirstNote = () => {
    if (notes.length > 0) {
      const isSelectedExist:Note[] = notes.filter(note => note.key === selectedNote.key)
      if (isSelectedExist.length < 1) {
        const firstNote:Note = {key: notes[0].key, value: notes[0].value}
        setSelectedNote(firstNote)
        setEditorValue(firstNote.value)
      }
    }
  }

  const applyDisplayMode = (lightMode: boolean) => {
    let state: string
    if (lightMode) { // light mode
      state = 'light'
    }
    else { // dark mode
      state = 'dark'
    }
    document.documentElement.setAttribute("data-theme", state);
  }
  
  const handleChangeDisplayMode = () => {
    let isLight:boolean = !isLightMode
    localStorage.setItem(LightModeTbl, `${isLight}`)
    applyDisplayMode(isLight)
    setIsLightMode(isLight)
  }
  
  const applyDirectionMode = (directionMode: boolean) => {
    let state: string
    if (directionMode) { // ltr mode
      state = 'ltr'
    }
    else { // rtl mode
      state = 'rtl'
    }
    document.documentElement.setAttribute("theme-direction", state);
  }

  const handleChangeDirectionMode = () => {
    let isLTR:boolean = !isLTRMode
    localStorage.setItem(DirectionModeTbl, `${isLTR}`)
    applyDirectionMode(isLTR)
    setIsLTRMode(isLTR)
  }
  
  const handleShowDownloadModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'block'
    }
  }

  useEffect(() => {
    handleFirstNote()
    applyDisplayMode(isLightMode)
    applyDirectionMode(isLTRMode)

  }, [notes, selectedNote])

  return (
    ( notes.length > 0 ) ?
      <React.Fragment>
        <Modal notes={notes} modalRef={modalRef}/>
        <Split
          sizes={[23, 77]} 
          direction="horizontal" 
          className="split"
        >
          <Sidebar 
            notes={notes} 
            selectedNote={selectedNote} 
            addNote={handleAddNote} 
            deleteNote={handleDeleteNote} 
            selectNote={handleSelectNote} 
            deleteAllNotes={handleDeleteAllNotes}
            changeDisplayMode={handleChangeDisplayMode}
            isLightMode={isLightMode}
            changeDirectionMode={handleChangeDirectionMode}
            isLTRMode={isLTRMode}
            showDownloadModal={handleShowDownloadModal}
          />
          <Editor saveNote={handleSaveNote} 
            editorValue={editorValue} 
            setEditorValue={setEditorValue} 
            editorSelectedTab={editorSelectedTab} 
            setEditorSelectedTab={setEditorSelectedTab}
          />
        </Split>
      </React.Fragment>
    :
    <NoNotes addNote={handleAddNote}  />
  );
}

export default App;
