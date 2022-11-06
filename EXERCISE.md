# **Lab:** Dynamic resource loading with `useEffect`

## The Brief

**20-40min**

As our application currently stands, we can fetch a list of user data from the network and select individual user profiles to view. However, we would like to list blog posts written by a given user on his or her profile page, and our `/users` endpoint does not return that information. 

We'll need to make a separate call to `https://jsonplaceholder.typicode.com/users/:userId/posts` in order to load the list of blog posts on each user profile page.

---

## Step 1: The Component

Let's create a component to start with, called `UserPosts`. Place it in `src/components/Users.js`. 
* It will display a title "Posts by [user.name]"
* It will display a list of posts titles written by that user

Decide what the shape of the data needs to be for this component's props. 

---

## Step 2: The Effect Function

What is the effect that you want to execute? Can you write a plain JavaScript function that will achieve this effect? This function should be independent of 

<details>
  <summary>Hint</summary>

  It probably looks something like this:

  ```javascript
  const fetchUserPosts = async (userId) => {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    const res = await fetch(url);
    return res.json();
  }
  ```
</details>

---

## Step 3: The Effect Hook

To assemble the full `useEffect` hook you'll need to:

* execute the effect function above within the callback passed as the first argument. 
* pass an array of dependencies as the second argument to `useEffect`. Our effect has one dependency. Can you determine what it is? (hint, your linter can probably tell you).
* store the result of our effect in a state variable so it can be accessed in the rendered JSX.
<p>&nbsp;</p>
<details>
  <summary><strong>The full useEffect hook</strong></summary>

  ```javascript

    const [posts, setPosts] = useState([]);
    useEffect(() => {
      fetchUserPosts(user.id).then(setPosts)
    }, [ user.id ]);
  ```
</details>
<p>&nbsp;</p>


Finally, based on the design of your component in step 1, you'll need to decide where in your component tree to put these hooks. You can either:

* Place the hook _above_ `UserPosts` in the component tree, and pass the posts array in as a prop

or

* Put the hook _inside_ the `UserPosts` component, which will then only receive the user as a prop and hold the posts as a state variable.

Discuss with your partner the implications of each approach.

**If you've done everything correctly, you should see a new list of posts loading for each user profile.**

<p>&nbsp;</p>

> **Break it for fun!**
>
> If you've made it this far and it all works, try passing an empty array for the dependencies. What happens? Can you articulate why? If it appears to work as before, try selecting a different user.
>
> What if you remove the dependency argument altogether? (Hint: check your devtools network tab if you don't see anything amiss). 
<p>&nbsp;</p>

---

## Bonus: Stretch Goals

If you've made it this far and you have time left in the lab, here are some stretch goals to work on:

### Stretch Goal 1: UX Improvements

Notice how as you navigate between different user profiles, the update to the list of posts lags behind the update to the rest of the user profile on the page. This is expected since the users are stored in memory after the first fetch, while the posts have to be loaded over the network. It's a bit disorienting for the user though. And it could lead to a real bug if for instance a request to the posts URL failed when navigating from one user profile to another. In that case, you'd be left with a user profile for one user, and the posts of the previously-displayed user on screen. 

Can you make it so that the old posts are cleared from the page instantly when clicking on a new profile? Can you provide a user cue ont the to indicate that there's a request in flight while waiting for the new posts to load?

### Stretch Goal 2: Extract to a Single Hook 

The great thing about React's build-in hooks is that they can be combined to create your own custom hooks that solve problems specific to your domain. Spend a little time with the [React docs](https://reactjs.org/docs/hooks-custom.html) and see if you can extract this logic to a custom hook called `useUserPosts`. 

