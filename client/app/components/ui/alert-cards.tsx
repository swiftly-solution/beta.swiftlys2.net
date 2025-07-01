import { AlertOctagonIcon, CheckCircleIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export const ErrorCard = ({ text }: { text?: string }) => (
    <Alert variant={"destructive"} className="bg-[#a2000066] text-white">
        <AlertOctagonIcon className="h-6 w-6 stroke-white" />
        <AlertTitle className="ml-1 text-lg flex gap-2 items-center">Error</AlertTitle>
        <AlertDescription className="ml-1">
            <div dangerouslySetInnerHTML={{ __html: text || "Unknown Error" }} />
        </AlertDescription>
    </Alert>
)

export const SuccessCard = ({ text }: { text?: string }) => (
    <Alert className="bg-[#008c1666] text-white border-[#008c1666]">
        <CheckCircleIcon className="h-6 w-6 stroke-white" />
        <AlertTitle className="ml-1 text-lg flex gap-2 items-center">Success</AlertTitle>
        <AlertDescription className="ml-1">
            <div dangerouslySetInnerHTML={{ __html: text || "Unknown Success" }} />
        </AlertDescription>
    </Alert>
)

export const WarningCard = ({ text }: { text?: string }) => (
    <Alert className="bg-[#ffcc0066] text-white border-[#ffcc0066]">
        <TriangleAlertIcon className="h-6 w-6 stroke-white" />
        <AlertTitle className="ml-1 text-lg flex gap-2 items-center">Warning</AlertTitle>
        <AlertDescription className="ml-1">
            <div dangerouslySetInnerHTML={{ __html: text || "Unknown Warning" }} />
        </AlertDescription>
    </Alert>
)

export const NoteCard = ({ text }: { text?: string }) => (
    <Alert className="bg-[#40a6ce66] text-white border-[#40a6ce66]">
        <InfoIcon className="h-6 w-6 stroke-white" />
        <AlertTitle className="ml-1 text-lg flex gap-2 items-center">Note</AlertTitle>
        <AlertDescription className="ml-1">
            <div dangerouslySetInnerHTML={{ __html: text || "Unknown Note" }} />
        </AlertDescription>
    </Alert>
)