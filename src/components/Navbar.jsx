import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          EduLearn
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          
          {isAuthenticated && (
            <li>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          )}
          
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="nav-link">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-greeting">
                Hello, {user?.name}
              </li>
              <li>
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
