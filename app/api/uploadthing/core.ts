import {createUploadthing, type FileRouter} from "uploadthing/next";
import {auth} from "@clerk/nextjs";
import {isTeacher} from "@/lib/teacher";

const f = createUploadthing();

const handleAuth = () => {
    const {userId} = auth();
    const isAuthorized = isTeacher(userId);

    if (!userId || !isAuthorized) throw new Error("Unauthorized");
    return {userId}
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    courseImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
        // Set permissions and file types for this FileRoute
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
        }),

    courseAttachment: f({
        text: {maxFileSize: "1MB"},
        image: {maxFileSize: "4MB", maxFileCount: 5},
        video: {maxFileSize: "256MB", maxFileCount: 1},
        audio: {maxFileSize: "8MB", maxFileCount: 3},
        pdf: {maxFileSize: "64MB", maxFileCount: 5}
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
        }),

    taskAttachment: f({
        text: {maxFileSize: "1MB"},
        image: {maxFileSize: "4MB", maxFileCount: 5},
        video: {maxFileSize: "256MB", maxFileCount: 1},
        audio: {maxFileSize: "8MB", maxFileCount: 3},
        pdf: {maxFileSize: "64MB", maxFileCount: 5}
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
        }),

    doTaskAttachment: f({
        text: {maxFileSize: "1MB"},
        image: {maxFileSize: "4MB", maxFileCount: 5},
        video: {maxFileSize: "256MB", maxFileCount: 1},
        audio: {maxFileSize: "8MB", maxFileCount: 3},
        pdf: {maxFileSize: "64MB", maxFileCount: 5}
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
        }),

    chapterVideo: f({video: {maxFileSize: "512GB", maxFileCount: 1}})
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
        }),

    postAttachment: f({
        text: {maxFileSize: "1MB"},
        image: {maxFileSize: "4MB", maxFileCount: 5},
        video: {maxFileSize: "256MB", maxFileCount: 1},
        audio: {maxFileSize: "8MB", maxFileCount: 3},
        pdf: {maxFileSize: "64MB", maxFileCount: 5}
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;