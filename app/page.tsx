import { Sidebar } from '@/components/sidebar';
import ProtectedLayout from "../components/ProtectedLayout"

export default function Home() {
  return (
    // <ProtectedLayout>
    // <Sidebar>
    <>
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Welcome to HomeOS
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your intelligent home management platform
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <a
              href="/login"
              className="block w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/signup"
              className="block w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
      
    {/* </Sidebar> */}
    {/* // </ProtectedLayout> */}
    </>
  );
}