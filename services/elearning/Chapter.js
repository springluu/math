import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Chapter extends BaseService {
    constructor($axios) {
        super($axios, APIs.ELEARNING_CREATING_CHAPTERS);
    }
}