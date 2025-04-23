
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBorrowedBooks, mockUsers } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Book, Calendar, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const IssuedBooksPage = () => {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Issued Books</h2>
            <p className="text-gray-600">Manage books currently issued to users</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search books..."
                className="pl-8 w-full md:w-[240px]"
              />
            </div>
            <Button className="bg-library-purple hover:bg-library-purple/90">
              Export List
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Currently Issued Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBorrowedBooks.map((book) => {
                const user = mockUsers.find(u => u.id === book.id.substring(0, 5)); // Temporary fix to associate books with users
                const daysLeft = Math.ceil(
                  (book.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                let statusColor = "text-green-500";
                if (daysLeft < 0) statusColor = "text-red-500";
                else if (daysLeft < 3) statusColor = "text-orange-500";
                
                const displayName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";
                const email = user ? user.email : "unknown@example.com";

                return (
                  <div key={book.id} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0 mr-4">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-medium truncate">{book.title}</h4>
                      <p className="text-sm text-gray-500 truncate">by {book.author}</p>
                      <div className="flex items-center mt-1">
                        <Book className="h-3.5 w-3.5 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-600">ID: {book.id.substring(0, 8)}</p>
                      </div>
                    </div>
                    <div className="px-4">
                      <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {displayName}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {email}
                      </p>
                    </div>
                    <div className="px-4 text-right">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {book.dueDate.toLocaleDateString()}
                        </p>
                      </div>
                      <p className={`text-xs font-medium ${statusColor}`}>
                        {daysLeft < 0
                          ? `Overdue by ${Math.abs(daysLeft)} days`
                          : daysLeft === 0
                          ? "Due today"
                          : `Due in ${daysLeft} days`}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        Extend
                      </Button>
                      <Button size="sm" variant="secondary">
                        Return
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

export default IssuedBooksPage;
