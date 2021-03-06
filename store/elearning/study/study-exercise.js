import Exercise from "~/services/elearning/study/Exercise";
import * as actionTypes from "~/utils/action-types";
import { RESPONSE_SUCCESS } from "~/utils/config";
import * as mutationTypes from "~/utils/mutation-types";
import * as APIs from "~/utils/endpoints";
import { QUESTION_NAV, EXERCISE_CATEGORIES } from "~/utils/constants";

/**
 * initial state
 */
const state = () => ({
  questions: [],
  result: {},
  submissions: [],
  submissionAdd: {},
  elearningExercises: [],
  paginatedElearningExericses: [],
  elearningExerciseTests: [],
  currentExercise: {},
  currentElearningId: null,
  currentExerciseQuestion: null,
  currentExerciseAnswers: [],
  submission: {
    exercise_id: "",
    start_time: "",
    duration: 0,
    answers: [],
    attachments: []
  },
  currentQuestionId: null,
  autoSubmission: null,
  currentLession: null
});

/**
 * initial getters
 */
const getters = {
  numOfQuestion: state => {
    return state.questions ? state.questions.length : 0;
  },
  currentQuestionIndex: state => {
    return state.questions.findIndex(
      item => item.id == state.currentExerciseQuestion.id
    );
  },
  questionNoOpts: state => {
    const questionNoOpts = !state.questions
      ? []
      : state.questions.map(item => {
          return {
            value: item.id,
            text: item.index
          };
        });
    console.log("[questionNoOpts]", questionNoOpts, state.questions);
    return questionNoOpts;
  },
  tests: state => {
    return state.elearningExerciseTests
      ? state.elearningExerciseTests.length > 0
      : false;
  }
};

const actions = {
  /**
   * Start call before get list exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/startWorkingExerciseUsingPOST
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_QUESTION_START](
    { commit },
    payload
  ) {
    try {
      const { data } = await this.$axios.post(
        APIs.STUDY_EXERCISE_START,
        payload
      );
      console.log("[LIST_QUESTION_START]", data);
      return data;
    } catch (error) {
      console.log("[LIST_QUESTION_START] error", error);
    }
  },

  /**
   * Get questions and answers for exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getQuestionsUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_QUESTION](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[
        actionTypes.ELEARNING_STUDY_EXERCISE.LIST_QUESTION
      ](payload);
      console.log("[LIST_QUESTION]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_EXERCISE_QUESTION_LIST,
          result.data
        );

        // turnof loadingExercise
        commit("event/setExerciseLoading", false, { root: true });
      }

      return result;
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE] LIST_QUESTION.error",
        error
      );
    }
  },

  /**
   * Get result of exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getResultExerciseUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_RESULT](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[
        actionTypes.ELEARNING_STUDY_EXERCISE.LIST_RESULT
      ](payload);
      console.log("[LIST_RESULT]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_RESULT_LIST,
          result.data
        );

        // turnof loadingExercise
        commit("event/setExerciseLoading", false, { root: true });
      }

      return result;
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE] LIST_RESULT.error",
        error
      );
    }
  },

  /**
   * Get student answers for exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getAnswersUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_SUBMISTION](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      console.log("[LIST_SUBMISTION]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_EXERCISE_SUBMISSION_LIST,
          result.data
        );

        // turnof loadingExercise
        commit("event/setExerciseLoading", false, { root: true });
      }

      return result;
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE] LIST_SUBMISTION.error",
        error
      );
    }
  },

  /**
   * Submit answers for exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/submitAnswersUsingPOST
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.ADD_SUBMISTION](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      console.log("[ADD_SUBMISTION]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_EXERCISE_SUBMISSION_ADD,
          result.data
        );
        // turnof loadingExercise
        commit("event/setExerciseLoading", false, { root: true });

        return result;
      }

      return result;
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE] ADD_SUBMISTION.error",
        error
      );
    }
  },

  /**
   * Get exercise list of e-learning
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getElearningExerciseUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_ELEARNING_EXERCISE](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[
        actionTypes.ELEARNING_STUDY_EXERCISE.LIST_ELEARNING_EXERCISE
      ](payload);
      console.log("[LIST_ELEARNING_EXERCISE]", result, payload);
      if (result.success == RESPONSE_SUCCESS) {
        if (payload.category == EXERCISE_CATEGORIES.TEST) {
          commit(
            mutationTypes.ELEARNING_STUDY_EXERCISE
              .SET_STUDY_ELEARNING_EXERCISE_TEST_LIST,
            result.data.content
          );
        }
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_ELEARNING_EXERCISE_LIST,
          result.data.content
        );

        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_PAGINATED_ELEARNING_EXERCISE_LIST,
          result.data
        );

        // turnof loadingExercise
        commit("event/setExerciseLoading", false, { root: true });
      }

      return result;
    } catch (error) {
      console.log("[LIST_ELEARNING_EXERCISE] error", error);
    }
  },

  /**
   * Get exercise list of exercise_list
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_ELEARNING_EXERCISE_2](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[
        actionTypes.ELEARNING_STUDY_EXERCISE.LIST_ELEARNING_EXERCISE_2
      ](payload);
      console.log("[LIST_ELEARNING_EXERCISE_2]", result, payload);
      if (result.success == RESPONSE_SUCCESS) {
        if (payload.category == EXERCISE_CATEGORIES.TEST) {
          commit(
            mutationTypes.ELEARNING_STUDY_EXERCISE
              .SET_STUDY_ELEARNING_EXERCISE_TEST_LIST,
            result.data.content
          );
        }
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_ELEARNING_EXERCISE_LIST,
          result.data.content
        );
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_PAGINATED_ELEARNING_EXERCISE_LIST,
          result.data
        );

      }

      return result;
    } catch (error) {
      console.log("[LIST_ELEARNING_EXERCISE] error", error);
    }
  }


};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_QUESTION_LIST](
    state,
    _list
  ) {
    state.questions = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_QUESTION_START](
    state
  ) {
    console.log("[SET_STUDY_EXERCISE_QUESTION_START]", state.questions);
    // reset submission state
    state.submission = {
      ...state.submission,
      // exercise_id: '',
      // start_time: new Date(),
      duration: 0,
      answers: [],
      attachments: []
    };

    // reset answer
    state.currentExerciseAnswers = [];

    // set the first question
    state.currentExerciseQuestion =
      state.questions && state.questions.length > 0 ? state.questions[0] : null; // set current question is the first
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_RESULT_LIST](
    state,
    _list
  ) {
    state.result = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_SUBMISSION_LIST](
    state,
    _list
  ) {
    state.submissions = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_SUBMISSION_ADD](
    state,
    _submissionAdd
  ) {
    state.submissionAdd = _submissionAdd;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE
    .SET_STUDY_ELEARNING_EXERCISE_TEST_LIST](state, _list) {
    state.elearningExerciseTests = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_ELEARNING_EXERCISE_LIST](
    state,
    _list
  ) {
    state.elearningExercises = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE
    .SET_STUDY_PAGINATED_ELEARNING_EXERCISE_LIST](state, _list) {
    state.paginatedElearningExericses = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_CURRENT](
    state,
    _curr
  ) {
    console.log("[SET_STUDY_EXERCISE_CURRENT", _curr);
    // reset current question
    state.currentExerciseQuestion = null;

    state.currentExercise = _curr;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_CURRENT_BY_NO](
    state,
    _questionId
  ) {
    const currQuestion = state.questions.find(item => item.id == _questionId);
    if (currQuestion) {
      state.currentExerciseQuestion = currQuestion;
    }
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_QUESTION_NAV](
    state,
    _nav
  ) {
    console.log("[SET_STUDY_EXERCISE_QUESTION_NAV]", _nav);
    const currQuestionIndex = state.questions.findIndex(
      item => item.index == state.currentExerciseQuestion.index
    );
    if (currQuestionIndex != -1) {
      if (_nav == QUESTION_NAV.NEXT) {
        state.currentExerciseQuestion = state.questions[currQuestionIndex + 1];
      } else if (_nav == QUESTION_NAV.BACK) {
        state.currentExerciseQuestion = state.questions[currQuestionIndex - 1];
      }
    }
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_SUBMISSION](
    state,
    _submission
  ) {
    console.log("[SET_STUDY_EXERCISE_SUBMISSION]", _submission);
    const updatedAnswer = _submission.answers;
    const updatedExerciseId = _submission.exercise_id;
    const updatedQuestionId = _submission.question_id;

    // update exercise_id
    if (!!updatedExerciseId) {
      state.submission = {
        ...state.submission,
        exercise_id: updatedExerciseId
      };
    }

    // update answer
    if (!!updatedAnswer) {
      let currAnsers = [...state.submission.answers];
      const currAnswerIndex = currAnsers.findIndex(
        item => item.question_id == updatedAnswer.question_id
      );
      if (currAnswerIndex == -1) {
        currAnsers = [...currAnsers, updatedAnswer];
      } else {
        const newUpdatedAnswer = { ...currAnsers[currAnswerIndex], answer: updatedAnswer.answer, choise_answer_id: updatedAnswer.choise_answer_id }
        currAnsers[currAnswerIndex] = newUpdatedAnswer;
      }
      state.submission = { ...state.submission, answers: currAnsers };
      state.currentExerciseAnswers = [...state.submission.answers];
    }

    // update attachment files
    let preAttachments = [...state.submission.attachments];
    if (!!updatedQuestionId) {
      const uploadAttachBeforeIndex = preAttachments.findIndex(
        at => at.question_id == updatedQuestionId
      );
      // if upload file
      if (_submission.file) {
        if (uploadAttachBeforeIndex != -1) {
          preAttachments[uploadAttachBeforeIndex] = _submission;
        } else {
          preAttachments.push(_submission);
        }
      } else {
        // if remove file
        if (uploadAttachBeforeIndex != -1) {
          preAttachments = preAttachments.filter(
            p => p.question_id != updatedQuestionId
          );
        }
      }
      state.submission = { ...state.submission, attachments: preAttachments };

      // update attach_answer_index in state.submission.answers
      const prevAnswers = [...state.submission.answers];
      const attachQuestionIndex = prevAnswers.findIndex(
        at => at.question_id == updatedQuestionId
      );
      let updateAnswer = prevAnswers;
      
      if(attachQuestionIndex != -1) {
        updateAnswer = prevAnswers.map(ans => {
          const fileIndex = state.submission.attachments.findIndex(
            att => att.question_id == ans.question_id
          );

          if (fileIndex == -1) {
            delete ans.attach_answer_index;
          } else {
            ans.attach_answer_index = fileIndex + 1; // base 1
          }
  
          return ans;
        });
      } else {
        const attachFileIndex = state.submission.attachments.findIndex(
          att => att.question_id == updatedQuestionId
        );
        updateAnswer.push({
          question_id: updatedQuestionId,
          attach_answer_index: attachFileIndex + 1
        });
      }

      state.submission.answers = updateAnswer;
    }

    console.log(
      "[SET_STUDY_EXERCISE_SUBMISSION] state.submission",
      state.submission
    );
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_ELEARNING_CURRENT_ID](
    state,
    _curr
  ) {
    state.currentElearningId = _curr;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_QUESTION_CURRENT](
    state,
    _currQuestionId
  ) {
    state.currentQuestionId = _currQuestionId;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_AUTO_SUBMISSION](
    state,
    _auto
  ) {
    state.autoSubmission = _auto;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_CURRENT_LESSION](
    state,
    _lesson
  ) {
    console.log("[SET_STUDY_EXERCISE_CURRENT_LESSION]", _lesson);
    state.currentLession = _lesson;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
