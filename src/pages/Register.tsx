import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RegisterPage: React.FC = () => {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 w-full'>
      <div className='w-full max-w-sm'>
        <div className={cn("flex flex-col gap-6")}>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center'>
                <p className='text-slate-700'>Welcome to </p>
                <div className='flex'>
                  <h1 className='text-4xl font-bold'>
                    Ruang<span className='text-primary'>Chat</span>
                  </h1>
                  <img src='logo.svg' alt='logo' className='w-10' />
                </div>
              </div>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='username'>Username</Label>
                  <Input id='username' type='text' required />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                  </div>
                  <Input id='password' type='password' required />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Confirm Password</Label>
                  </div>
                  <Input id='password' type='password' required />
                </div>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{" "}
                <a href='#' className='underline underline-offset-4'>
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
