'use client';
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import CardWrapper from "@/components/Card";
import { Input } from "@/components/ui/input";
import { baseURL } from "@/lib/axioxWithAuth";
import { useRouter } from "next/navigation";
import CustomBreadCrumb from "@/components/ui/custom-breadcrumbs";
import { MediaControlCreateSongsBreadCrumbs } from "@/constants/bread-crumbs";
import { handleUploadToPresignedUrl } from "@/utils/utils";

// Zod schema for song metadata
const SongSchema = z.object({
    name: z.string().min(4, "Name is required"),

    // Validate an array of File (instead of FileList)
    audioFile: z.array(z.instanceof(File))
        .nonempty("Audio file is required") // Ensures at least one file
        .refine(files => files[0]?.type.startsWith("audio/"), "Invalid audio format"),

    iconFile: z.array(z.instanceof(File))
        .nonempty("Icon is required") // Ensures at least one file
        .refine(files => files[0]?.type.startsWith("image/"), "Invalid image format"),

    duration: z.number().min(1, "Duration must be at least 1 second") // More strict than `.positive()`
});

type SongData = z.infer<typeof SongSchema>;

export default function CreateStory() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [iconSrc, setIconSrc] = useState<string | null>(null); // New state for icon preview

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SongData>({
        resolver: zodResolver(SongSchema),
    });

    const audioFileList = watch("audioFile");
    const iconFileList = watch("iconFile")

    // Handle audio file preview and duration calculation
    useEffect(() => {
        if (audioFileList?.length > 0) {
            const audioFile = audioFileList[0];
            const url = URL.createObjectURL(audioFile);
            setAudioSrc(url);
            const audio = new Audio(url);
            audio.onloadedmetadata = () => {
                if (!isNaN(audio.duration)) {
                    setValue("duration", Math.floor(audio.duration));
                }
            };
            audio.onerror = () => {
                toast.error("Invalid audio file. Please try another one.");
            };
            if (iconFileList?.length > 0) {
                const file = iconFileList[0];
                const url = URL.createObjectURL(file);
                setIconSrc(url);
                // Cleanup object URL
                return () => URL.revokeObjectURL(url);
            } else {
                setIconSrc(null);
            }
        }
    }, [audioFileList, iconFileList, setValue]);
    const onSubmit: SubmitHandler<SongData> = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const presignedResponse = await axios.post(`${baseURL}/media-control/song/presigned-url`, {
                fileName: data.audioFile[0].name,
                fileType: data.audioFile[0].type,
                iconType: data.iconFile[0].type,
                iconName: data.iconFile[0].name,
            }, {
                withCredentials: true
            }
            );
            console.log(presignedResponse)

            const { audioPresignedUrl, iconPresignedUrl, songId } = presignedResponse.data;

            // 2. Upload files to presigned URLs
            await Promise.all([
                handleUploadToPresignedUrl(data.audioFile[0], audioPresignedUrl),
                handleUploadToPresignedUrl(data.iconFile[0], iconPresignedUrl),
            ]);
            const R2_PUBLIC_URL = 'https://pub-301c1efdf41d428f9ab043c4d4ecbac9.r2.dev'
            await axios.post(`${baseURL}/media-control/song`, {
                _id: songId,
                name: data.name,
                url: `${R2_PUBLIC_URL}/song/${songId}/${data.audioFile[0].name}`,
                icon: `${R2_PUBLIC_URL}/song/${songId}/${data.iconFile[0].name}`,
                duration: data.duration,
            },
                { withCredentials: true }
            );

            toast.success('Song created successfully');
            router.push('list');
        } catch (error: any) {
            console.error('Song creation error:', error);
            toast.error(error.response?.data?.message || 'Failed to create song');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-1 flex-col h-full bg-slate-100">
            <div className="items-center flex justify-between p-4 border-b shadow-md bg-white">
                <h1 className="text-sm font-bold text-gray-800">CREATE SONGS</h1>
                <CustomBreadCrumb data={MediaControlCreateSongsBreadCrumbs} />
            </div>
            <div className="flex flex-1 flex-col m-4">
                <CardWrapper name="Create Songs" viewBtn={false}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-4">
                        {/* Name Input */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1 text-gray-700">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter the Song Name"
                                {...register("name")}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Duration (Auto-filled) */}
                        <div className="flex flex-col">
                            <label htmlFor="duration" className="mb-1 text-gray-700">
                                Duration (Auto-filled) <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="duration"
                                type="number"
                                {...register("duration", { valueAsNumber: true })}
                                readOnly
                                disabled
                                className={errors.duration ? "border-red-500" : ""}
                            />
                            {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="iconFile" className="mb-1 text-gray-700">
                                Icon <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="iconFile"
                                type="file"
                                accept="image/*"
                                {...register("iconFile")}
                                className={errors.iconFile ? "border-red-500" : ""}
                            />
                            {errors.iconFile && <p className="text-red-500 text-sm">{errors.iconFile.message}</p>}
                            {iconSrc && (
                                <img
                                    src={iconSrc}
                                    alt="Icon preview"
                                    className="mt-2 max-h-40 max-w-40 rounded-md shadow-sm"
                                />
                            )}
                        </div>



                        {/* Audio Upload */}
                        <div className="flex flex-col">
                            <label htmlFor="iconFile" className="mb-1 text-gray-700">
                                Song <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="audioFile"
                                type="file"
                                accept="audio/*"
                                {...register("audioFile")}
                                className={errors.audioFile ? "border-red-500" : ""}
                            />
                            {errors.audioFile && <p className="text-red-500 text-sm">{errors.audioFile.message}</p>}
                            {audioSrc && <audio controls src={audioSrc} className="mt-2" />}
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-full flex justify-start mt-4">
                            <button
                                className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none disabled:bg-green-300"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Song...' : 'Create Song'}
                            </button>
                        </div>
                    </form>
                </CardWrapper>
            </div>
        </div>
    );
}
