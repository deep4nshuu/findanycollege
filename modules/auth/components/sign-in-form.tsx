"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const onLoginWithGithub = async () => {
    const data = await authClient.signIn.social({
      provider: 'github'
    })

    console.log(data);

    toast.success("Login with Github successfull");
  }

  const onLoginWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: 'google'
    })

    console.log(data);

    toast.success('Login with Google successfull')
  }

  return (
    <div
      className={cn(
        "relative flex flex-col gap-8 rounded-sm border border-[#1B2A41] bg-[#F2E9D0] px-10 py-14 shadow-[6px_6px_0_0_#A9812F] sm:px-14",
        className
      )}
      {...props}
    >
      {/* inner hairline, diploma-style double border */}
      <div className="pointer-events-none absolute inset-2 rounded-sm border border-[#A9812F]/40" />

      <form className="relative">
        <FieldGroup>
          <div className="flex flex-col items-center gap-4 text-center">
            
            <div className="group relative flex h-20 w-20 items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:rotate-180"
              >
                <defs>
                  <path
                    id="sealCircle"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text
                  className="fill-[#1B2A41]"
                  style={{ fontSize: "6.5px", letterSpacing: "2.5px" }}
                >
                  <textPath href="#sealCircle" startOffset="0%">
                    FINDANYCOLLEGE • EST. 2026 • FINDANYCOLLEGE • EST. 2026 •
                  </textPath>
                </text>
              </svg>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B2A41] bg-[#1B2A41]">
                <GraduationCap className="h-5 w-5 text-[#F2E9D0]" />
              </div>
            </div>

            <div className="space-y-1">
              <h1
                className="text-[28px] font-semibold leading-tight text-[#1B2A41]"
              >
                Welcome to findAnyCollege
              </h1>
              <p className="text-sm italic text-[#5C5237]">
                Your shortlist starts with a single search.
              </p>
            </div>
          </div>

          <Field>
            <Button
              variant="outline"
              type="button"
              onClick={onLoginWithGithub}
              className="h-11 border-[#1B2A41] bg-transparent font-semibold text-[#1B2A41] transition-colors hover:bg-[#1B2A41] hover:text-[#F2E9D0]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4 fill-current">
                <path d="M216.5 362.5c-66-8-112.5-55.5-112.5-117 0-25 9-52 24-70-6.5-16.5-5.5-51.5 2-66 20-2.5 47 8 63 22.5 19-6 39-9 63.5-9s44.5 3 62.5 8.5c15.5-14 43-24.5 63-22 7 13.5 8 48.5 1.5 65.5 16 19 24.5 44.5 24.5 70.5 0 61.5-46.5 108-113.5 116.5 17 11 28.5 35 28.5 62.5l0 52C323 491.5 335.5 500 350.5 494 441 459.5 512 369 512 257 512 115.5 397 0 255.5 0S0 115.5 0 257c0 111 70.5 203 165.5 237.5 13.5 5 26.5-4 26.5-17.5l0-40c-7 3-16 5-24 5-33 0-52.5-18-66.5-51.5-5.5-13.5-11.5-21.5-23-23-6-.5-8-3-8-6 0-6 10-10.5 20-10.5 14.5 0 27 9 40 27.5 10 14.5 20.5 21 33 21s20.5-4.5 32-16c8.5-8.5 15-16 21-21z"/>
              </svg>
              Sign in with GitHub
            </Button>
          </Field>

          <FieldSeparator className="text-[10px] font-semibold uppercase tracking-[3px] text-[#9C8B5E]">
            Or
          </FieldSeparator>

          <Field>
            <Button
              variant="outline"
              type="button"
              onClick={onLoginWithGoogle}
              className="h-11 border-[#1B2A41] bg-transparent font-semibold text-[#1B2A41] transition-colors hover:border-[#7A2E2E] hover:bg-[#7A2E2E] hover:text-[#F2E9D0]"
            >
              <Image src={'/google.svg'} alt='google' width={18} height={18} />
              Sign in with Google
            </Button>
          </Field>

          <p className="text-center text-[11px] tracking-wide text-[#9C8B5E]">
            By continuing, you agree to actually finish an application this time.
          </p>
        </FieldGroup>
      </form>
    </div>
  )
}