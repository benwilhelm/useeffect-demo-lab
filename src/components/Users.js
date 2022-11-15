import { useState, useEffect } from 'react';
import { getUserPosts } from '../data/users.service';

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

const useUserPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    return getUserPosts(userId, {
      onSuccess: setPosts,
      onFailure: setError,
      onComplete: () => setIsFetching(false),
    });
  }, [userId]);

  return [posts, isFetching, error];
};

const SingleUser = ({ user }) => {
  const [posts, fetching, error] = useUserPosts(user.id);
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
        {fetching ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <UserPosts user={user} posts={posts} />
        )}
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

const Loading = () => <p>Loading...</p>;
const Error = ({ error }) => <pre>{JSON.stringify(error, null, 2)}</pre>;
