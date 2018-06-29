export const login = user => (
  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    method: 'POST',
    url: 'api/session',
    data: user
  })
);

export const logout = () => (
  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    method: 'DELETE',
    url: 'api/session',
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: 'api/users',
    data: user
  })
);
