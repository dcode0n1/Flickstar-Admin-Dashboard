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
import { MediaControlCreateQuestBreadCrumbs } from "@/constants/bread-crumbs";
import { handleUploadToPresignedUrl } from "@/utils/utils";

// Zod schema for quest
const QuestSchema = z.object({
    title: z.string().min(4, "Title is required"),
    description: z.string().min(4, "Description is required"),
    mode: z.enum(["GoFlick", "OnFlick"]),
    maxApplicants: z.coerce.number().int().min(1, "Max Applicants is required"),
    totalAmount: z.coerce.number().int().min(1, "Total Amount is required"),
    location: z.string().min(4, "Location is required"),
    lat: z.coerce.number().min(-90, "Invalid latitude").max(90, "Invalid latitude"),
    long: z.coerce.number().min(-180, "Invalid longitude").max(180, "Invalid longitude"),
    media: z.array(z.instanceof(File)) // Validate an array of `File` objects
        .nonempty("At least one image/video is required")
        .refine(files =>
            files.every(file => file.type.startsWith("image/") || file.type.startsWith("video/")),
            "Only image/video files are allowed"
        )
});

type QuestData = z.infer<typeof QuestSchema>;

export default function CreateQuest() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mediaPreviews, setMediaPreviews] = useState<Array<{ url: string; type: string }>>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<QuestData>({
        resolver: zodResolver(QuestSchema),
        defaultValues: {
            lat: 26.8770276,
            long: 75.7255187
        }
    });

    const mediaFileList = watch("media");

    // Generate previews for selected media files
    useEffect(() => {
        if (mediaFileList?.length > 0) {
            const files = Array.from(mediaFileList);
            const newPreviews = files.map(file => ({
                url: URL.createObjectURL(file),
                type: file.type
            }));
            setMediaPreviews(newPreviews);

            return () => {
                newPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
            };
        } else {
            setMediaPreviews([]);
        }
    }, [mediaFileList]);

    const onSubmit: SubmitHandler<QuestData> = async (formData) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const mediaFiles = Array.from(formData.media);
            console.log("====> mediaFiles", mediaFiles)

            // 1. Get presigned URLs for all media files
            const presignedResponse = await axios.post(
                `${baseURL}/media-control/quest/presigned-url`,
                {
                    media: mediaFiles.map(file => ({
                        fileName: file.name,
                        fileType: file.type,
                    })),
                },
                { withCredentials: true }
            );
            const { mediaPresignedURLs, questId, staffId } = presignedResponse.data;
            // 2. Upload each file to its presigned URL
            const uploadPromises = mediaFiles.map((file, index) =>
                handleUploadToPresignedUrl(file, mediaPresignedURLs[index])
            );
            const check = await Promise.all(uploadPromises);
            console.log("====> I am check", check)
            // 3. Construct public URLs (adjust based on your backend response)
            const mediaUrls = mediaPresignedURLs.map((_: any, index: number) =>
                `https://pub-301c1efdf41d428f9ab043c4d4ecbac9.r2.dev/staff/${staffId}/quest/${questId}/${mediaFiles[index].name}`
            );
            const { lat, long, media, ...rest } = formData
            // 4. Submit quest data with media URLs
            await axios.post(
                `${baseURL}/media-control/quest`,
                {
                    _id: questId,
                    coords: {
                        lat,
                        long
                    },
                    ...rest,
                    media: mediaUrls, // Ensure correct field name
                },
                { withCredentials: true }
            );

            toast.success('Quest created successfully');
            router.push('list');
        } catch (error: any) {
            console.error('Quest creation error:', error);
            toast.error(error.response?.data?.message || 'Failed to create quest');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-1 flex-col h-full bg-slate-100 ">
            <div className="items-center flex justify-between p-4 border-b shadow-md bg-white">
                <h1 className="text-sm font-bold text-gray-800">CREATE QUEST</h1>
                <CustomBreadCrumb data={MediaControlCreateQuestBreadCrumbs} />
            </div>
            <div className="flex flex-1 flex-col m-4">
                <CardWrapper name="Create Quest" viewBtn={false}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-4">
                        {/* Title Input */}
                        <div className="flex flex-col">
                            <label htmlFor="title" className="mb-1 text-gray-700">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter Quest Title"
                                {...register("title")}
                                className={errors.title ? "border-red-500" : ""}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        {/* Description Input */}
                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-1 text-gray-700">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Enter Quest Description"
                                {...register("description")}
                                className={errors.description ? "border-red-500" : ""}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        {/* Media Upload */}
                        <div className="flex flex-col">
                            <label htmlFor="media" className="mb-1 text-gray-700">
                                Media <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="media"
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                {...register("media")}
                                className={errors.media ? "border-red-500" : ""}
                            />
                            {errors.media && <p className="text-red-500 text-sm">{errors.media.message}</p>}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {mediaPreviews?.map((preview, index) => (
                                    preview.type.startsWith('video/') ? (
                                        <video key={index}
                                            src={preview.url}
                                            className="w-full aspect-video"
                                            controls
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (

                                        <img
                                            key={index}
                                            src={preview.url}
                                            alt={`Preview ${index + 1}`}
                                            className="h-96 w-full"
                                        />
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Mode Selection */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-normal" htmlFor='mode'>
                                Mode<span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                {...register("mode")}
                                className="border rounded-md px-2 py-1.5"
                            >
                                <option value="">Select Mode</option>
                                <option value="GoFlick">GoFlick</option>
                                <option value="OnFlick">OnFlick</option>
                            </select>
                            {errors.mode && <p className="text-sm text-red-500">{errors.mode.message}</p>}
                        </div>

                        {/* Max Applicants */}
                        <div className="flex flex-col">
                            <label htmlFor="maxApplicants" className="mb-1 text-gray-700">
                                Max Applicants <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="maxApplicants"
                                type="number"
                                placeholder="Enter Max Applicants"
                                {...register("maxApplicants")}
                                className={errors.maxApplicants ? "border-red-500" : ""}
                            />
                            {errors.maxApplicants && <p className="text-red-500 text-sm">{errors.maxApplicants.message}</p>}
                        </div>

                        {/* Total Amount */}
                        <div className="flex flex-col">
                            <label htmlFor="totalAmount" className="mb-1 text-gray-700">
                                Total Amount <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="totalAmount"
                                type="number"
                                placeholder="Enter Total Amount"
                                {...register("totalAmount")}
                                className={errors.totalAmount ? "border-red-500" : ""}
                            />
                            {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>}
                        </div>

                        {/* Location */}
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="location" className="mb-1 text-gray-700">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="location"
                                type="text"
                                placeholder="Enter Location"
                                {...register("location")}
                                className={errors.location ? "border-red-500" : ""}
                            />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>

                        {/* Latitude */}
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="coords" className="mb-1 text-gray-700">
                                Lat <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="coords"
                                type="text"
                                placeholder="Enter Coordinates"
                                {...register("lat")}
                                readOnly
                                className={errors.lat ? "border-red-500" : ""}
                            />
                            {errors.lat && <p className="text-red-500 text-sm">{errors.lat.message}</p>}
                        </div>
                        {/* Latitude */}
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="coords" className="mb-1 text-gray-700">
                                Long <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="coords"
                                type="text"
                                placeholder="Enter Coordinates"
                                {...register("long")}
                                readOnly
                                className={errors.long ? "border-red-500" : ""}
                            />
                            {errors.long && <p className="text-red-500 text-sm">{errors.long.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-full flex justify-start mt-4">
                            <button
                                className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none disabled:bg-green-300"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Quest...' : 'Create Quest'}
                            </button>
                        </div>
                    </form>
                </CardWrapper>
            </div>
        </div>
    );
}