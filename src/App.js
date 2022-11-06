import './App.css';
import { useState } from 'react';
import { Users } from './components/Users';
// import { users as userData } from './data/users';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [userData, setUserData] = useState([]);

  fetch(usersUrl)
    .then((response) => response.json())
    .then((json) => {
      console.log('setting user data');
      setUserData(json);
    });

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
