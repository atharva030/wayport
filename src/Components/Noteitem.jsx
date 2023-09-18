import React from "react";

function Noteitem(note) {
  return (
    // <div className="note">
    //   <p>ID: {id}</p>
    //   <p>Title: {title}</p>
    // </div>
    <tr key={note.id}>
      <td>{note.id}</td>
      <td>{note.title}</td>
      <td>{note.desc}</td>
    </tr>
  );
}

export default Noteitem;
