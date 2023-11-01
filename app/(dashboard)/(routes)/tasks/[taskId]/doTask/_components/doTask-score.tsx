import {DoTaskScore} from "@prisma/client"

interface DoTaskScoreProps {
    doTaskScore: DoTaskScore[];
}

const DoTaskScore = ({
                         doTaskScore
                     }: DoTaskScoreProps) => {
    const score = doTaskScore[0]?.score;
    const comment = doTaskScore[0]?.comment;

    return (
        <div className="mt-6 border-t border-b border-gray-300">
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="font-medium leading-6 text-gray-900">점수</dt>
                    <dd className="mt-1 leading-6 text-gray-700 sm:col-span-4 sm:mt-0 flex flex-col">
                        <div className="p-0 text-muted-foreground">
                            {score !== undefined ? score : "성적 없음"}
                        </div>
                    </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="font-medium leading-6 text-gray-900">메모</dt>
                    <dd className="mt-1 leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
                        <p className="p-0 text-muted-foreground">
                            {comment !== undefined ? comment : "메모 없음"}
                        </p>
                    </dd>
                </div>
            </dl>
        </div>
    )
}

export default DoTaskScore;