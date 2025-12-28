"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DepartmentIncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [incidentId, setIncidentId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [incident, setIncident] = useState<any>(null)
  const [updates, setUpdates] = useState<any[]>([])
  const [newStatus, setNewStatus] = useState<string>("")
  const [updateMessage, setUpdateMessage] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params
      setIncidentId(resolvedParams.id)
    }
    unwrapParams()
  }, [params])

  useEffect(() => {
    const fetchData = async () => {
      if (!incidentId) return

      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/department/login")
        return
      }

      setUserId(user.id)

      const { data: incidentData } = await supabase
        .from("incidents")
        .select("*, citizens(full_name, phone_number, email)")
        .eq("id", incidentId)
        .single()

      if (incidentData) {
        setIncident(incidentData)
        setNewStatus(incidentData.status)
      }

      const { data: updatesData } = await supabase
        .from("incident_updates")
        .select("*")
        .eq("incident_id", incidentId)
        .order("created_at", { ascending: true })

      setUpdates(updatesData || [])
    }

    fetchData()
  }, [incidentId, router])

  const handleAssignToMe = async () => {
    if (!incidentId || !userId) return

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const { error: updateError } = await supabase
        .from("incidents")
        .update({ assigned_department_id: userId })
        .eq("id", incidentId)

      if (updateError) throw updateError

      const { error: insertError } = await supabase.from("incident_updates").insert({
        incident_id: incidentId,
        user_id: userId,
        user_type: "department",
        message: "Department has taken ownership of this incident",
      })

      if (insertError) throw insertError

      router.refresh()
      window.location.reload()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!incidentId || !userId) return

    setIsSubmitting(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: updateError } = await supabase.from("incidents").update({ status: newStatus }).eq("id", incidentId)

      if (updateError) throw updateError

      if (updateMessage.trim()) {
        const { error: insertError } = await supabase.from("incident_updates").insert({
          incident_id: incidentId,
          user_id: userId,
          user_type: "department",
          message: updateMessage,
          status_change: newStatus,
        })

        if (insertError) throw insertError
      }

      setUpdateMessage("")
      window.location.reload()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!incident) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link href="/department">
            <Button variant="ghost">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
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

                <Separator />

                <div>
                  <h3 className="mb-2 font-semibold text-slate-900">Citizen Information</h3>
                  <p className="text-slate-700">Name: {(incident.citizens as any)?.full_name || "Unknown"}</p>
                  <p className="text-slate-700">Phone: {(incident.citizens as any)?.phone_number || "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Updates & Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {updates.length === 0 ? (
                  <p className="text-center text-slate-600">No updates yet</p>
                ) : (
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <div key={update.id} className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="font-semibold text-slate-900">
                              {update.user_type === "citizen" ? "Citizen" : "Department"}
                            </span>
                            <span className="text-sm text-slate-600">
                              {new Date(update.created_at).toLocaleString()}
                            </span>
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

          <div className="space-y-6">
            {!incident.assigned_department_id && (
              <Card>
                <CardHeader>
                  <CardTitle>Take Action</CardTitle>
                  <CardDescription>Assign this incident to your department</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleAssignToMe} className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Assigning..." : "Assign to Me"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {incident.assigned_department_id === userId && (
              <Card>
                <CardHeader>
                  <CardTitle>Update Status</CardTitle>
                  <CardDescription>Change incident status and add notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStatusUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="acknowledged">Acknowledged</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Update Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Add a note about this status change..."
                        value={updateMessage}
                        onChange={(e) => setUpdateMessage(e.target.value)}
                        rows={4}
                      />
                    </div>

                    {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Incident"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
