"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

const Heading = () => {
  const {isLoading, isAuthenticated} = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
            Your Ideas, Documents and Plans Unified. Welcome to&nbsp;
            <span className="underline">Notion</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
            Notion is the connected workspace where <br/>
            better, faster work happens.
        </h3>
        {isLoading && (
          <div className="flex justify-center items-center w-full">
            <Spinner size="lg"/>
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <Button className="group" asChild>
            <Link href="/documents">
            Enter Notion
            <ArrowRight className="w-4 h-4 ml-2 transition-all duration-300 group-hover:ml-4"/>
            </Link>
          </Button>
        )}
        {!isLoading && !isAuthenticated && (
          <SignInButton mode="modal">
            <Button className="group">
              Get Notion Free
              <ArrowRight className="w-4 h-4 ml-2 transition-all duration-300 group-hover:ml-4"/>
            </Button>
          </SignInButton>
        )}
    </div>
  )
}

export default Heading