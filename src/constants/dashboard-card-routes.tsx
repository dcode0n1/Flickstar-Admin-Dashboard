import { AntDesignAudioFilled } from "@/components/icons/AntDesignAudioFilled";
import { BiCameraReels } from "@/components/icons/BiCameraReels";
import { EntypoUsers } from "@/components/icons/EntypoUsers";
import { HugeiconsComplaint } from "@/components/icons/HugeiconsComplaint";
import { MaterialSymbolsFeedback } from "@/components/icons/MaterialSymbolsFeedback";
import { MingcuteCommentFill } from "@/components/icons/MingcuteCommentFill";
import { SimpleIconsQuest } from "@/components/icons/SimpleIconsQuest";
import { StreamlineSongRecommendation } from "@/components/icons/StreamlineSongRecommendation";


export const dashboardCardData= [
    { value: "0", title: "USERS", link: "/users/list", imageComponent: <EntypoUsers className="text-blue-600"/> },
    { value: "0", title: "FLICKS", link: "/media-control/flick/list", imageComponent: <BiCameraReels className="text-yellow-500"/> },
    { value: "$33,388.00", title: "SONG", link: "/media-control/song/list", imageComponent: <StreamlineSongRecommendation className="text-blue-400" /> },
    { value: "$856.00", title: "AUDIO", link: "/media-control/audio/list", imageComponent: <AntDesignAudioFilled /> },
    { value: "10", title: "QUESTS ", link: "/media-control/quest/list", imageComponent: <SimpleIconsQuest className="text-purple-700"/> },
    { value: "20", title: "COMMENTS", link: "/media-control/comment/list", imageComponent: <MingcuteCommentFill className="text-purple-500" /> },
    { value: "97", title: "FEEDBACKS", link: "/feedback/list", imageComponent: <MaterialSymbolsFeedback className="text-red-500"/> },
   
];




export const  dashboardReportCardData = [
    { value: "107", title: "REPORTS USERS", link: "/report/user/list", imageComponent: <HugeiconsComplaint className="text-red-500" /> },
    { value: "107", title: "REPORTS FLICKS ", link: "/report/flick/list", imageComponent: <HugeiconsComplaint className="text-red-500" /> },
    { value: "107", title: "REPORTS QUESTS", link: "/report/quest/list", imageComponent: <HugeiconsComplaint className="text-red-500" /> },
    { value: "107", title: "REPORTS AUDIO", link: "/report/audio/list", imageComponent: <HugeiconsComplaint className="text-red-500" /> },
    { value: "107", title: "REPORTS COMMENTS", link: "/report/comment/list", imageComponent: <HugeiconsComplaint className="text-red-500" /> },
]

