import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface inputValue {
  username: string;
  password: string;
  confirm_password: string;
}

interface responseError {
  error: string;
}

export const RegisterPage: React.FC = () => {
  const [data, setData] = useState<inputValue>({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<responseError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData({
      ...data,
      [id]: value,
    });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", { ...data });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        setError(err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 w-full'>
      <div className='w-full max-w-sm'>
        <form onSubmit={handleForm}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center'>
              <p className='text-slate-700'>Welcome back to </p>
              <div className='flex'>
                <h1 className='text-4xl font-bold'>
                  Ruang<span className='text-primary'>Chat</span>
                </h1>
                <img src='logo.svg' alt='logo' className='w-10' />
              </div>
            </div>
            <div className='flex justify-center'>
              {loading ? <PulseLoader size={15} /> : error ? <p className='text-red-700 text-center'>{error?.error}</p> : null}
            </div>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' type='text' onChange={handleInput} required />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' onChange={handleInput} required />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='confirm_password'>Confirm Password</Label>
                <Input id='confirm_password' type='password' onChange={handleInput} required />
              </div>
              <Button type='submit' className='w-full'>
                Register
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className='underline underline-offset-4 font-semibold cursor-pointer'>
                Sign in
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
