import React from "react";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import { nanoid } from "nanoid";
import Split from "react-split";

export default function App() {
  const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("notes"))||[]);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );
  React.useEffect(()=>
    {localStorage.setItem("notes",JSON.stringify(notes))},
    [notes])
    
  function createNote() {
    const newNote = {
      id: nanoid(),
      body: "Write text here!",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes(oldNotes =>{
      const newArr = []
      for(let i = 0; i < oldNotes.length;i++){
        const oldNote = oldNotes[i]
        if(oldNote.id === currentNoteId){
          newArr.unshift({...oldNote, body: text})
        }
        else{
          newArr.push(oldNote)
        }
      }
      return newArr
    });
  }
  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }
  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            currentNote={findCurrentNote()}
            notes={notes}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <button className="first-note" onClick={createNote}>
            Create note
          </button>
        </div>
      )}
    </main>
  );
}
