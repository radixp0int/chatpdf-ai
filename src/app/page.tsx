import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r to-orange-200 from-blue-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with Pa-Pa.ai</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            { isAuth && <Button>Start Chat</Button> }
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join thousands of users to instantly answer questions and understand research with AI.
          </p>

          <div className="w-full mt-4">
            {isAuth ? (<h1>fileupload</h1>) : (
              <Link href="/sign-in">
                <Button>Login to Start
                  <LogIn className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
