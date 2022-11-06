import './App.css';
import { Users } from './components/Users';
import { users as userData } from './data/users';

function App() {
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
