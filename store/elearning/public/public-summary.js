import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Summary from "~/services/elearning/public/Summary";
import { get } from "lodash";

/**
 * initial state
 */
const state = () => ({
  elearnings: null,
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_PUBLIC_SUMMARY.LIST]({ commit }, params) {
    try {
      const options = { params };
      const result = await new Summary(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      // set to mutation
      commit(
        mutationTypes.ELEARNING_PUBLIC_SUMMARY
          .SET_ELEARNING_PUBLIC_SUMMARY_LIST,
        result
      );
    } catch (error) {
      commit(
        mutationTypes.ELEARNING_PUBLIC_SUMMARY
          .SET_ELEARNING_PUBLIC_SUMMARY_LIST,
        null
      );
      console.log("[Elearning Summary] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_PUBLIC_SUMMARY.SET_ELEARNING_PUBLIC_SUMMARY_LIST](
    state,
    elearnings
  ) {
    state.elearnings = get(elearnings, "data", null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
