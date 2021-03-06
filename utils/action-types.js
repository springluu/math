import { GROUP_MEMBER } from "./endpoints";

export const BASE = {
    LIST: "list",
    ADD: "add",
    EDIT: "edit",
    DELETE: "delete",
    DETAIL: "detail",
    EDIT_PAYLOAD: "editPayload",
    DELETE_PAYLOAD: "deletePayload",
    EDIT_FORMDATA: "putWithFormData",
    GET_END: "getEnd",
    PUT_END: "putEnd",
    POST_END: "postEnd"
};

export const AUTH = {
    LOGIN: "login",
    REGISTER: "register",
    LOGOUT: "logout",
    SENDOTP: "sendotp",
    STATUS: "status",
    FORGOT_PASSWORD: "forgotPassword",
    CHANGE_PASSWORD: "changePassword",
    VERIFY_OTP: "verifiOtp",
    RESET_PASSWORD_REQUEST: "resetPasswordRequest",
    VERIFY_EMAIL: "verifyEmail",
    REFRESH_TOKEN: "refreshToken",
};

export const SOCIAL_POST = {
    LIST: "socialPostsList",
    ADD: "socialPostsAdd",
    EDIT: "socialPostsEdit",
    DELETE: "socialPostsDelete",
};

export const SOCIAL_LIKES = {
    LIST: "socialLikesList",
    ADD: "socialLikesAdd",
    DELETE: "socialLikesDelete",
};

export const SOCIAL_SHARES = {
    LIST: "socialSharesList",
};

export const SOCIAL_COMMENTS = {
    LIST: "socialCommentsList",
    LIST_CHILDREN: "socialCommentListChildren",
};

export const SOCIAL_MEDIAS = {
    LIST: "socialMediasList",
};

export const SOCIAL_NOTIFICATIONS = {
    LIST: "socialNotifications",
    REGISTER_DEVICE: "registerDevice",
    READ_NOTIFICATION: "readNotification",
    GET_NOTI_UNREAD: "getNotiUnread",
};

export const HEADER_NOTIFICATIONS = {
    LIST: "getNotifications",
    LIST_SCROLL: "getNotificationsScroll",
    LIST_COUNT: 'getCountNotifications',
    DETAIL_LIST: "getDetailNotifications",
    CHECK_IS_READ_NOTIFICATION: "checkIsReadNotifications",
    DELETE: "deleteNotifications"
};

export const SOCIAL_CONFIG = {
    LIST: "socialConfigList",
};

export const SOCIAL_FEEDS = {
    LIST: "socialFeedsList",
};

export const SOCIAL_LABEL = {
    LIST: "socialLabelList",
};

export const SOCIAL = {
    GET_FEEDS: "socialGetFeeds",
    ADD_POST: "socialAddPost",
    EDIT_POST: "socialEditPost",
    DELETE_POST: "socialDeletePost",
    // GET_LIKE_POST: "socialGetLikePost",
    // GET_LIKE_COMMENT: "socialGetLikeComment",
    // GET_LIKE_CHILD_COMMENT: "socialGetLikeChildComment",
    LIKE_POST: "socialLikePost",
    LIKE_COMMENT: "socialLikeComment",
    LIKE_CHILD_COMMENT: "socialLikeChildComment",
    GET_COMMENT: "socialGetComment",
    ADD_COMMENT: "socialAddComment",
    EDIT_COMMENT: "socialEditComment",
    DELETE_COMMENT: "socialDeleteComment",
    GET_CHILD_COMMENT: "socialGetChildComment",
    ADD_CHILD_COMMENT: "socialAddChildComment",
    EDIT_CHILD_COMMENT: "socialEditChildComment",
    DELETE_CHILD_COMMENT: "socialDeleteChildComment",
    SHARE: "socialShare",
    GET_LABELS: "socialGetLabels",
    GET_CONFIGS: "socialGetConfigs",
    GET_DETAIL_POST: "socialGetDetailPost",
    EDIT_DETAIL_POST: "socialEditDetailPost",
    DELETE_DETAIL_POST: "socialDeleteDetailPost",
    LIKE_DETAIL_POST: "socialLikeDetailPost",
    CLEAR_DETAIL_POST: "socialClearDetailPost",
    GET_COMMENT_DETAIL_POST: "socialGetCommentDetailPost",
    ADD_COMMENT_DETAIL_POST: "socialAddCommentDetailPost",
    EDIT_COMMENT_DETAIL_POST: "socialEditCommentDetailPost",
    DELETE_COMMENT_DETAIL_POST: "socialDeleteCommentDetailPost",
    LIKE_COMMENT_DETAIL_POST: "socialLikeCommentDetailPost",
    GET_CHILD_COMMENT_DETAI_POST: "socialGetChildCommentDetailPost",
    ADD_CHILD_COMMENT_DETAIL_POST: "socialAddChildCommentDetailPost",
    EDIT_CHILD_COMMENT_DETAIL_POST: "socialEditChildCommentDetailPost",
    DELETE_CHILD_COMMENT_DETAIL_POST: "socialDeleteChildCommentDetailPost",
    LIKE_CHILD_COMMENT_DETAIL_POST: "socialLikeChildCommentDetailPost",
};

export const ACCOUNT_PERSONAL = {
    LIST: "accountPersonalList",
    EDIT: "accountPersonalEdit",
    EDIT_AVATAR: "accountPersonalEditAvatar",
    EDIT_COVER: "accountPersonalEditCover",
    EDIT_PHONE: "accountPersonalEditPhone",
    EDIT_EMAIL: "accountPersonalEditEmail",
    VERIFY_OTP_EMAIL: "verifyOtpEmail",
    UPDATE_PHONE: "accountPersonalUpdatePhone",
};

export const ACCOUNT_PROFILE = {
    LIST: "accountProfileList",
};

export const ACCOUNT_LINK = {
    LIST: "accountLinkList",
    ADD: "accountLinkAdd",
};

export const ACCOUNT_TRANSACTIONS = {
    LIST: "accountTransactionList",
};

export const ACCOUNT_REVENUE = {
    LIST: "accountRevenueList",
};

export const ACCOUNT_EARNING = {
    LIST: "accountEarningList",
};

export const ACCOUNT_WITHDRAWALS = {
    LIST: "accountWithdrawalsList",
    ADD: "accountWithdrawalsAdd",
};

export const ACCOUNT_SETTING = {
    LIST: "accountSettingList",
    UPDATE: "accountSettingUpdate",
};

export const ELEARNING_PUBLIC_SUMMARY = {
    LIST: "elearningPublicSummaryList",
};

export const ELEARNING_PUBLIC_CATEGORY = {
    LIST: "elearningPublicCategoryList",
};

export const ELEARNING_PUBLIC_ELEARNING_TEACHER = {
    LIST: "elearningPublicElearningTeacherList",
};

export const ELEARNING_PUBLIC_TEACHER_ELS = {
    LIST: "elearningPublicElearningTeacherElsList",
};

export const ELEARNING_PUBLIC_INFO = {
    LIST: "elearningPublicInfoList",
};

export const ELEARNING_PUBLIC_VOTE = {
    LIST: "elearningPublicVoteList",
};

export const ELEARNING_PUBLIC_PLACE = {
    PROVINCE: "elearningPublicPlaceProvince",
    DISTRICT: "elearningPublicPlaceDistrict",
    WARD: "elearningPublicPlaceWard",
};

export const ELEARNING_PUBLIC_PROGRAM = {
    LIST: "elearningPublicProgramList",
};

export const ELEARNING_PUBLIC_RELATED = {
    LIST: "elearningPublicRelatedList",
};

export const ELEARNING_PUBLIC_SEARCH = {
    DETAIL: "elearningPublicElearningDetail",
};

export const ELEARNING_PUBLIC_VOTED_ELEARNING = {
    LIST: "elearningPublicVotedElearningList",
};

export const ELEARNING_PUBLIC_SCHOOL_YEAR = {
    LIST: "elearningPublicSchoolYearList",
};

export const ELEARNING_PUBLIC_WHAT_NEXTS = {
    LIST: "elearningPublicWhatNextsList",
};

export const ELEARNING_PUBLIC_FOR_YOU = {
    LIST: "elearningPublicForYouList",
};

export const ELEARNING_PUBLIC_VOTED_SUBJECTS = {
    LIST: "elearningPublicVotedSubjectsList",
};

export const ELEARNING_PUBLIC_NEWEST = {
    LIST_LECTURE: "elearningPublicNewestLecture",
    LIST_COURSE: "elearningPublicNewestCourse",
};

export const PUBLIC_CATEGORY = {
    LIST: "publicCategoryList",
};

export const ELEARNING_PUBLIC_HIGHLIGHT_TEACHERS = {
    LIST: "elearningPublicHighlightTeachers",
};

export const ELEARNING_PUBLIC_ELEARNING = {
    LIST: "elearningPublicElearning",
};

export const ELEARNING = {
    INFO: "elearningInfo",
    PROGRAM: "elearningProgram",
    RELATED: "elearningPublicRelated",
    SUBJECT: "elearningPublicSubject",
    LEVEL: "elearningPublicLevel",
};

export const CREATING_ANSWER = {
    LIST: "creatingAnswerList",
    ADD: "creatingAnswerAdd",
    EDIT: "creatingAnswerEdit",
    DELETE: "creatingAnswerDelete",
};

export const TEACHING_OLCLASSES = {
    LIST: "teachingOlclassesList",
    ADD: "teachingOlclassesAdd",
    EDIT: "teachingOlclassesEdit",
    INFO: "teachingOlclassesInfo",
    DELETE: "teachingOlclassesDelete",
    BLOCK: "teachingOlclassesBlock",
    UNBLOCK: "teachingOlclassesUnBlock",
};

export const TEACHING_OLCLASS_INVITES = {
    LIST: "teachingOlclassInvitesList",
    ADD: "teachingOlclassInvitesAdd",
    EDIT: "teachingOlclassInvitesEdit",
};

export const TEACHING_OLCLASS_LESSONS = {
    LIST: "teachingOlclassLessonsList",
    INFO: "teachingOlclassLessonInfo",
};
export const TEACHING_OLCLASS_LESSON_ATTENDANCES = {
    LIST: "teachingOlclassLessonAttendancesList",
    EDIT: "teachingOlclassLessonAttendancesEdit",
    SUMMARY: "teachingOlclassLessonAttendancesSummary",
};
export const TEACHING_OLCLASS_LESSON_SESSIONS = {
    LIST: "teachingOlclassLessonSessionsList",
};
export const TEACHING_OLCLASS_STUDENTS = {
    LIST: "teachingOlclassStudentList",
};

export const CREATING_CHAPTER = {
    LIST: "creatingChapterList",
    ADD: "creatingChapterAdd",
    EDIT: "creatingChapterEdit",
    DELETE: "creatingChapterDelete",
};

export const ELEARNING_CREATING_ANSWER = {
    LIST: "elearningCreatingAnswerList",
    ADD: "elearningCreatingAnswerAdd",
    EDIT: "elearningCreatingAnswerEdit",
    DELETE: "elearningCreatingAnswerDelete",
};

export const ELEARNING_CREATING_PROGRESS = "ELEARNING_CREATING_PROGRESS";

export const ELEARNING_CREATING_CHAPTER = {
    LIST: "elearningCreatingChapterList",
    ADD: "elearningCreatingChapterAdd",
    EDIT: "elearningCreatingChapterEdit",
    DELETE: "elearningCreatingChapterDelete",
};

export const ELEARNING_CREATING_DOC = {
    LIST: "elearningCreatingDocList",
    ADD: "elearningCreatingDocAdd",
    EDIT: "elearningCreatingDocEdit",
    DELETE: "elearningCreatingDocDelete",
};

export const ELEARNING_TEACHING_REPOSITORY_FILE = {
    LIST: "elearningTeachingRepositoryFileList",
    ADD: "elearningTeachingRepositoryFileAdd",
    DELETE: "elearningTeachingRepositoryFileDelete",
};

export const ELEARNING_TEACHING_REPOSITORY = {
    INFO: "elearningTeachingRepositoryFileInfo",
};

export const REPOSITORY = {
    INFO: "info",
};

export const ELEARNING_TEACHING_EXERCISE_ELEARNING = {
    LIST: "elearningTeachingExerciseElearningList",
};

export const ELEARNING_TEACHING_EXERCISE = {
    LIST: "elearningTeachingExerciseList",
    DETAIL: "elearningTeachingExerciseDetail",
};

export const ELEARNING_TEACHING_EXERCISE_PARTICIPANT = {
    LIST: "elearningTeachingExerciseParticipantList",
};

export const ELEARNING_TEACHING_TEST = {
    LIST: "elearningTeachingTestList",
};

export const ELEARNING_TEACHING_RESULT = {
    DETAIL: "elearningTeachingResultDetail",
};

export const ELEARNING_TEACHING_EVALUATION = {
    ADD: "elearningTeachingEvaluationAdd",
};

export const ELEARNING_TEACHING_VOTE = {
    LIST: "elearningTeachingVoteList",
};

export const ELEARNING_TEACHING_CLASS = {
    LIST: "elearningTeachingClassList",
};

export const ELEARNING_CREATING_EXERCISES = {
    LIST: "elearningCreatingExercisesList",
    ADD: "elearningCreatingExercisesAdd",
    EDIT: "elearningCreatingExercisesEdit",
    DELETE: "elearningCreatingExercisesDelete",
};

export const ELEARNING_CREATING_GENERAL = {
    LIST: "elearningCreatingGeneralList",
    ADD: "elearningCreatingGeneralAdd",
    EDIT: "elearningCreatingGeneralEdit",
    DELETE: "elearningCreatingGeneralDelete",
};

export const ELEARNING_CREATING_SETTING = {
    LIST: "elearningCreatingSettingList",
    ADD: "elearningCreatingSettingAdd",
};

export const ELEARNING_CREATING_LESSONS = {
    LIST: "elearningCreatingLessonsList",
    ADD: "elearningCreatingLessonsAdd",
    EDIT: "elearningCreatingLessonsEdit",
    DELETE: "elearningCreatingLessonsDelete",
    DETAIL: "elearningCreatingLessonsDetail",
};

export const ELEARNING_CREATING_PUBLISH = {
    POST: "elearningCreatingPublishPost",
};

export const ELEARNING_CREATING_QUESTIONS = {
    LIST: "elearningCreatingQuestionsList",
    ADD: "elearningCreatingQuestionsAdd",
    EDIT: "elearningCreatingQuestionsEdit",
    DELETE: "elearningCreatingQuestionsDelete",
};

export const STUDY = {
    ELEARNING: "studyElearningList",
};

export const SCHOOL_CLASSES = {
    LIST: "schoolClassesList",
    ADD: "schoolClassesAdd",
    EDIT: "schoolClassesEdit",
    DELETE: "schoolClassesDelete",
};

export const SCHOOL_INFO = {
    INFO: "schoolInfo",
    ANNOUNCEMENT: "schoolAnnouncement",
    ANNOUNCEMENT_DETAIL: "schoolAnnouncementDetail",
    LINK_WEB: "schoolLinkWeb",
    LINK_WEB_DETAIL: "schoolLinkWebDetail",
    NEWS: "schoolNews",
    ORG_INTRO: "schoolOrgIntro",
    PROFESSIONS: "schoolProfessions",
    PROFESSIONS_DETAIL: "schoolProfessionsDetail",
    TIMETABLE: "schoolTimeTable",
    TIMETABLE_DETAIL: "schoolTimeTableDetail",
};

export const SCHOOL_ELEARNING = {
    LIST: "schoolElearning",
};

export const SCHOOL_HIGHTLIGHT_ELEARNING = {
    LIST: "schoolHightlightElearning",
};

export const SCHOOL_ORGANIZATION = {
    LIST: "schoolOrganization",
};

export const SCHOOL_PROFESSIONAL = {
    LIST: "schoolProfessionalList",
    ADD: "schoolProfessionalAdd",
    EDIT: "schoolProfessionalEdit",
    DELETE: "schoolProfessionalDelete",
};

export const SCHOOL_STUDENTS = {
    LIST: "schoolStudentsList",
    ADD: "schoolStudentsAdd",
    EDIT: "schoolStudentsEdit",
    DELETE: "schoolStudentsDelete",
};

export const SCHOOL_STAFFS = {
    LIST: "schoolStaffsList"
};

export const SCHOOL_TEACHERS = {
    LIST: "schoolTeachersList",
    ADD: "schoolTeachersAdd",
    EDIT: "schoolTeachersEdit",
    DELETE: "schoolTeachersDelete",
};

export const SCHOOL_NEWS = {
    LIST: "schoolNewsList",
    DETAIL: "schoolNewsDetail",
};

export const SCHOOL_LINK_WEBSITE = {
    LIST: "schoolLinkWebsiteList",
};

export const SCHOOL_SUBJECTS = {
    LIST: "schoolSubjectList"
};

export const ELEARNING_STURY = {
    LIST: "elearningStudyList",
    LIST_TIMETABLE: "elearningStudyListTimetable",
};

export const ELEARNING_STURY_OVERVIEW = {
    LIST: "elearningStudyOverviewList",
    TIME_TABLE: "elearningStudyOverviewTimeTable",
    DEADLINE: "elearningStudyOverviewDeadline",
    OVERVIEW_BASE_SERVICE: "overviewBaseService",
    TIME_TABLE_BASE_SERVICE: "timeViewBaseService",
    DEADLINE_BASE_SERVICE: "deadlineBaseService"
};

export const ELEARNING_STUDY_STUDENT = {
    LIST: "elearningStudyStudentList",
};

export const ELEARNING_STURY_FAVOURITE = {
    LIST: "elearningStudyFavouriteList",
    ADD: "elearningStudyFavouriteAdd",
    DELETE: "elearningStudyFavouriteDelete",
};

export const ELEARNING_STURY_VOTE = {
    LIST: "elearningStudyVoteList",
    ADD: "elearningStudyVoteAdd",
};

export const ELEARNING_STURY_ARCHIVE = {
    LIST: "elearningStudyArchiveList",
    ADD: "elearningStudyArchiveAdd",
    DELETE: "elearningStudyArchiveDelete",
};

export const ELEARNING_STUDY_EXERCISE = {
    LIST_QUESTION_START: "elearningSudyExerciseQuestionListStart",
    LIST_QUESTION: "elearningSudyExerciseQuestionList",
    LIST_ELEARNING_EXERCISE: "elearningSudyElearningExerciseList",
    LIST_ELEARNING_EXERCISE_2: "elearningSudyElearningExerciseList2",
    LIST_RESULT: "elearningSudyExerciseResultList",
    LIST_SUBMISTION: "elearningSudyExerciseSubmissionList",
    ADD_SUBMISTION: "elearningSudyExerciseSubmissionAdd",
};

export const ELEARNING_STUDY_PROGRESS = {
    LIST: "elearningSudyProgressList",
};

export const ELEARNING_STUDY_INFO = {
    LIST: "elearningSudyInfoList",
};

export const ELEARNING_STUDY_STATISTIC = {
    LIST: "elearningStudyStatistic",
};

export const ELEARNING_STUDY_OLCLASS_LESSON_SESSIONS = {
    LIST: "elearningStudyOlclassLessonSessionsList",
    ATTENDANCE: "elearningStudyOlclassLessonSessionsAttendance",
};

export const ELEARNING_STUDY_EXERCISE_ELEARNING = {
    LIST: "elearningStudyExerciseElearning",
};

export const ELEARNING_SCHOOL_SUMMARY = {
    LIST: "elearningSchoolSummaryList",
};

export const ELEARNING_SCHOOL_SEARCH = {
    LIST: "elearningSchoolSearchList",
};

export const ELEARNING_SCHOOL_STANDALONE = {
    LIST: "elearningSchoolStandaloneList",
};

export const MESSAGE_GROUP = {
    ADD_MEMBER: "addMember",
    EDIT_AVATAR_GROUP: "editAvatarGroup",
    EDIT_NAME: "editName",
    CREATE_GROUP: "createGroup",
    MEMBER_LIST: "getMemberList",
    GROUP_LIST: "getGroupList",
    GROUP_LEAVE: "groupLeave",
    GROUP_REMOVE_MEMBER: "groupRemoveMember",
    GROUP_NOTIFICATION: "groupNotification",
    MESSAGE_LIST: "getMessageList",
    GROUP_LIST_DETAIL: "getGroupListDetail",
    MESSAGE_SEND_IMG: "messageSendImg",
    LIST_MESSAGE_TYPE: "getListMessageType",
    MESSAGE_SEND_FILE: "messageSendFile",
};

export const SOCIAL_FRIEND = {
    LIST: "socialFriendList",
    // LIST: "socialFriendListInvite",
    INVITE_FRIEND: "inviteFriend",
    LIST_INVITE: "getListInvite",
    DELETE_FRIEND: "deleteFriend",
};

export const SOCIAL_PHOTO = {
    POST_PHOTO_LIST: "postPhotoList",
    POST_TAG_PHOTO_LIST: "postTagPhotoList",
};

export const SOCIAL_FOLLOW = {
    CREATE_FOLLOW: "createFollow",
    DELETE_FOLLOW: "deleteFollow",
};

export const TEACHING_SUMMARY = {
    INFO: "teachingSummary",
    STATISTIC_REVENUE: "teachingSummaryStatisticRevenue",
};

export const TEACHING_CHART_STATISTIC_REVENUE = {
    INFO: "teachingChartStatisticRevenue",
};

export const TEACHING_CHART_STATISTIC_HIGHLIGHT_ELS = {
    LIST: "teachingChartStatisticHighlightElsList",
};

export const TEACHING_ELEARNINGS = {
    LIST: "teachingElearningsList",
    DELETE: "teachingElearningsDelete",
    HIDE: "teachingElearningsHide",
};
export const TEACHING_ONLINE_CLASS = {
    LIST: "teachingOnlineCLassList",
    DELETE: "teachingOnlineCLassDelete",
};
export const TEACHING_INTERACTIVE = {
    LIST: "teachingInteractiveList",
    DELETE: "teachingInteractiveDelete",
};
export const TEACHING_STUDENTS = {
    LIST: "teachingStudentsList",
    DELETE: "teachingStudentsDelete",
};

export const PAYMENT = {
    POST_PAY: "postPay",
    POST_ORDER: "postOder",
    POST_HASHKEY: "postHashKeyGenerate",
    VALIDATE_TRANSACTION: "validateTransaction",
    REPAY: "postRepay",
    CANCEL_PAY: "cancelPay",
};

export const CART = {
    LIST: "cartList",
    ADD: "cartAdd",
    DELETE: "cartDelete",
};

export const TEACHING_STATISTIC_REVENUE = {
    LIST: "teachingStatisticRevenuList",
};

export const ACCOUNT_BANKS = {
    LIST: "accountBanksList",
    ADD: "accountBankAdd",
    EDIT: "accountBankEdit",
    DELETE: "accountBankDelete",
    VALIDATE: "accountBankValidate",
};

export const ACCOUNT_BALANCE = {
    LIST: "accountBalance",
};

export const ACCOUNT_WITHDRAW = {
    ADD: "accountWithdrawAdd",
};

export const PUBLIC_BANK = {
    LIST: "publicBankList",
};

export const TEACHING_ELEARNING_PARTICIPANT = {
    LIST: "teachingElearningList",
};

export const TEACHING_ELEARNING_BANNED = {
    ADD: "teachingElearningBanned",
};

export const TEACHING_STUDENT_PROGRESS = {
    LIST: "teachingStudentProGressList",
};

export const TEACHING_STUDENT_EXERCISES = {
    LIST: "teachingStudentExercisesList",
};

export const TEACHING_ELEARNING_REQUESTS = {
    LIST: "teachingElearningRequestsList",
};

export const TEACHING_ELEARNING_ACCEPT = {
    ADD: "teachingElearningAccept",
};

export const TEACHING_ELEARNING_INVITES = {
    LIST: "teachingElearningInvitesList",
    ADD: "teachingElearningInvitesAdd",
};

export const TEACHING_ELEARNING_STATISTIC = {
    LIST: "teachingElearningStatistic",
};

export const TEACHING_SCHEDULES = {
    DELETE: "teachingSchedulesDelete",
};

export const ACCOUNT_BIOGRAPHY = {
    ADD: "accountBiographyAdd",
};

export const TEACHING_INTERACTIVE_LISTQUESTION = {
    LIST: "teachingInteractiveListquestion",
    ADD: "teachingInteractiveListquestionAdd"
};

export const TEACHING_INTERACTIVE_ANSWER = {
    LIST: "teachingInteractiveListqAnswer",
    ADD: "teachingInteractiveAnswer",
    LIKE: "teachingInteractiveLikeAnswer"
};

export const TEACHING_INTERACTIVE_ANNOUNCEMENT = {
    LIST: "teachingInteractiveListAnnouncement",
};

export const TEACHING_INTERACTIVE_ADD_ANNOUNCEMENT = {
    ADD: "teachingInteractiveAnnouncementAdd",
};

export const TEACHING_INTERACTIVE_DELETE_ANNOUNCEMENT = {
    DELETE: "teachingInteractiveAnnouncementDelete",
};

export const TEACHING_PUBLIC_LIST = {
    LIST: "teachingPublicList",
};

export const PUBLIC_CLASSES = {
    LIST: "publicClassesList",
};

export const TEACHING_STUDENTS_PRIVATE = {
    LIST: "teachingStudentsPrivatesList",
};

export const INFO_SUPPORT = {
    ADD: "infoSupport",
};

export const CHAT = {
    ROOM_LIST: "getRoomList",
    MEMBER_LIST: "getMemberList",
    MESSAGE_LIST: "getMessageList",
    ROOM_DETAIL: "getRoomDetail",
    MESSAGE_LIST_INFINITE: "getMessageListInfinite",
    CHANGE_ROOM_NAME: "changeRoomName",
    IMAGE_LIST: "getImageList",
    ROOM_REMOVE_MEMBER: "roomRemoveMember",
    ROOM_ADD_MEMBER: "roomAddMember",
    UPLOAD_MEDIA: "uploadMedia",
    CHANGE_ROOM_AVATAR: "changeRoomAvatar",
    FRIENDS_LIST: "getFriendsList",
    ROOM_LIST_FETCH: "getRoomListFetch",
    MESSAGE_LIST_FETCH: "getMessageListFetch",
    CREATE_ROOM: "createRoom"
};

export const TIMETABLE = {
    TIMETABLE_LIST: "getTimeTableList"
}