import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email, password) => {
    // Simulate authentication - in production, validate against backend
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser({ ...userWithoutPassword, enrolledCourses: foundUser.enrolledCourses || [] });
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      enrolledCourses: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto-login after signup
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const enrollInCourse = (courseId) => {
    if (!user) return { success: false, error: 'Must be logged in' };

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return { success: false, error: 'Already enrolled in this course' };
    }

    // Update user's enrolled courses
    const updatedUser = {
      ...user,
      enrolledCourses: [...user.enrolledCourses, courseId]
    };
    
    setUser(updatedUser);

    // Update in users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].enrolledCourses = updatedUser.enrolledCourses;
      localStorage.setItem('users', JSON.stringify(users));
    }

    return { success: true };
  };

  const isEnrolled = (courseId) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    enrollInCourse,
    isEnrolled,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
