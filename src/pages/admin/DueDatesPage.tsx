
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBorrowedBooks, mockUsers } from "@/lib/mockData";
import { Calendar, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const DueDatesPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Sort books by due date
  const sortedBooks = [...mockBorrowedBooks].sort((a, b) => 
    a.dueDate.getTime() - b.dueDate.getTime()
  );

  const today = new Date();
  
  // Filter books
  const overdueBooks = sortedBooks.filter(
    book => book.dueDate < today
  );
  
  const dueTodayBooks = sortedBooks.filter(
    book => {
      const dueDate = new Date(book.dueDate);
      return dueDate.getDate() === today.getDate() &&
             dueDate.getMonth() === today.getMonth() &&
             dueDate.getFullYear() === today.getFullYear();
    }
  );
  
  const upcomingBooks = sortedBooks.filter(
    book => book.dueDate > today &&
      !(book.dueDate.getDate() === today.getDate() &&
        book.dueDate.getMonth() === today.getMonth() &&
        book.dueDate.getFullYear() === today.getFullYear())
  );

  const renderBookItem = (book) => {
    const user = mockUsers.find(u => u.id === book.userId);
    const daysLeft = Math.ceil(
      (book.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    let statusColor = "text-green-500";
    let statusText = `Due in ${daysLeft} days`;
    
    if (daysLeft < 0) {
      statusColor = "text-red-500";
      statusText = `Overdue by ${Math.abs(daysLeft)} days`;
    } else if (daysLeft === 0) {
      statusColor = "text-orange-500";
      statusText = "Due today";
    }

    return (
      <div key={book.id} className="flex items-center p-4 border border-gray-100 rounded-lg">
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
            <Calendar className="h-3.5 w-3.5 text-gray-400 mr-1" />
            <p className="text-sm text-gray-600">
              Due: {book.dueDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="px-4">
          <p className="text-sm font-medium">{user?.name || "User"}</p>
          <p className="text-xs text-gray-500">
            {user?.email || "user@example.com"}
          </p>
          <p className={`text-xs font-medium mt-1 ${statusColor}`}>
            {statusText}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Send className="h-3.5 w-3.5 mr-2" />
            Remind
          </Button>
          <Button size="sm" variant="secondary">
            Extend
          </Button>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Due Dates</h2>
          <p className="text-gray-600">Track and manage book return dates</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Return Schedule</CardTitle>
              <Button variant="outline" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Reminders
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overdue" className="flex items-center">
                  <span className="relative">
                    Overdue
                    {overdueBooks.length > 0 && (
                      <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {overdueBooks.length}
                      </span>
                    )}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="today">Due Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overdue" className="space-y-4">
                {overdueBooks.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center text-red-500 mb-4">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <p>These books need immediate attention</p>
                    </div>
                    {overdueBooks.map(renderBookItem)}
                  </div>
                ) : (
                  <p className="text-center py-6 text-gray-500">No overdue books. Great job!</p>
                )}
              </TabsContent>
              
              <TabsContent value="today" className="space-y-4">
                {dueTodayBooks.length > 0 ? (
                  dueTodayBooks.map(renderBookItem)
                ) : (
                  <p className="text-center py-6 text-gray-500">No books due today</p>
                )}
              </TabsContent>
              
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingBooks.length > 0 ? (
                  upcomingBooks.map(renderBookItem)
                ) : (
                  <p className="text-center py-6 text-gray-500">No upcoming due dates</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DueDatesPage;
