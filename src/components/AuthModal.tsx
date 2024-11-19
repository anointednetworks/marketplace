import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Toast from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, signup, isLoading } = useAuth();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const handleLogin = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);
    if (success) {
      onClose();
    } else {
      setToastMessage('Invalid email or password');
      setShowToast(true);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    const success = await signup(data.email, data.password, data.name);
    if (success) {
      setToastMessage('Please check your email to verify your account');
      setShowToast(true);
      onClose();
    } else {
      setToastMessage('Failed to create account');
      setShowToast(true);
    }
  };

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-2xl font-bold">
                Account
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </Dialog.Close>
            </div>

            <Tabs.Root defaultValue="login" className="mt-4">
              <Tabs.List className="flex border-b mb-4">
                <Tabs.Trigger
                  value="login"
                  className="flex-1 py-2 px-4 text-center border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                >
                  Login
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="signup"
                  className="flex-1 py-2 px-4 text-center border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                >
                  Sign Up
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="login">
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      {...loginForm.register('email')}
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {loginForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      {...loginForm.register('password')}
                      type="password"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {loginForm.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Login'}
                  </button>
                </form>
              </Tabs.Content>

              <Tabs.Content value="signup">
                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      {...signupForm.register('name')}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {signupForm.formState.errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {signupForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      {...signupForm.register('email')}
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {signupForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {signupForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      {...signupForm.register('password')}
                      type="password"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {signupForm.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {signupForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      {...signupForm.register('confirmPassword')}
                      type="password"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {signupForm.formState.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {signupForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Sign Up'}
                  </button>
                </form>
              </Tabs.Content>
            </Tabs.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Toast.Provider>
        <Toast.Root
          open={showToast}
          onOpenChange={setShowToast}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-[300px]"
        >
          <Toast.Title className="font-medium">
            {toastMessage}
          </Toast.Title>
          <Toast.Close className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <X size={16} />
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </>
  );
}