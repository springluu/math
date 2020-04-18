import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Exercise from "~/services/elearning/teaching/Exercise";

/**
 * initial state
 */
const state = () => ({
  exercises: [],
  currentExercise: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_EXERCISE.LIST]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(mutationTypes.ELEARNING_TEACHING_EXERCISE.SET_TEACHING_EXERCISE_LIST, result);
    } catch (error) {
      console.log("[Teaching exercises] list.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_TEACHING_EXERCISE.DETAIL]({ commit }, id) {
    try {
      // const result = await new Exercise(this.$axios)[actionTypes.BASE.DETAIL](
      //   id
      // );
      const result = {
        code: "200",
        success: true,
        data: {
          id: "e698a8ea-4e12-11ea-b77f-2e728ce88125",
          // type: 'CHOICE',
          type: 'ESSAY',
          title: "Bài tập toán đại số lớp 11",
          lesson_id: 11,
          elearning_id: 10,
          questions: [
            {
              id: 13,
              name: "Câu hỏi toán học",
              content: "Có bao nhiêu số tự nhiên",
              index: 1,
              point: 0.5,
              answers: [
                {
                  id: 23,
                  name: "Câu trả lời 1",
                  answer: "20 số",
                  correct: false
                },
                {
                  id: 24,
                  name: "Câu trả lời 2",
                  answer: "30 số",
                  correct: false
                },
                {
                  id: 25,
                  name: "Câu trả lời 3",
                  answer: "Vô số",
                  correct: true
                },
                {
                  id: 26,
                  name: "Câu trả lời 4",
                  answer: "25 số",
                  correct: false
                }
              ]
            },
            {
              id: 14,
              name: "Câu hỏi toán học nâng cao",
              content: "Có bao nhiêu số thập phân",
              index: 3,
              point: 0.5,
              answers: [
                {
                  id: 13,
                  name: "Câu trả lời 1",
                  answer: "12 số",
                  correct: false
                },
                {
                  id: 14,
                  name: "Câu trả lời 2",
                  answer: "130 số",
                  correct: false
                },
                {
                  id: 15,
                  name: "Câu trả lời 3",
                  answer: "23 số",
                  correct: false
                },
                {
                  id: 16,
                  name: "Câu trả lời 4",
                  answer: "Vô số",
                  correct: true
                }
              ]
            }
          ]
        },
        message: "success"
      }
      commit(mutationTypes.ELEARNING_TEACHING_EXERCISE.SET_TEACHING_EXERCISE_DETAIL, result.data)
      return result;
    } catch (error) {
      console.log("[Teaching exercise] detail.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_CREATING_EXERCISES.EDIT]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Teaching exercises] edit.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_CREATING_EXERCISES.DELETE]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_DELETE, result);
    } catch (error) {
      console.log("[Teaching exercises] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_TEACHING_EXERCISE.SET_TEACHING_EXERCISE_LIST](state, exercises) {
    console.log("SET_ELEARNING_TEACHING_EXERCISES_LIST", exercises);
    state.exercises = exercises;
  },
  [mutationTypes.ELEARNING_TEACHING_EXERCISE.SET_TEACHING_EXERCISE_DETAIL](state, exercise) {
    console.log("SET_ELEARNING_TEACHING_EXERCISES_DETAIL", exercise);
    state.currentExercise = exercise;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
