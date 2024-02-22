'use client';

import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

import Logo from "./logo";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const {isLoading, isAuthenticated} = useConvexAuth();
    const scrolled = useScrollTop();
  return (
    <div className={cn("z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm dark:shadow-gray-400")}>
        <Logo/>
        <div className="flex items-center gap-x-2 md:ml-auto md:justify-end justify-between w-full">
          {isLoading && (
            <Spinner />
          )}
          {!isAuthenticated && !isLoading && (
            <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">
                Get started
              </Button>
            </SignUpButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">
                Enter Notion
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/"/>
            </>
          )}
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Navbar