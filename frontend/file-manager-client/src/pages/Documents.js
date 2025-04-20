import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Documents = ({ token }) => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folderId, setFolderId] = useState('');

  const fetchDocs = async () => {
    const res = await axios.get(`http://localhost:5000/api/filter?search=`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDocuments(res.data);
  };

  const createDoc = async () => {
    if (!title || !folderId) return alert('Title and Folder ID required');
    try {
      await axios.post(
        'http://localhost:5000/api/documents',
        { title, content, folder: folderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle('');
      setContent('');
      setFolderId('');
      fetchDocs();
    } catch (err) {
      alert('Document create failed');
    }
  };

  const deleteDoc = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDocs();
    } catch (err) {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📄 Documents</h2>

      <input
        placeholder="Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Document Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        placeholder="Folder ID"
        value={folderId}
        onChange={(e) => setFolderId(e.target.value)}
      />
      <button onClick={createDoc}>Create Document</button>

      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            {doc.title} – 📂 {doc.folderPath}
            <button onClick={() => deleteDoc(doc.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
