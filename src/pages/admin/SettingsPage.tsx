
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
          <p className="text-gray-600">Manage your library system preferences</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Library Information</CardTitle>
                  <CardDescription>
                    Update your library's basic information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="libraryName">Library Name</Label>
                        <Input id="libraryName" defaultValue="LibraryHub Central" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input id="contactEmail" type="email" defaultValue="contact@libraryhub.com" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Library Street, Booktown" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        className="w-full min-h-[100px] p-2 border border-gray-200 rounded-md"
                        defaultValue="LibraryHub Central is a modern digital library management system offering a vast collection of books across various genres."
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Settings</CardTitle>
                  <CardDescription>
                    Configure book loan durations and penalties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="defaultLoanDuration">Default Loan Duration (days)</Label>
                        <Input id="defaultLoanDuration" type="number" defaultValue="14" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxLoanDuration">Maximum Loan Duration (days)</Label>
                        <Input id="maxLoanDuration" type="number" defaultValue="30" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lateFee">Late Fee (per day)</Label>
                        <Input id="lateFee" defaultValue="$0.50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxBooks">Max Books Per User</Label>
                        <Input id="maxBooks" type="number" defaultValue="5" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="allowExtensions" defaultChecked />
                      <Label htmlFor="allowExtensions">Allow users to request loan extensions</Label>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure when and how notifications are sent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Due Date Reminders</Label>
                          <p className="text-sm text-gray-500">Notify users when books are due soon</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Overdue Notices</Label>
                          <p className="text-sm text-gray-500">Send reminders for overdue books</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Book Arrivals</Label>
                          <p className="text-sm text-gray-500">Notify users about new books</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">System Notifications</h3>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Admin Alerts</Label>
                          <p className="text-sm text-gray-500">Get notified about system events</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Daily Reports</Label>
                          <p className="text-sm text-gray-500">Receive daily summary reports</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system behavior and maintenance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Maintenance</h3>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Automatic Backups</Label>
                          <p className="text-sm text-gray-500">Schedule regular system backups</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="backupFrequency">Backup Frequency</Label>
                          <select id="backupFrequency" className="w-full p-2 border border-gray-200 rounded-md">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="retentionDays">Retention Period (days)</Label>
                          <Input id="retentionDays" type="number" defaultValue="30" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" className="mr-2">
                          Run Manual Backup
                        </Button>
                        <Button variant="secondary">
                          View Backup History
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Access Control</h3>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Password Policy</Label>
                          <p className="text-sm text-gray-500">Enforce strong password requirements</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Session Timeout</Label>
                          <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save System Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
