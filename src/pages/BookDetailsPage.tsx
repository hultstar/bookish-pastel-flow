
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book, getBookById } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavigationBar from "@/components/layout/NavigationBar";
import { ArrowLeft, Calendar, Book as BookIcon, User } from "lucide-react";

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | undefined>(id ? getBookById(id) : undefined);
  const [isLoading, setIsLoading] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavigationBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Book not found</h1>
            <p className="mt-2 text-gray-600">The book you're looking for doesn't exist</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/books")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleBorrow = () => {
    setIsLoading(true);
    
    // Simulate borrowing process
    setTimeout(() => {
      setIsLoading(false);
      setBook(prev => prev ? { ...prev, available: false } : undefined);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="outline"
            size="sm"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 p-6 md:p-8 bg-library-lavender/30 flex justify-center">
                <img
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  className="max-h-[400px] object-contain rounded-lg shadow-md"
                />
              </div>
              
              <div className="md:col-span-2 p-6 md:p-8">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{book.title}</h1>
                  <Badge variant={book.available ? "default" : "outline"} className={book.available ? "bg-green-500" : "bg-gray-200 text-gray-700"}>
                    {book.available ? "Available" : "Borrowed"}
                  </Badge>
                </div>
                
                <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <BookIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">
                      <span className="font-medium">Category:</span> {book.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">
                      <span className="font-medium">Published:</span> {book.publishedYear}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">
                      <span className="font-medium">Publisher:</span> {book.publisher}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <BookIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">
                      <span className="font-medium">ISBN:</span> {book.isbn}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{book.description}</p>
                </div>
                
                <div className="mt-8">
                  {book.available ? (
                    <Button
                      className="bg-library-purple hover:bg-library-purple/90"
                      onClick={handleBorrow}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Borrow this Book"}
                    </Button>
                  ) : (
                    <Button disabled>Currently Unavailable</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
