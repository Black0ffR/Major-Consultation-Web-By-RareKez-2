import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { courses } from '../data/courses';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, enrollInCourse, isEnrolled } = useAuth();
  
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">❌</div>
            <h3>Course Not Found</h3>
            <p>The course you're looking for doesn't exist.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/course/${id}`, courseId: course.id } });
      return;
    }

    const result = enrollInCourse(course.id);
    if (result.success) {
      alert('Successfully enrolled! Redirecting to dashboard...');
      navigate('/dashboard');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="main-content">
      <div className="container course-detail-container">
        <div className="course-header">
          <div className="course-category">{course.category}</div>
          <h1 className="course-title">{course.title}</h1>
          
          <div className="course-meta">
            <div className="meta-item">
              <span>👨‍🏫</span>
              <span>{course.instructor}</span>
            </div>
            <div className="meta-item">
              <span>📚</span>
              <span>{course.lessons?.length || 0} Lessons</span>
            </div>
            <div className="meta-item">
              <span>⏱️</span>
              <span>
                {course.lessons?.reduce((total, lesson) => {
                  const mins = parseInt(lesson.duration);
                  return total + mins;
                }, 0) || 0} minutes total
              </span>
            </div>
          </div>

          {isAuthenticated ? (
            <>
              <p className="course-description" style={{ marginTop: '1.5rem' }}>
                {course.fullDescription}
              </p>
              
              {course.instructorBio && (
                <div style={{ marginTop: '2rem' }}>
                  <h3>About the Instructor</h3>
                  <p style={{ color: 'var(--gray-700)', marginTop: '0.5rem' }}>
                    {course.instructorBio}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="course-description" style={{ marginTop: '1.5rem' }}>
                {course.description}
              </p>
              <div className="alert alert-info" style={{ marginTop: '1.5rem' }}>
                🔒 Login to see full course details, lesson list, and instructor bio
              </div>
            </>
          )}

          <div style={{ marginTop: '2rem' }}>
            {enrolled ? (
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={handleEnroll}
              >
                {isAuthenticated ? 'Enroll in This Course' : 'Login to Enroll'}
              </button>
            )}
          </div>
        </div>

        {isAuthenticated && course.lessons && (
          <div className="lessons-list">
            <h2 style={{ marginBottom: '1.5rem' }}>Course Curriculum</h2>
            {course.lessons.map((lesson, index) => (
              <div key={lesson.id} className="lesson-item">
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div className="lesson-number">{index + 1}</div>
                  <div className="lesson-info">
                    <div className="lesson-title">{lesson.title}</div>
                    <div className="lesson-duration">⏱️ {lesson.duration}</div>
                  </div>
                </div>
                {enrolled && (
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                    Start Lesson
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {isAuthenticated && course.previewVideo && (
          <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Preview Video</h3>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
                src={course.previewVideo}
                title="Course Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
