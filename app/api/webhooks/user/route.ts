import type {User} from "@clerk/nextjs/api";
import {Webhook, WebhookRequiredHeaders} from "svix";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {IncomingHttpHeaders} from "http";
import {prisma} from "@/lib/db";

type UnwantedKeys =
    "emailAddresses"
    | "firstName"
    | "lastName"
    | "primaryEmailAddressId"
    | "primaryPhoneNumberId"
    | "phoneNumbers";

interface UserInterface extends Omit<User, UnwantedKeys> {
    id: string;
    externalId: string
    username: string;
    email_addresses: {
        id: string;
        object: string;
        email_address: string;
    }[];
    image_url: string;
}

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

async function handler(req: Request) {
    const payload = await req.json()
    const payloadString = JSON.stringify(payload);
    const headerPayload = headers();

    const svixId = headerPayload.get("svix-id");
    const svixIdTimeStamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    if (!svixId || !svixIdTimeStamp || !svixSignature) {
        console.log("svixId", svixId)
        console.log("svixIdTimeStamp", svixIdTimeStamp)
        console.log("svixSignature", svixSignature)
        return new Response("Error occured", {status: 400})
    }
    const svixHeaders = {
        "svix-id": svixId,
        "svix-timestamp": svixIdTimeStamp,
        "svix-signature": svixSignature,
    };

    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;

    try {
        evt = wh.verify(
            payloadString,
            svixHeaders as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;
    } catch (err) {
        console.log((err as Error).message)
        return NextResponse.json({}, {status: 400});
    }

    // Handle the webhook
    const eventType: EventType = evt.type;
    if (eventType === "user.created" || eventType === "user.updated") {
        const {
            id,
            username,
            image_url,
            email_addresses,
        } = evt.data;

        const userEmails = email_addresses.map((email) => {
            return {
                id: email.id as string,
                object: email.object as string,
                email_address: email.email_address as string,
            };
        });

        await prisma.user.upsert({
            where: {externalId: id as string},
            create: {
                externalId: id as string,
                username: username as string,
                profileImageUrl: image_url as string,
                email: {
                    create: userEmails,
                },
            },
            update: {
                username: username as string,
                profileImageUrl: image_url as string,
                email: {
                    upsert: userEmails.map((email) => ({
                        where: {id: email.id},
                        create: email,
                        update: email,
                    })),
                },
            },
        });
    }

    return new NextResponse();
}


type EventType = "user.created" | "user.updated" | "*";

type Event = {
    data: UserInterface;
    object: "event";
    type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;