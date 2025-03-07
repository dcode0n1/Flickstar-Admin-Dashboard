import { Permission } from "@/constants/middleware-constants";

export const permissionsData = [
    {
        category: "Admin",
        permissions: [
            { label: "View Admin", value: Permission.ViewAdmin },
            { label: "Update Profile", value: Permission.UpdateProfile },
            { label: "Create Admin", value: Permission.CreateAdmin },
            { label: "Update Admin", value: Permission.UpdateAdmin },
            { label: "Delete Admin", value: Permission.DeleteAdmin }
        ]
    },
    {
        category: "Role",
        permissions: [
            { label: "View Role", value: Permission.ViewRole },
            { label: "Update Role", value: Permission.UpdateRole },
            { label: "Create Role", value: Permission.CreateRole },
            { label: "Delete Role", value: Permission.DeleteRole }
        ]
    },
    {
        category : "User",
        permissions: [
            { label: "View User", value: Permission.ViewUser },
            { label: "Update User", value: Permission.UpdateUser },
            { label: "Create User", value: Permission.CreateUser },
            { label: "Delete User", value: Permission.DeleteUser }
        ]
    },
    {
        category : "Songs",
        permissions : [
            { label: "View Songs", value: Permission.ViewSongs },
            { label: "Update Songs", value: Permission.UpdateSongs },
            { label: "Create Songs", value: Permission.CreateSongs },
            { label: "Delete Songs", value: Permission.DeleteSongs }
        ]
    },
    {
        category : "Flicks",
        permissions : [
            { label: "View Flicks", value: Permission.ViewFlicks },
            { label: "Update Flicks", value: Permission.UpdateFlicks },
            { label: "Create Flicks", value: Permission.CreateFlicks },
            { label: "Delete Flicks", value: Permission.DeleteFlicks }
        ]
    },
    {
        category : "Audio",
        permissions : [
            { label: "View Audio", value: Permission.ViewAudio },
            { label: "Update Audio", value: Permission.UpdateAudio },
            { label: "Create Audio", value: Permission.CreateAudio },
            { label: "Delete Audio", value: Permission.DeleteAudio }
        ]
    },
    {
        category: "Quest",
        permissions: [
            { label: "View Quest", value: Permission.ViewQuest },
            { label: "Update Quest", value: Permission.UpdateQuest },
            { label: "Create Quest", value: Permission.CreateQuest },
            { label: "Delete Quest", value: Permission.DeleteQuest }
        ]
    },
    {
        category: "Comment",
        permissions: [
            { label: "View Comment", value: Permission.ViewComment },
            { label: "Update Comment", value: Permission.UpdateComment },
            { label: "Create Comment", value: Permission.CreateComment },
            { label: "Delete Comment", value: Permission.DeleteComment }
        ]
    },
    {
        category : "Feedback",
        permissions : [
            {label  :"View Feedback" , value : Permission.ViewFeedbacks},
            {label  :"Update Feedback" , value : Permission.UpdateFeedbacks},
            {label  :"Delete Feedback" , value : Permission.DeleteFeedbacks}
        ]
    },
    {
        category: "Story",
        permissions: [
            { label: "View Story", value: Permission.ViewStory },
            { label: "Update Story", value: Permission.UpdateStory },
            { label: "Delete Story", value: Permission.DeleteStory }
        ]
    },
    {
        category: "Requests",
        permissions: [
            { label: "View Requests", value: Permission.ViewRequests },
            { label: "Update Requests", value: Permission.UpdateRequests },
            { label: "Delete Requests", value: Permission.DeleteRequests }
        ]
    },

    {
        category: "Settings",
        permissions: [
            { label: "View Settings", value: Permission.ViewSetting },
            { label: "Update Settings", value: Permission.UpdateSetting },
            { label: "Create Settings", value: Permission.CreateSetting }
        ]
    },
    {
        category : "Reports Flicks",
        permissions : [
            {label  :"View Report Flicks" , value : Permission.ViewReportFlicks},
            {label  :"Update Report Flicks" , value : Permission.UpdateReportFlicks},
            {label  :"Delete Report Flicks" , value : Permission.DeleteReportFlicks},
        ]
    },
    {
        category : "Reports Songs",
        permissions : [
            {label  :"View Report Songs" , value : Permission.ViewReportSongs},
            {label  :"Update Report Songs" , value : Permission.UpdateReportSongs},
            {label  :"Delete Report Songs" , value : Permission.DeleteReportSongs},
        ]
    },
    {
        category : "Reports Audio",
        permissions : [
            {label  :"View Report Audio" , value : Permission.ViewReportAudio},
            {label  :"Update Report Audio" , value : Permission.UpdateReportAudio},
            {label  :"Delete Report Audio" , value : Permission.DeleteReportAudio},
        ]
    },
    {
        category : "Reports Quest",
        permissions : [
            {label  :"View Report Quest" , value : Permission.ViewReportQuest},
            {label  :"Update Report Quest" , value : Permission.UpdateReportQuest},
            {label  :"Delete Report Quest" , value : Permission.DeleteReportQuest},
        ]
    },
    {
        category : "Reports Comment",
        permissions : [
            {label  :"View Report Comment" , value : Permission.ViewReportComment},
            {label  :"Update Report Comment" , value : Permission.UpdateReportComment},
            {label  :"Delete Report Comment" , value : Permission.DeleteReportComment},
        ]
    },
    {
        category : "Reports Story",
        permissions : [
            {label  :"View Report Story" , value : Permission.ViewReportStory},
            {label  :"Update Report Story" , value : Permission.UpdateReportStory},
            {label  :"Delete Report Story" , value : Permission.DeleteReportStory},
        ]
    },
];
