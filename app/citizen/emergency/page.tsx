import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function EmergencyContactsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/citizen/login")
  }

  const { data: contacts } = await supabase
    .from("emergency_contacts")
    .select("*")
    .eq("is_active", true)
    .order("service_name")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/citizen">
            <Button variant="ghost">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card className="mb-6 border-red-200 bg-red-50">
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
                <CardTitle className="text-2xl font-bold text-red-900">Emergency Services</CardTitle>
                <CardDescription className="text-red-700">In case of emergency, call 911 immediately</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Emergency Contacts</h2>
          <p className="text-slate-600">Quick access to important emergency services</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {contacts?.map((contact) => (
            <Card key={contact.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {contact.service_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600">Phone:</span>
                  <a
                    href={`tel:${contact.phone_number}`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {contact.phone_number}
                  </a>
                </div>
                {contact.email && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">Email:</span>
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                      {contact.email}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600">Available:</span>
                  <span className="text-slate-700">{contact.availability}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
