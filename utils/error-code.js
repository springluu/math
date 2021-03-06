export const ERRORS = {
    LOGIN: {
        REQUIRED: "SCLCOM_0001",
        EMAIL_INVALID: "SCLU_1004",
        USER_LOCKED: "SCLU_1005",
        BAD_CREDEN: "SCLCOM_1000",
        EMAIL_LEFT: "SCLU_1006",
        USER_INACTIVE: "SCLCOM_1003"
    },
    REGISTER: {
        EMAIL_PHONE_USED: "SCLU_1000",
        PASSWORD_LEAST: "SCLU_1001"
    },
    FORGOT_PASSWORD: {
        USER_NOT_FOUND: "SCLCOM_1001"
    },
    UPDATE_PROFILE: { ADDRESS_REQUIRED: "SCLS_00063" },

    SETTING_LINK: {
        ALREADY_ACCOUNT_LINKED: "SCLU_1007",
        CODE_NOT_FOUND: "SCLU_1008"
    },
    EXERCISE: {
        MUST_COMPLETE_ALL_REQUIRED_EXERCISES: "SCLC_0057"
    }
};