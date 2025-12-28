import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default async function IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/citizen/login")
  }

  const { data: incident } = await supabase
    .from("incidents")
    .select("*")
    .eq("id", id)
    .eq("citizen_id", user.id)
    .single()

  if (!incident) {
    redirect("/citizen")
  }

  const { data: updates } = await supabase
    .from("incident_updates")
    .select("*")
    .eq("incident_id", id)
    .order("created_at", { ascending: true })

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500",
    acknowledged: "bg-blue-500",
    in_progress: "bg-purple-500",
    resolved: "bg-green-500",
    closed: "bg-gray-500",
  }

  const severityColors: Record<string, string> = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    critical: "bg-red-500",
  }

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

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold">{incident.title}</CardTitle>
                <CardDescription className="mt-2">
                  Reported on{" "}
                  {new Date(incident.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge className={severityColors[incident.severity]}>{incident.severity}</Badge>
                <Badge className={statusColors[incident.status]}>{incident.status.replace("_", " ")}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold text-slate-900">Description</h3>
              <p className="text-slate-700">{incident.description}</p>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Category</h3>
                <p className="text-slate-700">{incident.category}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Location</h3>
                <p className="text-slate-700">
                  {incident.location_address}
                  <br />
                  {incident.location_city}, {incident.location_state}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Updates & Timeline</CardTitle>
            <CardDescription>Track the progress of your incident report</CardDescription>
          </CardHeader>
          <CardContent>
            {!updates || updates.length === 0 ? (
              <p className="text-center text-slate-600">No updates yet. We'll notify you when there are changes.</p>
            ) : (
              <div className="space-y-4">
                {updates.map((update) => (
                  <div key={update.id} className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          {update.user_type === "citizen" ? "You" : "Department"}
                        </span>
                        <span className="text-sm text-slate-600">{new Date(update.created_at).toLocaleString()}</span>
                        {update.status_change && (
                          <Badge className={statusColors[update.status_change]} variant="outline">
                            Status: {update.status_change.replace("_", " ")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-700">{update.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
