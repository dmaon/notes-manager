import * as React from 'react';
import { Component } from 'react';
import ReactMde from "react-mde";
import Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css";

interface Props {
    saveNote: (value: string) => void
    editorSelectedTab: "write" | "preview"
    setEditorSelectedTab: React.Dispatch<React.SetStateAction<"write" | "preview">>
    editorValue: string
    setEditorValue: React.Dispatch<React.SetStateAction<string>>
}

  const Editor:React.FC<Props> = ({editorValue, setEditorValue, editorSelectedTab, setEditorSelectedTab, saveNote, }) => {


  const converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      simpleLineBreaks: true,
      strikethrough: true,
      tasklists: true,
  })  

  return (
    <div className="editor">
      <ReactMde
        value={editorValue}
        onChange={(valueState: string) => {
          setEditorValue(valueState)
          saveNote(valueState)
        }}
        selectedTab={editorSelectedTab}
        onTabChange={setEditorSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={92}
        heightUnits="vh"
      />
    </div>
  );
  
}

export default Editor;