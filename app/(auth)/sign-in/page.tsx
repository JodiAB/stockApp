'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type SignInFormValues = {
    email: string;
    password: string;
};

export default function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: SignInFormValues) => {
        setLoading(true);
        try {
            // 👇 Replace this with your sign-in logic (API call / auth provider)
            console.log('Sign in with:', data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-sm rounded-xl bg-gray-800 p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-white text-center mb-6">
                    Sign in to your account
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-gray-200">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <Label htmlFor="password" className="text-gray-200">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                {/* Footer Links */}
                <p className="mt-4 text-sm text-gray-400 text-center">
                    Don’t have an account?{' '}
                    <a href="/sign-up" className="text-yellow-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
