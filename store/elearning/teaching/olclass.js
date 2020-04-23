import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import OlClass from "~/services/elearning/teaching/Olclass";
import Invites from "~/services/elearning/teaching/OlclassInvites";
import Block from "~/services/elearning/teaching/OlclassBlock";
import Attendances from "~/services/elearning/teaching/OlclassAttendances";
import BaseAttendance from "~/services/elearning/teaching/OlclassLesson";
import Lessons from "~/services/elearning/teaching/OlclassLessons";

/**
 * initial state
 */
const state = () => ({
  OnlineClass: [],
  Attendances: [],
  Invites: [],
  Lessons: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.TEACHING_OLCLASSES.LIST]({ commit }, options) {
    try {
      const result = await new OlClass(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      commit(
        mutationTypes.TEACHING_OLCLASSES.SET_TEACHING_OLCLASS_LIST,
        result
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
  },

  async [actionTypes.TEACHING_OLCLASSES.DETAIL]({ commit }, class_id) {
    try {
      const result = await new OlClass(this.$axios)[actionTypes.BASE.DETAIL](
        class_id
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
    return null;
  },

  async [actionTypes.TEACHING_OLCLASSES.ADD]({ commit }, payload) {
    try {
      const result = await new OlClass(this.$axios)["postWithRawJson"](payload);
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] add.error", error);
    }
  },

  async [actionTypes.TEACHING_OLCLASSES.EDIT]({ commit }, payload) {
    try {
      const result = await new OlClass(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.TEACHING_ANSWER.SET_TEACHING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[TEACHING Olclass] edit.error", error);
    }
  },

  async [actionTypes.TEACHING_OLCLASSES.DELETE]({ commit }, options) {
    try {
      const result = await new OlClass(this.$axios)["deleteWithRawJson"](options);
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] delete.error", error);
    }
  },

  // Invites
  async [actionTypes.TEACHING_OLCLASS_INVITES.LIST]({ commit }, options) {
    try {
      const result = await new Invites(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      commit(
        mutationTypes.TEACHING_OLCLASS_INVITES
          .SET_TEACHING_OLCLASS_INVITES_LIST,
        result
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
  },

  async [actionTypes.TEACHING_OLCLASS_INVITES.ADD]({ commit }, options) {
    try {
      const result = await new Invites(this.$axios)['postWithRawJson'](
        options
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
  },
  
  async [actionTypes.TEACHING_OLCLASSES.BLOCK]({ commit }, options) {
    try {
      const result = await new Block(this.$axios)['postWithRawJson'](
        options
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
  },
  
  async [actionTypes.TEACHING_OLCLASSES.UNBLOCK]({ commit }, options) {
    try {
      const result = await new Block(this.$axios)['deleteWithRawJson'](
        options
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
  },

  // Lesson
  async [actionTypes.TEACHING_OLCLASS_LESSONS.LIST]({ commit }, options) {
    try {
      const result = await new Lessons(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      commit(
        mutationTypes.TEACHING_OLCLASS_LESSONS
          .SET_TEACHING_OLCLASS_LESSONS_LIST,
        result
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
  },
  
  // TTENDANCES
  async [actionTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES.LIST]({ commit }, options) {
    try {
      const result = await new BaseAttendance(this.$axios)["getWithMiddleID"](
        options, options.id, options.after
      );
      commit(
        mutationTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES
          .SET_TEACHING_OLCLASS_LESSON_ATTENDANCES_LIST,
        result
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
  },

  async [actionTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES.EDIT]({ commit }, options) {
    try {
      const result = await new Attendances(this.$axios)['putWithRawJson'](
        options
      );
      return result;
    } catch (error) {
      console.log("[TEACHING Olclass] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.TEACHING_OLCLASSES.SET_TEACHING_OLCLASS_LIST](state, _OnlineClass) {
    state.OnlineClass = _OnlineClass;
  },
  [mutationTypes.TEACHING_OLCLASS_INVITES.SET_TEACHING_OLCLASS_INVITES_LIST](state, _Invites) {
    state.Invites = _Invites;
  },
  [mutationTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES.SET_TEACHING_OLCLASS_LESSON_ATTENDANCES_LIST](state, _Attendances) {
    state.Attendances = _Attendances;
  },
  [mutationTypes.TEACHING_OLCLASS_LESSONS.SET_TEACHING_OLCLASS_LESSONS_LIST](state, _Lessons) {
    state.Lessons = _Lessons;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};