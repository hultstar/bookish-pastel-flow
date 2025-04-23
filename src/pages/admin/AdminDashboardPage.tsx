
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBorrowedBooks, mockBooks, mockUsers } from "@/lib/mockData";
import { 
  Book as BookIcon, 
  Users, 
  Clock, 
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalBooks = mockBooks.length;
  const availableBooks = mockBooks.filter(book => book.available).length;
  const borrowedBooks = mockBorrowedBooks.length;
  const totalUsers = mockUsers.filter(user => user.role === "user").length;
  
  // Calculate overdue books
  const today = new Date();
  const overdueBooks = mockBorrowedBooks.filter(
    book => book.dueDate < today
  ).length;

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-gray-600">Manage your library system from here.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/admin/books">
              <Button className="bg-library-purple hover:bg-library-purple/90">
                Manage Books
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBooks}</div>
              <div className="flex items-center pt-1">
                <span className="text-xs text-green-500 font-medium">
                  {availableBooks} available
                </span>
                <span className="mx-1 text-xs text-gray-500">/</span>
                <span className="text-xs text-orange-500 font-medium">
                  {totalBooks - availableBooks} borrowed
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {borrowedBooks > 0 ? `${borrowedBooks} active borrowers` : 'No active borrowers'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Library Usage</CardTitle>
              <BookIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <Progress value={progress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {totalBooks - availableBooks} of {totalBooks} books in circulation
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
              <div className="flex items-center">
                {overdueBooks > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                )}
                <AlertTriangle className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overdueBooks}</div>
              <p className="text-xs text-muted-foreground">
                {overdueBooks > 0 
                  ? `${overdueBooks} books need attention` 
                  : 'No overdue books'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recently Issued Books</CardTitle>
                <Link to="/admin/issued">
                  <Button variant="ghost" size="sm" className="text-library-purple">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBorrowedBooks.map(book => (
                  <div key={book.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
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
                        <Users className="h-3.5 w-3.5 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-600">Borrowed by John Doe</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Due in {
                            Math.max(0, Math.ceil((book.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
                          } days
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Due Dates</CardTitle>
                <Link to="/admin/due-dates">
                  <Button variant="ghost" size="sm" className="text-library-purple">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBorrowedBooks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                  .map(book => {
                    const today = new Date();
                    const daysLeft = Math.ceil((book.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    let statusColor = "text-green-500";
                    if (daysLeft < 0) statusColor = "text-red-500";
                    else if (daysLeft < 3) statusColor = "text-orange-500";
                    
                    return (
                      <div key={book.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
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
                            <Users className="h-3.5 w-3.5 text-gray-400 mr-1" />
                            <p className="text-sm text-gray-600">Borrowed by John Doe</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${statusColor}`}>
                            {daysLeft < 0 
                              ? `Overdue by ${Math.abs(daysLeft)} days` 
                              : daysLeft === 0 
                                ? 'Due today' 
                                : `Due in ${daysLeft} days`
                            }
                          </div>
                          <p className="text-xs text-gray-500">
                            {book.dueDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
