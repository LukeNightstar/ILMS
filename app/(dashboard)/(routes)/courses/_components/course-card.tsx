import Link from "next/link";
import Image from "next/image";
import {BookOpen} from "lucide-react";
import {IconBadge} from "@/components/icon-badge";
import {CourseProgress} from "@/app/(dashboard)/(routes)/courses/_components/course-progress";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    progress: number | null;
    category: string;
}

export const CourseCard = ({
                               id,
                               title,
                               imageUrl,
                               chaptersLength,
                               progress,
                               category
                           }: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`} className="mt-6">
            <div
                className="group shadow-md hover:shadow-lg hover:border-sky-700 transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        alt={title}
                        src={imageUrl}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="font-semibold group-hover:text-sky-700 transition line-clamp-2">
                        <p className="text-xl">{title}</p>
                    </div>
                    <p className="text-base text-muted-foreground mt-1">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen}/>
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress}
                        />
                    ) : (
                        <p className="text-sm">
                            Progress Error
                        </p>
                    )}

                </div>
            </div>
        </Link>
    )
}