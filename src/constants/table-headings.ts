export const RolesListHeadings = [
    { display: "#", key: "index" },
    { display: "Name", key: "name", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Created By", key: 'createdAt', sortable: true },
    { display: "Options", key: 'options' }
]
export const StaffListHeadings = [
    { display: "#", key: "index" },
    { display: "Name", key: "nameAndImage", sortable: true },
    { display: "Username", key: "username", sortable: true },
    { display: "Email", key: "email", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Created At", key: "createdAt", sortable: true },
    { display: "Options", key: "options" }
]
export const MediaControlFlickListHeadings = [
    { display: "#", key: "index" },
    { display: "Username", key: "usernameAndPhoto" },
    { display: "Description", key: "description" },
    { display: "Repost Count", key: "repostCount", sortable: true },
    { display: "Suspended", key: 'suspended', sortable: true },
    { display: "Created  At", key: "createdAt", sortable: true },
    { display: "Options", key: 'options' }
]
export const MediaControlQuestListHeadings = [
    { display: "#", key: "index" },
    { display: "Title", key: "title", sortable: true },
    { display: "Description", key: "description" },
    { display: "Applicants", key: "participatedCountAndMaxApplicant", sortable: true },
    { display: "Total Amount", key: "totalAmount", sortable: true },
    { display: "Suspended", key: "suspended", sortable: true },
    { display: "Options", key: "options" }
]


export const MediaControlQuestApplicantListHeadings = [
    { display: "#", key: "index" },
    { display: "User", key: "username", sortable: true },
    { display: "Description", key: "description", sortable: true },
    { display: "Partial Allowance", key: "partialAllowance", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Suspended", key: "suspended", sortable: true },
    { display: "Options", key: "options" }
]

export const MediaControlStoryListHeadings = [
    { display: "#", key: "index" },
    { display: "Caption ", key: "captionAndThumbnail", sortable: true },
    { display: "Type", key: "mediaType" },
    { display: "View Count", key: "viewCount", sortable: true },
    { display: "Suspended", key: "suspended", sortable: true },
    { display: "Options", key: "options" }
]


export const MediaControlSongListHeadings = [
    { display: "#", key: "index" },
    { display: "Title", key: "nameAndIcon", sortable: true },
    { display: "Duration", key: "duration" },
    { display: "Song", key: "url" },
    { display: "Used", key: "used", sortable: true },
    { display: "Options", key: "options" }
]





export const MediaControlAudioListHeadings = [
    { display: "#", key: "index" },
    { display: "Title", key: "nameAndIcon", sortable: true },
    { display: "Duration", key: "duration" },
    { display: "Audio", key: "url" },
    { display: "Suspended", key: "suspended", sortable: true },
    { display: "Options", key: "options" }
]




export const MediaControlCommentListHeadings = [
    { display: "#", key: "index" },
    { display: "User", key: "username", sortable: true },
    { display: "Reference", key: "parentCommentOrFlick" },
    { display: "Comment", key: "comment" },
    { display: "Time", key: "createdAt", sortable: true },
    { display: "Suspended", key: "suspended", sortable: true },
    { display: "Options", key: "options" }
]


export const ReportCommentListHeadings = [
    { display: "#", key: "index" },
    { display: "User", key: "nameAndIcon", sortable: true },
    { display: "Comment", key: "comment" },
    { display: "Message", key: "message", sortable: true },
    { display: "Created At", key: "createdAt", sortable: true },
    { display: "Options", key: "options" }
]


export const ReportAudioListHeadings = [
    { display: "#", key: "index" },
    { display: "User", key: "usernameAndURL", sortable: true },
    { display: "Audio", key: "audio" },
    { display: "Message", key: "message", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Options", key: "options" }
]


export const ReportFlickListHeadings = [
    { display: "#", key: "index" },
    { display: "User", key: "userNameAndURL", sortable: true },
    { display: "Flick", key: "flick" },
    { display: "Message", key: "message", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Options", key: "options" }
]

export const ReportStoryListHeadings = [
    { display: "#", key: "index" },
    { display: "User", key: "usernameAndURL", sortable: true },
    { display: "Story", key: "story" },
    { display: "Message", key: "message", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Options", key: "options" }
]


export const ReportQuestListHeadings = [
    { display: "#", key: "index" },
    { display: "User", key: "usernameAndURL", sortable: true },
    { display: "Quest", key: "questId" },
    { display: "Message", key: "message", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Options", key: "options" }
]


export const ReportUserListHeadings = [
    { display: "#", key: "index" },
    { display: "User", key: "usernameAndURL", sortable: true },
    { display: "User Reported", key: "reportedTo" },
    { display: "Message", key: "message", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Options", key: "options" }
]


export const UserListHeadings = [
    { display: "#", key: "index" },
    { display: "Name", key: "nameAndImage", sortable: true },
    { display: "Username", key: "username" },
    { display: "Email", key: "email" },
    { display: "Warned Count", key: "warnedCount", sortable: true },
    { display: "Balance", key: "balance", sortable: true },
    { display: "Suspended", key: "suspended", sortable: true },
    { display: "Options", key: "options" }
]


export const FeedbackListHeadings = [
    { display: "#", key: "index" },
    { display: "Message", key: "message" },
    { display: "Rating", key: "rating", sortable: true },
    { display: "Status", key: "status", sortable: true },
    { display: "Created At", key: "createdAt", sortable: true },
    { display: "Options", key: "options" }
]




// export const MediaControlFlickListHeadings = [
//     { display: "#", key: "index" },
//     { display: "Username", key: "username", sortable: true },
//     { display: "Description", key: "description" },
//     { display: "Repost Count", key: "repostCount", sortable: true },
//     { display: "Comment Visible", key: "commentVisible", sortable: true },
//     { display: "Phone Number", key: 'phoneNumber' },
//     { display: "Suspended", key: 'suspended', sortable: true },
//     { display: "Options", key: 'options' }
// ]

export const UserFlicksHeadings = [
    { display: "#", key: "index" },
    { display: "Flick", key: "flickIdAndThumbnai" },
    { display: "Description", key: "description" },
    { display: "Suspended", key: "suspended", sortable: true },
    { display: "Created At", key: "createdAt", sortable: true },
]