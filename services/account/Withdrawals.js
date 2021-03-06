import * as APIs from "~/utils/endpoints";
import BaseService from "~/services/BaseService";

export default class Withdrawals extends BaseService {
    constructor($axios) {
        super($axios, APIs.ACCOUNT_HISTORY_WITHDRAWALS);
    }
}