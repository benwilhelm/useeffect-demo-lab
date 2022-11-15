const abortableFetch = async (request, options) => {
  const onSuccess = options.onSuccess || (() => {});
  const onFailure = options.onFailure || (() => {});
  const onComplete = options.onComplete || (() => {});

  try {
    const response = await fetch(request);
    const json = await response.json();
    if (response.ok) {
      onSuccess(json);
    } else {
      onFailure(response);
    }
    onComplete(response);
    return response;
  } catch (err) {
    if (err.message.match(/the user aborted a request/i)) {
      console.warn('Network request aborted', err);
    } else {
      throw err;
    }
  }
};

export const getUserPosts = (userId, options) => {
  const abortController = new AbortController();
  const request = new Request(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
    {
      signal: abortController.signal,
    }
  );

  if (!options) return fetch(request);

  abortableFetch(request, options);
  return () => abortController.abort();
};
