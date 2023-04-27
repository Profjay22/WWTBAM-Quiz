import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from '../App';

function UsernameInterface() {
  const [username, setUsername] = useState('');
  const [showApp, setShowApp] = useState(false);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const delay = (duration, callback) => {
            setTimeout(()=> {
                callback();
            }, duration);
  }
  const handleStartClick = () => {
    if (username.trim() === '') {
      toast.error('Username cannot be empty');
      return;
    }

    if (username.length < 3) {
      toast.error(`Username cannot of length ${username.length}`);
    } else {
        toast.success(`Welcome ${username}`);
    
        delay (2000, () => setShowApp(true));
      
    }
  };

  return (
    showApp ? (
        <App username = {username}/>
    ) : (
      <div
        style={{
          backgroundColor: '#020230',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            marginBottom: '20px',
            width: '300px',
            textAlign: 'center',
          }}
          placeholder="Enter username"
        />
        <button
          onClick={handleStartClick}
          style={{
            backgroundColor: 'white',
            color: '#020230',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            fontWeight: 'bold',
            width: '150px',
          }}
        >
          Start
        </button>
        <ToastContainer />
      </div>
    )
  );
  
}

export default UsernameInterface;
