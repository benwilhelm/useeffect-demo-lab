import { useState, useEffect } from 'react';

export const Users = ({ users }) => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className="row">
      <div className="col col-md-3">
        <UsersList
          users={users}
          selectedUserId={selectedUserId}
          selectUser={setSelectedUserId}
        />
      </div>
      <div className="col col-md-9">
        {selectedUser ? <SingleUser user={selectedUser} /> : <NoUserSelected />}
      </div>
    </div>
  );
};

const UsersList = ({ users, selectedUserId, selectUser }) => {
  const ulClassList = (user, selectedId) => {
    const classes = ['list-group-item'];
    if (user.id === selectedId) {
      classes.push('active');
    }
    return classes;
  };

  return (
    <ul className="list-group">
      {users.map((user) => {
        const classes = ulClassList(user, selectedUserId);
        return (
          <li key={user.id} className={classes.join(' ')}>
            <button
              onClick={() => selectUser(user.id)}
              className="btn btn-block btn-link"
              style={{ textAlign: 'left' }}
            >
              {user.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const SingleUser = ({ user }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const userPostsUrl = `https://jsonplaceholder.typicode.com/users/${user.id}/posts`;
    setPosts([]);
    fetch(userPostsUrl)
      .then((res) => res.json())
      .then((json) => setPosts(json));
  }, [user.id]);

  return (
    <div className="row">
      <div className="col col-md-7">
        <h2>{user.name}</h2>
        <dl>
          <dt>Username</dt>
          <dd>{user.username}</dd>
          <dt>email</dt>
          <dd>{user.email}</dd>
          <dt>Phone</dt>
          <dd>{user.phone}</dd>
          <dt>Website</dt>
          <dd>{user.website}</dd>
          <dt>Company</dt>
          <dd>{user.company.name}</dd>
        </dl>
      </div>
      <div className="col col-md-5">
        <UserPosts user={user} posts={posts} />
      </div>
    </div>
  );
};

const NoUserSelected = () => <p className="info">Please select a user</p>;

const UserPosts = ({ user, posts }) => {
  return (
    <>
      <h4>Posts by {user.name}</h4>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};
