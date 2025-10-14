import {serve} from "inngest/next";
import {inngest} from "@/lib/inngest/client";
import {sendDailyNewsSummary, sendSignUpEmail} from "@/lib/inngest/fuctions";


export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail, sendDailyNewsSummary],
})