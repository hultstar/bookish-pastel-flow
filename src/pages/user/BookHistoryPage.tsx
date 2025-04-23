
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBookHistory } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { BookOpen, Clock } from "lucide-react";

const BookHistoryPage = () => {
  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Reading History</h2>
          <p className="text-gray-600">Track your reading journey</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Previously Borrowed Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBookHistory.map((book) => (
                <div key={book.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                  <div className="rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="h-16 w-12 object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-gray-500">by {book.author}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">
                        Borrowed {formatDistanceToNow(book.borrowDate, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Returned {book.returnDate && formatDistanceToNow(book.returnDate, { addSuffix: true })}
                      </p>
                    </div>
                    <p className={`text-xs mt-1 ${book.isOverdue ? 'text-red-500' : 'text-green-500'}`}>
                      {book.isOverdue ? 'Returned late' : 'On time'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BookHistoryPage;
