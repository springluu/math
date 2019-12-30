import * as actionTypes from '../utils/action-types';

export default class BaseService {

  constructor($axios, $api) {
    this.$axios = $axios;
    this.$api = $api;
  }

  async [actionTypes.BASE.LIST](payload) {
    const {
      data
    } = await this.$axios.get(this.$api, payload);

    const result = data ? data : {};
    console.log("[BASE.LIST] result", result);
    return result;
  }

  async [actionTypes.BASE.EDIT](id, payload) {
    console.log("[BaseService] params", id, payload);
    const {
      data
    } = await this.$axios.put(`${this.$api}/${id}`, payload);

    return data;
  }

  async [actionTypes.BASE.ADD](payload) {
    const {
      data
    } = await this.$axios.post(this.$api, payload);

    return data;
  }

  async [actionTypes.BASE.DELETE](payload) {
    const {
      data
    } = await this.$axios.delete(this.$api, payload);

    return data;
  }


}