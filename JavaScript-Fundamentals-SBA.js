

const courseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const assignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2025-03-07",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2025-03-8",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "2025-03-09",
            points_possible: 500
        }
    ]
};


// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2025-03-06",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2025-03-07",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2025-03-09",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2025-03-07",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2025-03-08",
            score: 140
        }
    }
];

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    try {
      // Validate that the assignment group belongs to the right course.
      if (assignmentGroup.course_id !== courseInfo.id) {
        throw new Error("Error! Assignment group does not belong to the provided course.");
      }
    } catch (error) {
      console.error("Input Invalid:");
      throw error;
    }
  }

  

