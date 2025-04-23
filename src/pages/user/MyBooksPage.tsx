
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBorrowedBooks } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Book, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyBooksPage = () => {
  // For this prototype, we'll assume all borrowed books belong to the current user
  const borrowedBooks = mockBorrowedBooks;
  
  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Books</h2>
          <p className="text-gray-600">Manage your borrowed books</p>
        </div>

        <Tabs defaultValue="current">
          <TabsList className="mb-6">
            <TabsTrigger value="current">Currently Borrowed</TabsTrigger>
            <TabsTrigger value="history">Borrowing History</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle>Books You're Currently Reading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {borrowedBooks.map((book) => {
                    const today = new Date();
                    const dueDate = new Date(book.dueDate);
                    const totalDays = 14; // Assuming standard loan period
                    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    const daysUsed = totalDays - daysLeft;
                    const progress = Math.min(100, Math.max(0, (daysUsed / totalDays) * 100));
                    
                    let progressColor = "bg-green-500";
                    if (progress > 70) progressColor = "bg-orange-500";
                    if (progress > 90) progressColor = "bg-red-500";

                    return (
                      <div key={book.id} className="flex flex-col md:flex-row md:items-start border border-gray-100 rounded-lg p-4">
                        <div className="flex mb-4 md:mb-0">
                          <div className="w-16 h-24 rounded overflow-hidden flex-shrink-0 mr-4">
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{book.title}</h4>
                            <p className="text-sm text-gray-500">by {book.author}</p>
                            <div className="flex items-center mt-2">
                              <Book className="h-4 w-4 text-gray-400 mr-1" />
                              <p className="text-sm text-gray-600">
                                Borrowed {formatDistanceToNow(book.borrowDate, { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">
                                Due {formatDistanceToNow(book.dueDate, { addSuffix: true })}
                              </span>
                            </div>
                            <span className={`text-xs font-medium ${daysLeft < 3 ? "text-red-500" : "text-gray-500"}`}>
                              {daysLeft < 0 ? `Overdue by ${Math.abs(daysLeft)} days` : 
                               daysLeft === 0 ? "Due today" : 
                               `${daysLeft} days left`}
                            </span>
                          </div>
                          <Progress value={progress} className={`h-2 ${progressColor}`} />
                          <div className="flex justify-between mt-4">
                            <Button variant="outline" size="sm">
                              Renew
                            </Button>
                            <Button size="sm">
                              Return Book
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Reading History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 space-y-4">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto" />
                  <div>
                    <p className="text-gray-500">Your reading history will appear here</p>
                    <p className="text-sm text-gray-400">You can see all the books you've borrowed in the past</p>
                  </div>
                  <Button variant="outline">View Detailed History</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 space-y-4">
                  <Book className="h-12 w-12 text-gray-300 mx-auto" />
                  <div>
                    <p className="text-gray-500">Your wishlist is empty</p>
                    <p className="text-sm text-gray-400">Start adding books you want to read later</p>
                  </div>
                  <Button>Browse Books</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MyBooksPage;
