import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default async function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Information</CardTitle>
            <CardDescription>Information about your Supabase database connection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Status</Label>
                  <div className="flex items-center mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Connected</span>
                  </div>
                </div>
                <div>
                  <Label>Tables</Label>
                  <div className="mt-1">5</div>
                </div>
                <div>
                  <Label>Provider</Label>
                  <div className="mt-1">Supabase</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>These environment variables are required for the CMS to function</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supabase_url">NEXT_PUBLIC_SUPABASE_URL</Label>
                <Input id="supabase_url" value="https://your-project.supabase.co" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supabase_anon_key">NEXT_PUBLIC_SUPABASE_ANON_KEY</Label>
                <Input id="supabase_anon_key" value="••••••••••••••••••••••••••••••••" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supabase_service_key">SUPABASE_SERVICE_ROLE_KEY</Label>
                <Input id="supabase_service_key" value="••••••••••••••••••••••••••••••••" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextauth_secret">NEXTAUTH_SECRET</Label>
                <Input id="nextauth_secret" value="••••••••••••••••••••••••••••••••" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextauth_url">NEXTAUTH_URL</Label>
                <Input id="nextauth_url" value="http://localhost:3000" disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Help & Documentation</CardTitle>
            <CardDescription>Resources to help you use the CMS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Getting Started</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Learn how to use the CMS to manage your research projects, team members, and blog posts.
              </p>
              <Button variant="link" className="px-0 mt-2">
                View Documentation
              </Button>
            </div>
            <div>
              <h3 className="font-medium">API Reference</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Technical documentation for developers who want to extend the CMS.
              </p>
              <Button variant="link" className="px-0 mt-2">
                View API Reference
              </Button>
            </div>
            <div>
              <h3 className="font-medium">Support</h3>
              <p className="text-sm text-muted-foreground mt-1">Need help? Contact our support team.</p>
              <Button variant="link" className="px-0 mt-2">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
