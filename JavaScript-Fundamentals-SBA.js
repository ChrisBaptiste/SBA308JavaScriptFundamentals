

//SBA 308 Java-Script Fundamentals

//     1. Checking that the assignment group is belonging to the course.
//     2. Filtering out assignments that are not dued based on the current date.
//     3. Processing each submission and applying a 10% penalty if the submission is late.
//     4. Calculating a weighted average score for each learner along with their individual assignment percentages.
//     5. Returning the results in an array.

// storing course info for our JavaScript class.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // creating the assignment group for the course, which contains the assignments.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,      // Ensuring CourseInfo.id matches AssignmentGroup.course_id.
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15", // This assignment is not dued yet, so it is being skipped.
        points_possible: 500
      }
    ]
  };
  
  //there are 2 learners. (learner 125 and 132) Each object is representing one submission by a learner.
  const LearnerSubmissions = [
    {
      learner_id: 125, // Submission for learner 125.
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125, // Another submission for learner 125.
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125, // Although this is for learner 125, assignment 3 is not dued yet so it will be skipped.
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132, // Submission for learner 132.
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132, // Another submission for learner 132.
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  
  // This function is calculating each learner's weighted average score.
  // It is using the course info, the assignment group, and learner submissions.
  function getLearnerData(course, assignmentGroup, submissions) {
    try {
      // Checking to see if the assignment group is belonging to the given course.
      // If it is not, the function will be stopped by throwing an error.
      if (assignmentGroup.course_id !== course.id) {
        throw new Error("Error, Assignment group is mismatched!!.");
      }
  
      // Prepping an empty object to hold assignments that are dued.
      const assignmentsDue = {};
      const currentDate = new Date(); // Getting today's date.
  
      // Looping over all assignments to see which ones are dued.
      for (let i = 0; i < assignmentGroup.assignments.length; i++) {
        const currentAssignment = assignmentGroup.assignments[i];
  
        // Checking that points_possible is a number.
        // If it is not, we are converting it from a string to a number.
        if (typeof currentAssignment.points_possible !== "number") {
          currentAssignment.points_possible = Number(currentAssignment.points_possible);
          // Throwing an error if points_possible is not equal to itself. meaning if its not a number
          if (currentAssignment.points_possible !== currentAssignment.points_possible) {
            throw new Error("Invalid points_possible for assignment id " + currentAssignment.id);
          }
        }
  
        // Converting the due date from a string into a Date object.
        const dueDate = new Date(currentAssignment.due_at);
  
        // Checking if the assignment is dued (its date is today or before).
        // If it is, we are adding it to assignmentsDue.
        if (dueDate <= currentDate) {
          assignmentsDue[currentAssignment.id] = currentAssignment;
        }
      }
  
      // Prepping an empty object to hold data for each learner.
      const learners = {};
  
      // Looping through each submission to process it.
      for (let j = 0; j < submissions.length; j++) {
        const submissionEntry = submissions[j];
        const learnerId = submissionEntry.learner_id;
        const assignmentId = submissionEntry.assignment_id;
        const submissionInfo = submissionEntry.submission;
  
        // Checking if the assignment is in our assignmentsDue.
        // If assignmentsDue is undefined, then the assignment is not dued, so we are skipping it with [continue].
        if (assignmentsDue[assignmentId] === undefined) {
          continue;
        }
  
        // Getting the details for the current assignment.
        const assignmentInfo = assignmentsDue[assignmentId];
  
        // Checking that the submission score is a number.
        // If it is not, we are converting from a string to a number.
        if (typeof submissionInfo.score !== "number") {
          submissionInfo.score = Number(submissionInfo.score);
          if (submissionInfo.score !== submissionInfo.score) {
            throw new Error("Invalid submission score for learner " + learnerId + " on assignment " + assignmentId);
          }
        }
  
        // Converting the submission date and assignment due date into Date objects.
        const submittedDate = new Date(submissionInfo.submitted_at);
        const assignmentDueDate = new Date(assignmentInfo.due_at);
  
        // Starting with the original score.
        let adjustedScore = submissionInfo.score;
        // Checking if the submission is made after the due date.
        // If it is, we are subtracting a 10% penalty.
        if (submittedDate > assignmentDueDate) {
          adjustedScore = adjustedScore - (assignmentInfo.points_possible * 0.1);
          // Making sure that the adjusted score is not less than zero.
          if (adjustedScore < 0) {
            adjustedScore = 0;
          }
        }
        // Calculating the percentage score for this assignment.
        const assignmentPercentage = adjustedScore / assignmentInfo.points_possible;
  
        // Checking if this learner is already in our learners object.
        // If not, we are adding the learner.
        // This will happen for both learner 125 and learner 132.
        if (learners[learnerId] === undefined) {
          learners[learnerId] = {
            id: learnerId,
            totalScore: 0,    // totalScore is going to hold the sum of adjusted scores.
            totalPoints: 0,   // totalPoints is going to hold the sum of points possible.
            assignmentPercentages: {} // assignmentPercentages is going to store the percentage for each assignment.
          };
        }
        // Adding the submission's data to the learners.
        learners[learnerId].totalScore += adjustedScore;
        learners[learnerId].totalPoints += assignmentInfo.points_possible;
        learners[learnerId].assignmentPercentages[assignmentId] = assignmentPercentage;
      }
  
      // Prepping an empty array to hold the final results.
      const resultArray = [];
      // Looping through each learner in our learners object.
      // This loop will create one result object for each learner (one for learner 125 and one for learner 132).
      for (const learnerKey in learners) {
        const learnerData = learners[learnerKey];
        let averageScore = 0;
        // Calculating the weighted average if there are any assignments.
        if (learnerData.totalPoints > 0) {
          averageScore = learnerData.totalScore / learnerData.totalPoints;
        }
        // Creating an object for this learner with their id and average score.
        const learnerResult = {
          id: learnerData.id,
          avg: averageScore
        };
  
        // Adding the learner's result to the final result array.
        resultArray.push(learnerResult);
      }
  
      // Returning the final array of results.
      return resultArray;
  
    } catch (error) {
      // Logging any error that occurs and returning an empty array.
      console.error("Error processing learner data" + error.message);
      return []; // Returning an empty array as a fallback because the function should return an array of learner data.
    }
  }
  
  // running the final processed results of the function.
  const finalResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(finalResult);
  