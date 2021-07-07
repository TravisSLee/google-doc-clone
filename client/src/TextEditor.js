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
    const [socket, setSocket ] = useState()
    const [quill, setQuill] = useState()
    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)
        return () => {
            s.disconnect()
        }
    }, [])

    useEffect(() => {
      if (socket == null || quill == null) return
      quill.on('text-change'), (delta, oldDelta, source) => {
        if (source !== 'user') return
        socket.emit("send-changes", delta)
      }
      return () => {
        quill.off('text-change',handler)
      }
    }, [socket,quill])
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
