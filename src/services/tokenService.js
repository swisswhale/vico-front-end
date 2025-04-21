

export function setToken(token) {
    localStorage.setItem('token', token);
  }
  
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  export function removeToken() {
    localStorage.removeItem('token');
  }
  
  export function getUserFromToken() {
    const token = getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expired = payload.exp < Date.now() / 1000;
      if (expired) {
        removeToken();
        return null;
      }
      return { id: payload.userId, username: payload.username };
    } catch {
      removeToken();
      return null;
    }
  }
  
  export function isTokenValid() {
    const token = getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }

