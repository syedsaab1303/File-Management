import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');

  // Fetch folders
  const fetchFolders = async () => {
    const { data } = await axios.get('http://localhost:5000/api/viewstore', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFolders(data);
  };

  useEffect(() => {
    fetchFolders();
  }, [token]);

  // Create folder
  const createFolder = async () => {
    if (!folderName) return alert('Enter folder name');
    try {
      await axios.post(
        'http://localhost:5000/api/folders',
        {
          name: folderName,
          parentFolder: null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFolderName('');
      fetchFolders(); // reload
    } catch (err) {
      alert('Create failed');
    }
  };

  // Delete folder
  const deleteFolder = async (id) => {
    if (!window.confirm('Delete this folder?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/folders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFolders(); // reload
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📁 My Folders</h2>

      <input
        placeholder="New folder name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={createFolder}>Create Folder</button>

      <ul>
        {folders.map((f) => (
          <li key={f._id}>
            {f.name}
            <button onClick={() => deleteFolder(f._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
