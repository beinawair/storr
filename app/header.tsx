"use client"

import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, 
  SignInButton, 
  SignOutButton, 
  SignedIn, 
  SignedOut, 
  UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Header() {
  return (
    <div className='w-full border-b py-4 bg-gray-50'>
        <div className="container mx-auto flex justify-between">
            <div>
                <span className="font-bold">
                    STORR
                </span>
            </div>
            <div className="flex gap-3">
              <OrganizationSwitcher />
              <UserButton />
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
            </div>
        </div>
    </div>
  )
}
