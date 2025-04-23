
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Book as BookIcon, 
  Clock, 
  BookOpen, 
  ChevronRight,
  Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBorrowedBooks, mockBookHistory, mockNotifications, BorrowedBook } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const UserDashboardPage = () => {
  const [borrowedBooks] = useState<BorrowedBook[]>(mockBorrowedBooks);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const calculateDaysLeft = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft < 0) return "text-red-500";
    if (daysLeft < 3) return "text-orange-500";
    return "text-green-500";
  };

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-600">Welcome back, John! Here's what's happening with your books.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/books">
              <Button className="bg-library-purple hover:bg-library-purple/90">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Books Borrowed</CardTitle>
              <BookIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{borrowedBooks.length}</div>
              <p className="text-xs text-muted-foreground">
                {borrowedBooks.length > 0 ? `${borrowedBooks.length} active books` : 'No active books'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Books Returned</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBookHistory.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockBookHistory.length > 0 ? 'Total books returned' : 'No books returned yet'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Reading Goals</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">66%</div>
              <Progress value={progress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                2 of 3 books read this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <div className="flex items-center">
                {unreadNotifications > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                )}
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {unreadNotifications}
              </div>
              <p className="text-xs text-muted-foreground">
                {unreadNotifications > 0 ? `${unreadNotifications} unread notifications` : 'No new notifications'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* My Books */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Books</CardTitle>
              <Link to="/my-books">
                <Button variant="ghost" size="sm" className="text-library-purple">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {borrowedBooks.length > 0 ? (
              <div className="space-y-4">
                {borrowedBooks.map((book) => {
                  const daysLeft = calculateDaysLeft(book.dueDate);
                  const statusColor = getStatusColor(daysLeft);
                  
                  return (
                    <div key={book.id} className="flex items-center space-x-4 p-3 border border-gray-100 rounded-lg">
                      <div className="rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="h-16 w-12 object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{book.title}</h3>
                        <p className="text-sm text-gray-500">by {book.author}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <p className={`text-sm ${statusColor}`}>
                            {daysLeft < 0 
                              ? `Overdue by ${Math.abs(daysLeft)} days` 
                              : daysLeft === 0 
                                ? 'Due today' 
                                : `${daysLeft} days left`
                            }
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Due {formatDistanceToNow(book.dueDate, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookIcon className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium">No books borrowed</h3>
                <p className="mt-1 text-gray-500 text-sm">
                  You haven't borrowed any books yet
                </p>
                <Link to="/books">
                  <Button variant="outline" className="mt-4">
                    Browse Books
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Link to="/history">
                <Button variant="ghost" size="sm" className="text-library-purple">
                  View History <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {mockBookHistory.length > 0 ? (
              <div className="space-y-4">
                {mockBookHistory.slice(0, 3).map((book) => (
                  <div key={book.id} className="flex items-center space-x-4 p-3 border border-gray-100 rounded-lg">
                    <div className="rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        className="h-16 w-12 object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{book.title}</h3>
                      <p className="text-sm text-gray-500">by {book.author}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Returned {book.returnDate ? formatDistanceToNow(book.returnDate, { addSuffix: true }) : 'N/A'}
                        </p>
                      </div>
                      <p className={`text-xs ${book.isOverdue ? 'text-red-500' : 'text-green-500'}`}>
                        {book.isOverdue ? 'Returned late' : 'On time'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium">No history yet</h3>
                <p className="mt-1 text-gray-500 text-sm">
                  Your book history will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;
