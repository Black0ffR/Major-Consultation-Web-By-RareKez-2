import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { courses } from '../data/courses';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const enrolledCourses = courses.filter(course => 
    user.enrolledCourses?.includes(course.id)
  );

  // Calculate fake progress for demonstration
  const getProgress = (courseId) => {
    // Generate consistent pseudo-random progress based on courseId
    return ((courseId * 17) % 70) + 10; // Between 10-80%
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>My Dashboard</h1>
          <p>Track your learning progress and continue your courses</p>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{enrolledCourses.length}</div>
            <div className="stat-label">Enrolled Courses</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {enrolledCourses.reduce((total, course) => total + (course.lessons?.length || 0), 0)}
            </div>
            <div className="stat-label">Total Lessons</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {Math.round(
                enrolledCourses.reduce((sum, course) => sum + getProgress(course.id), 0) / 
                (enrolledCourses.length || 1)
              )}%
            </div>
            <div className="stat-label">Average Progress</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">
              {enrolledCourses.reduce((total, course) => {
                return total + course.lessons.reduce((sum, lesson) => {
                  return sum + parseInt(lesson.duration);
                }, 0);
              }, 0)}
            </div>
            <div className="stat-label">Minutes of Content</div>
          </div>
        </div>

        <h2 style={{ marginBottom: '1.5rem', color: 'var(--gray-900)' }}>My Courses</h2>

        {enrolledCourses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>No Enrolled Courses Yet</h3>
            <p>Start your learning journey by enrolling in a course</p>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/')}
              style={{ marginTop: '1rem' }}
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="courses-grid">
            {enrolledCourses.map((course) => {
              const progress = getProgress(course.id);
              
              return (
                <div key={course.id} className="course-card">
                  <div className="course-thumbnail">
                    <span>{course.thumbnail}</span>
                  </div>
                  
                  <div className="course-body">
                    <div className="course-category">{course.category}</div>
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-instructor">by {course.instructor}</p>
                    
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--gray-600)'
                      }}>
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="course-actions" style={{ marginTop: '1.5rem' }}>
                      <button 
                        className="btn btn-primary"
                        onClick={() => navigate(`/course/${course.id}`)}
                        style={{ flex: 1 }}
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => navigate('/')}
          >
            Browse More Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
