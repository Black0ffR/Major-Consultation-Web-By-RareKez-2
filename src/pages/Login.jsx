import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, enrollInCourse } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const from = location.state?.from || '/';
  const courseId = location.state?.courseId;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(formData.email, formData.password);
    
    if (result.success) {
      // If redirected from a course page, auto-enroll
      if (courseId) {
        enrollInCourse(courseId);
      }
      navigate(from === '/login' ? '/dashboard' : from);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="main-content">
      <div className="form-container">
        <h1 className="form-title">Welcome Back</h1>
        <p className="form-subtitle">Login to continue your learning journey</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--gray-600)' }}>
          Don't have an account?{' '}
          <Link to="/signup" className="form-link">
            Sign up here
          </Link>
        </p>

        <div className="alert alert-info" style={{ marginTop: '2rem' }}>
          <strong>Demo Credentials:</strong><br />
          Create a new account or use any email/password you've registered before.
        </div>
      </div>
    </div>
  );
};

export default Login;
