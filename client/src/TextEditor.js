import React from 'react'
import { useCallback, useEffect, useState  } from "react"
import "quill/dist/quill.snow.css"
import Quill from "quill"
import { io } from 'socket.io-client'


const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]
export default function TextEditor() {
    const [quill, setQuill] = useState()
    useEffect(() => {
        const socket = io("http://localhost:3001")
        return () => {
            socket.disconnect()
        }
    }, [])
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
    
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
          theme: "snow",
          modules: { toolbar: TOOLBAR_OPTIONS },
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q)
      }, [])
        

    return (
        <div id="container" ref={wrapperRef}>
            
        </div>
    )
}
