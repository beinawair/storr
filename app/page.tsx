"use client"

import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from '../convex/_generated/api'

export default function Home() {
  const files = useQuery(api.files.getFile)
  const createFile = useMutation(api.files.createFile)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((val) => (
        <p key={val._id}>{val.name}</p>
      ))}

      <Button onClick={() => createFile({
        name: "Hai Bei!"
      })}>Click This</Button>
    </main>
  );
}
