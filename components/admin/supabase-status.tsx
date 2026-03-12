"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export function SupabaseStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [error, setError] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])

  useEffect(() => {
    async function checkConnection() {
      try {
        // Simple query to check connection
        const { data, error } = await supabase
          .from("research_projects")
          .select("count()", { count: "exact", head: true })

        if (error) throw error

        // If we get here, connection is successful
        setStatus("connected")

        // Get list of tables
        const { data: tableData } = await supabase.from("pg_tables").select("tablename").eq("schemaname", "public")

        if (tableData) {
          setTables(tableData.map((t) => t.tablename))
        }
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : String(err))
      }
    }

    checkConnection()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Supabase Connection Status
          {status === "connected" && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Connected
            </Badge>
          )}
          {status === "error" && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Error
            </Badge>
          )}
          {status === "loading" && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Checking...
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Connection to your Supabase database at {process.env.NEXT_PUBLIC_SUPABASE_URL}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "connected" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Available Tables</h3>
              {tables.length > 0 ? (
                <ul className="mt-2 text-sm text-muted-foreground">
                  {tables.map((table) => (
                    <li key={table}>{table}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  No tables found. You may need to create your schema.
                </p>
              )}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === "loading" && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <p>Testing connection...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
