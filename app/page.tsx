import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h1 className="text-xl font-bold text-slate-900">ReportMe</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/citizen/login">
              <Button variant="ghost">Citizen Login</Button>
            </Link>
            <Link href="/auth/department/login">
              <Button variant="outline">Department Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-slate-900">Report Incidents. Track Progress. Stay Safe.</h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            A comprehensive platform connecting citizens with emergency services and government departments for
            efficient incident reporting and management.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <Card className="border-2 border-blue-100 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl">For Citizens</CardTitle>
              <CardDescription className="text-base">
                Report incidents, track their status, and access emergency contacts quickly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Quick incident reporting with category selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Real-time status tracking and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure identity verification system</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Access to emergency contact directory</span>
                </li>
              </ul>
              <div className="flex gap-3 pt-4">
                <Link href="/auth/citizen/sign-up" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Register as Citizen
                  </Button>
                </Link>
                <Link href="/auth/citizen/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <svg className="h-8 w-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl">For Departments</CardTitle>
              <CardDescription className="text-base">
                Manage incidents efficiently, coordinate responses, and keep citizens informed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Centralized incident dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Assign and track incident ownership</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Update incident status in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Communicate directly with citizens</span>
                </li>
              </ul>
              <div className="flex gap-3 pt-4">
                <Link href="/auth/department/sign-up" className="flex-1">
                  <Button className="w-full bg-slate-700 hover:bg-slate-800" size="lg">
                    Register Department
                  </Button>
                </Link>
                <Link href="/auth/department/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl text-red-900">Emergency Services</CardTitle>
                <CardDescription className="text-red-700">In case of life-threatening emergency</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-1 font-semibold text-slate-900">Police Emergency</h3>
                <a href="tel:911" className="text-2xl font-bold text-red-600 hover:underline">
                  911
                </a>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-1 font-semibold text-slate-900">Fire Department</h3>
                <a href="tel:911" className="text-2xl font-bold text-red-600 hover:underline">
                  911
                </a>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-1 font-semibold text-slate-900">Medical Emergency</h3>
                <a href="tel:911" className="text-2xl font-bold text-red-600 hover:underline">
                  911
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-slate-600">
          <p className="text-sm">Incident Reporting System - Connecting Citizens with Emergency Services</p>
        </div>
      </footer>
    </div>
  )
}
