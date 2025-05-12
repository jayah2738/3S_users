// /components/Grade.js
import Lesson from './Lesson';

const Grade = ({ gradeData, gradeName }) => {
  return (
    <div>
      <h3>{gradeName}</h3>
      {gradeData.lessons.map(lesson => (
        <Lesson key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
};

export default Grade;