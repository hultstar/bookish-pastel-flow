
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/lib/mockData";
import { Search, UserPlus, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsersPage = () => {
  // Filter only regular users (not admins)
  const users = mockUsers.filter(user => user.role === "user");
  
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Users</h2>
            <p className="text-gray-600">Manage library users and memberships</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full md:w-[240px]"
              />
            </div>
            <Button className="bg-library-purple hover:bg-library-purple/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => {
                const displayName = `${user.firstName} ${user.lastName}`;
                const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
                return (
                  <div key={user.id} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={undefined} alt={displayName} />
                      <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{displayName}</h4>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="px-4">
                      <div className="flex items-center">
                        <Book className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {user.borrowedBooks.length} books borrowed
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Member since {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="px-4">
                      <Badge variant="outline" className={user.role === "user" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {user.role}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button size="sm" variant="secondary">
                        Edit
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
