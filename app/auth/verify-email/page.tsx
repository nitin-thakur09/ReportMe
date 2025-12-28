"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const [isChecking, setIsChecking] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkEmailConfirmation = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user && user.email_confirmed_at) {
        // Email is confirmed, create the profile
        const pendingCitizen = sessionStorage.getItem("pendingCitizenProfile")
        const pendingDepartment = sessionStorage.getItem("pendingDepartmentProfile")

        if (pendingCitizen) {
          const profileData = JSON.parse(pendingCitizen)
          await supabase.from("citizens").insert(profileData)
          sessionStorage.removeItem("pendingCitizenProfile")
          router.push("/citizen")
        } else if (pendingDepartment) {
          const profileData = JSON.parse(pendingDepartment)
          await supabase.from("departments").insert(profileData)
          sessionStorage.removeItem("pendingDepartmentProfile")
          router.push("/department")
        }
      }
    }

    checkEmailConfirmation()
  }, [router])

  const handleCheckAgain = async () => {
    setIsChecking(true)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user && user.email_confirmed_at) {
      const pendingCitizen = sessionStorage.getItem("pendingCitizenProfile")
      const pendingDepartment = sessionStorage.getItem("pendingDepartmentProfile")

      if (pendingCitizen) {
        const profileData = JSON.parse(pendingCitizen)
        await supabase.from("citizens").insert(profileData)
        sessionStorage.removeItem("pendingCitizenProfile")
        router.push("/citizen")
      } else if (pendingDepartment) {
        const profileData = JSON.parse(pendingDepartment)
        await supabase.from("departments").insert(profileData)
        sessionStorage.removeItem("pendingDepartmentProfile")
        router.push("/department")
      }
    } else {
      setIsChecking(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
            <CardDescription>We've sent a confirmation email to your inbox</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Please check your email and click the confirmation link to activate your account. After confirming, click
              the button below.
            </p>
            <Button onClick={handleCheckAgain} className="w-full" disabled={isChecking}>
              {isChecking ? "Checking..." : "I've Confirmed My Email"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
