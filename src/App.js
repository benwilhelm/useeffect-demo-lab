import './App.css';
import { useState, useEffect } from 'react';
import { Users } from './components/Users';

const dataUrl = 'https://jsonplaceholder.typicode.com/users';

const fetchUsers = async () => {
  const res = await fetch(dataUrl);
  return await res.json();
};

function App() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    console.log('setting user data');
    fetchUsers().then(setUserData);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Hooks!</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <Users users={userData} />
      </div>
    </div>
  );
}

export default App;
