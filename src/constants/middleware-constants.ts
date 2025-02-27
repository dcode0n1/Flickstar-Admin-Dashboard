export const publicPaths = [
    "/login",
    "/forget-password",
    "/verify",
]


export enum Permission {
    // Admin permissions
    ViewAdmin = "viewAdmin",
    CreateAdmin = "createAdmin",
    UpdateAdmin = "updateAdmin",
    DeleteAdmin = "deleteAdmin",

    // Role permissions
    ViewRole = "viewRole",
    CreateRole = "createRole",
    UpdateRole = "updateRole",
    DeleteRole = "deleteRole",

    // User permissions
    ViewUser = "viewUser",
    UpdateUser = "updateUser",
    DeleteUser = "deleteUser",
    CreateUser = "createUser",

    // Flicks permissions
    ViewFlicks = "viewFlicks",
    UpdateFlicks = "updateFlicks",
    DeleteFlicks = "deleteFlicks",
    CreateFlicks = "createFlicks",

    // Songs permissions
    ViewSongs = "viewSongs",
    UpdateSongs = "updateSongs",
    DeleteSongs = "deleteSongs",
    CreateSongs = "createSongs",

    // Audio permissions
    ViewAudio = "viewAudio",
    UpdateAudio = "updateAudio",
    DeleteAudio = "deleteAudio",
    CreateAudio = "createAudio",

    // Quest permissions
    ViewQuest = "viewQuest",
    UpdateQuest = "updateQuest",
    DeleteQuest = "deleteQuest",
    CreateQuest = "createQuest",

    // Comment permissions
    ViewComment = "viewComment",
    UpdateComment = "updateComment",
    DeleteComment = "deleteComment",
    CreateComment = "createComment",

    // Feedbacks permissions
    ViewFeedbacks = "viewFeedbacks",
    UpdateFeedbacks = "updateFeedbacks",
    DeleteFeedbacks = "deleteFeedbacks",

    // Reports Flicks permissions
    ViewReportFlicks = "viewReportFlick",
    UpdateReportFlicks = "updateReportFlick",
    DeleteReportFlicks = "deleteReportFlick",


    // Reports Songs permissions
    ViewReportSongs = "viewReportSongs",
    UpdateReportSongs = "updateReportSongs",
    DeleteReportSongs = "deleteReportSongs",

    // Reports Audio permissions
    ViewReportAudio = "viewReportAudio",
    UpdateReportAudio = "updateReportAudio",
    DeleteReportAudio = "deleteReportAudio",


    // Reports Quest permissions
    ViewReportQuest = "viewReportQuest",
    UpdateReportQuest = "updateReportQuest",
    DeleteReportQuest = "deleteReportQuest",

    // Reports Comment permissions
    ViewReportComment = "viewReportComment",
    UpdateReportComment = "updateReportComment",
    DeleteReportComment = "deleteReportComment",

    // Reports Story permissions
    ViewReportStory = "viewReportStory",
    UpdateReportStory = "updateReportStory",
    DeleteReportStory = "deleteReportStory",

    // Story permissions
    ViewStory = "viewStory",
    UpdateStory = "updateStory",
    DeleteStory = "deleteStory",

    // Requests permissions
    ViewRequests = "viewRequests",
    UpdateRequests = "updateRequests",
    DeleteRequests = "deleteRequests",

    //Profile permissions
    UpdateProfile = "updateProfile",


    //Setting permissions
    UpdateSetting = "updateSetting",
    ViewSetting = "viewSetting",
    CreateSetting = "createSetting",
}

export const protectedPathsPermissions: { [key: string]: Permission } = {
    // Access Control - Staff
    '/staff/list': Permission.ViewAdmin,
    '/staff/create-staff': Permission.CreateAdmin,
    '/staff/[id]': Permission.ViewAdmin,

    // Access Control - Role
    '/role/list': Permission.ViewRole,
    '/role/create-role': Permission.CreateRole,
    '/role/[id]': Permission.UpdateRole,

    // User
    '/user/list': Permission.ViewUser,
    '/user/create-user': Permission.CreateUser,
    '/user/[id]': Permission.UpdateUser,

    // Media Control - Flick
    '/media-control/flick/list': Permission.ViewFlicks,
    '/media-control/flick/create-flick': Permission.CreateFlicks,
    '/media-control/flick/[id]': Permission.UpdateFlicks,

    // Media Control - Song
    '/media-control/song/list': Permission.ViewSongs,
    '/media-control/song/create-song': Permission.CreateSongs,
    '/media-control/song/[id]': Permission.UpdateSongs,

    // Media Control - Audio
    '/media-control/audio/list': Permission.ViewAudio,
    '/media-control/audio/create-audio': Permission.CreateAudio,
    '/media-control/audio/[id]': Permission.UpdateAudio,

    // Media Control - Comment
    '/media-control/comment/list': Permission.ViewComment,
    '/media-control/comment/[id]': Permission.UpdateComment,
    '/media-control/comment/create-comment': Permission.CreateComment,

    // Media Control - Quest
    '/media-control/quest/list': Permission.ViewQuest,
    '/media-control/quest/[id]': Permission.UpdateQuest,
    '/media-control/quest/create-quest': Permission.CreateQuest,

    // Feedbacks 
    '/feedback/list': Permission.ViewFeedbacks,
    '/feedback/[id]': Permission.UpdateFeedbacks,

    // Reports Flicks
    '/report/flick/list': Permission.ViewReportFlicks,
    '/report/flick/[id]': Permission.UpdateReportFlicks,

    //  Reports Quest
    '/report/quest/list': Permission.ViewReportQuest,
    '/report/quest/[id]': Permission.UpdateReportQuest,

    //  Reports Comment
    '/report/comment/list': Permission.ViewReportComment,
    '/report/comment/[id]': Permission.UpdateReportComment,

    //  Reports Story
    '/report/story/list': Permission.ViewReportStory,
    '/report/story/[id]': Permission.UpdateReportStory,

    //  Reports Audio
    '/report/audio/list': Permission.ViewReportAudio,
    '/report/audio/[id]': Permission.UpdateReportAudio,


    // Profile
    '/profile': Permission.UpdateProfile,
};