import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class LimitMessages extends BaseService {
    constructor($axios) {
        super($axios, APIs.LIMIT_MESSAGES);
    }
}