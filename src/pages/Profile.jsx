import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your account settings</p>
        </div>
      </div>

      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ 
            background: 'white', 
            padding: '2.5rem', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '2rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid var(--gray-200)'
            }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                margin: '0 auto 1rem'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 style={{ marginBottom: '0.5rem' }}>{user.name}</h2>
              <p style={{ color: 'var(--gray-600)' }}>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--gray-900)' }}>Account Information</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 600, 
                  marginBottom: '0.5rem',
                  color: 'var(--gray-700)'
                }}>
                  Full Name
                </label>
                <div style={{ 
                  padding: '0.75rem', 
                  background: 'var(--gray-50)', 
                  borderRadius: '6px',
                  color: 'var(--gray-900)'
                }}>
                  {user.name}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 600, 
                  marginBottom: '0.5rem',
                  color: 'var(--gray-700)'
                }}>
                  Email Address
                </label>
                <div style={{ 
                  padding: '0.75rem', 
                  background: 'var(--gray-50)', 
                  borderRadius: '6px',
                  color: 'var(--gray-900)'
                }}>
                  {user.email}
                </div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 600, 
                  marginBottom: '0.5rem',
                  color: 'var(--gray-700)'
                }}>
                  Enrolled Courses
                </label>
                <div style={{ 
                  padding: '0.75rem', 
                  background: 'var(--gray-50)', 
                  borderRadius: '6px',
                  color: 'var(--gray-900)'
                }}>
                  {user.enrolledCourses?.length || 0} courses
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <button 
                className="btn btn-outline"
                onClick={() => navigate('/dashboard')}
                style={{ width: '100%' }}
              >
                Go to Dashboard
              </button>
              
              <button 
                className="btn btn-danger"
                onClick={handleLogout}
                style={{ width: '100%' }}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="alert alert-info" style={{ marginTop: '2rem' }}>
            <strong>Note:</strong> This is a demo application. In a production environment, you would be able to edit your profile information, change your password, and manage additional settings.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
