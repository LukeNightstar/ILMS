import {AlertCircle} from "lucide-react"

import {Alert, AlertDescription, AlertTitle,} from "@/components/ui/alert"

export function AuthError() {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>보안 오류</AlertTitle>
            <AlertDescription>
                당신은 권한이 없습니다.
            </AlertDescription>
        </Alert>
    )
}
