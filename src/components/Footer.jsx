import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About EduLearn</h3>
            <p>
              Empowering learners worldwide with high-quality online courses.
              Master new skills, advance your career, and achieve your goals.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Courses</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li>Email: support@edulearn.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Learning St, Education City</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                📘
              </a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                🐦
              </a>
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
                💼
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                📷
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} EduLearn. All rights reserved. Built with passion for education.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
