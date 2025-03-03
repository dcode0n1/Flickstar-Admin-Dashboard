"use client"
import CardWrapper from '@/components/Card';
import CustomBreadCrumb from '@/components/ui/custom-breadcrumbs'
import { Input } from '@/components/ui/input';
import { SendMailBreadCrumbs } from '@/constants/bread-crumbs'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import sanitizeHtml from 'sanitize-html';
import { toast } from 'sonner';
import { z } from 'zod';

const mailSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
    body: z.string().min(1, "Body is required"),
    attachment: z.any(),
});

type MailData = z.infer<typeof mailSchema>;

export default function SendMailUser() {
    const sanitize = (html: string) => sanitizeHtml(html);
    const { slug } = useParams<{ slug: string }>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<MailData>({
        resolver: zodResolver(mailSchema),
        defaultValues: {
            subject: "",
            body: "Mail Body", // Default value
        }
    });
    // Local state to prevent hydration mismatch
    const [editorContent, setEditorContent] = useState<string>("");

    // Sync form state with editor state after hydration
    useEffect(() => {
        setEditorContent(getValues("body") || ""); // Get default value after hydration
    }, []);

    const handleEditorChange = (value: string) => {
        setEditorContent(value);
        setValue("body", value, { shouldValidate: true }); // Update form state
    };

    const onSubmit: SubmitHandler<MailData> = async (formData) => {
        console.log("====> formData", formData);
    };

    return (
        <>
            <div className="flex justify-between p-4 bg-white">
                <h1 className="text-sm font-bold text-gray-700 uppercase">SEND MAIL {`${slug}`}</h1>
                <CustomBreadCrumb data={SendMailBreadCrumbs} />
            </div>
            <div className="p-4 bg-slate-50">
                <CardWrapper name="Send Mail">
                    <form className="flex flex-col space-y-2 p-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* Subject Field */}
                        <div className="flex flex-col">
                            <label htmlFor="subject" className="mb-1 text-gray-700">
                                Subject <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="subject"
                                type="text"
                                placeholder="Subject"
                                {...register("subject")}
                                className={errors.subject ? "border-red-500" : ""}
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm">{errors.subject.message}</p>
                            )}
                        </div>

                        {/* Body Field */}
                        <div className="flex flex-col">
                            <label htmlFor="body" className="mb-1 text-gray-700">
                                Body <span className="text-red-500">*</span>
                            </label>
                            <MdEditor
                                className=""
                                language="en-US"
                                htmlPreview
                                value={editorContent} // Use local state
                                sanitize={sanitize}
                                onHtmlChanged={(value) => handleEditorChange(value)}
                                // onChange={handleEditorChange}
                            />
                            {errors.body && (
                                <p className="text-red-500 text-sm">{errors.body.message}</p>
                            )}
                        </div>

                        {/* Attach Files */}
                        <div className="flex flex-col">
                            <label htmlFor="attachment" className="mb-1 text-gray-700">
                                Attach Files
                            </label>
                            <Input type="file" accept="image/*" {...register('attachment')}/>
                        </div>

                        <div className="col-span-full flex justify-end pt-4 ">
                            <button
                                className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none"
                                type="submit"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </CardWrapper>
            </div>
        </>
    );
}
