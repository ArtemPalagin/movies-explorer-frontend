export const BASE_URL = 'https://api.plg.movies.students.nomoredomains.rocks';

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then((response) => {
    if (response.ok){
      return response.json();
    } else {
      throw new Error()
    }
  });
}; 

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    if (response.ok){
      return response.json();
    } else {
      throw new Error()
    }
  });
}; 