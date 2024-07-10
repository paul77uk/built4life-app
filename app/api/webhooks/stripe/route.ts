import { stripe } from "@/lib/stripe";
import { db } from "@/server";
import { users } from "@/server/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

const webhookSecret =
  process.env.NODE_ENV === "development"
    ? process.env.STRIPE_WEBHOOK_SECRET_DEV_KEY!
    : process.env.STRIPE_WEBHOOK_SECRET_LIVE_KEY!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return new Response("Invalid signature", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
  const data = event.data;
  const eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          (data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items", "customer_details"],
          }
        );
        const customerId = session.customer as string;
        const customerDetails =
          session.customer_details as Stripe.Checkout.Session.CustomerDetails;
        const lineItems = session.line_items?.data || [];

        if (customerDetails.email) {
          const user = await db.query.users.findFirst({
            where: eq(users.email, customerDetails.email),
          });

          if (!user) throw new Error("User not found");

          if (!user.customerId) {
            await db
              .update(users)
              .set({ customerId })
              .where(eq(users.id, user.id));
          }
        }

        for (const item of lineItems) {
          const priceId = item.price?.id;
          const isSubscription = item.price?.type === "recurring";

          if (isSubscription) {
            let endDate = new Date();
          } 
          // else {
          //   // TODO: Handle one-time purchases, or maybe don't need this as we have ni one time purchases
          // }
        }
    }
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
