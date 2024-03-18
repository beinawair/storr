"use client"

import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from '../convex/_generated/api'

export default function Home() {
  const organization = useOrganization()
  const user = useUser()

  let orgsId = null
  if(organization.isLoaded && user.isLoaded) {
    orgsId = organization.organization?.id ?? user.user?.id
  }

  const files = useQuery(api.files.getFile, orgsId ? {orgsId} : 'skip')
  const createFile = useMutation(api.files.createFile)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {files?.map((val) => (
        <p key={val._id}>{val.name}</p>
      ))}

      <Button onClick={() => {
        if(!orgsId) return

        createFile({
        name: "Hai Bei!",
        orgsId: orgsId
      })}}>Click This</Button>
    </main>
  );
}
