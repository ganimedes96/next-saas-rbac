'use client'

import { AlertTriangle, Github, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hook/use-form-state'

import { signInWithGithub } from '../actions'
import { signWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()
  const [{ errors, success, message }, handleSignIn, isPending] = useFormState(
    signWithEmailAndPassword,
    () => router.push('/'),
  )
  return (
    <div className="space-y-4">
      <form onSubmit={handleSignIn} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />
          {errors?.email && (
            <p className="text-xm font-medium text-red-500 dark:text-red-500">
              {errors.email[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {errors?.password && (
            <p className="text-xm font-medium text-red-500 dark:text-red-500">
              {errors.password[0]}
            </p>
          )}
          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>
        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>
      <form action={signInWithGithub}>
        <Separator />
        <Button type="submit" className="w-full" variant="outline">
          <Github className="mr-2 h-4 w-4" />
          Sign in with GitHub
        </Button>
      </form>
    </div>
  )
}
