const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'Potato@88' // CHANGE THIS!
};

export const login = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && 
      password === ADMIN_CREDENTIALS.password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminSession', Date.now().toString());
    }
    return true;
  }
  return false;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminSession');
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const session = localStorage.getItem('adminSession');
  if (session && Date.now() - parseInt(session) > 86400000) {
    logout();
    return false;
  }
  return isAdmin;
};
