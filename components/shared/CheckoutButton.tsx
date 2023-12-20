"use client";

import { IEvent } from "@/lib/mongodb/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <section className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="text-red-400 p-2">
          sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild size="lg" className="rounded-full button ">
              <Link href="/sign-in">Get Ticket</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </section>
  );
};

export default CheckoutButton;
