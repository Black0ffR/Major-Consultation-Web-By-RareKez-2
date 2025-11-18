import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { courses } from '../data/courses';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, enrollInCourse, isEnrolled } = useAuth();

  const handleEnroll = (courseId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/', courseId } });
      return;
    }

    const result = enrollInCourse(courseId);
    if (result.success) {
      alert('Successfully enrolled! Check your dashboard.');
      navigate('/dashboard');
    } else {
      alert(result.error);
    }
  };

  const viewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>Explore Our Courses</h1>
          <p>Start learning today and master new skills from industry experts</p>
        </div>
      </div>

      <div className="container">
        <div className="courses-grid">
          {courses.map((course) => {
            const enrolled = isEnrolled(course.id);
            
            return (
              <div key={course.id} className="course-card">
                <div 
                  className="course-thumbnail"
                  onClick={() => viewCourse(course.id)}
                >
                  <span>{course.thumbnail}</span>
                </div>
                
                <div className="course-body">
                  <div className="course-category">{course.category}</div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-instructor">by {course.instructor}</p>
                  <p className="course-description">{course.description}</p>
                  
                  <div className="course-actions">
                    <button 
                      className="btn btn-outline"
                      onClick={() => viewCourse(course.id)}
                    >
                      View Details
                    </button>
                    
                    {enrolled ? (
                      <button 
                        className="btn btn-secondary"
                        onClick={() => navigate('/dashboard')}
                      >
                        Continue Learning
                      </button>
                    ) : (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleEnroll(course.id)}
                        disabled={!isAuthenticated && false}
                      >
                        {isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
