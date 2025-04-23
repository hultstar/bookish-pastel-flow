
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockBooks, Book } from "@/lib/mockData";
import { BookOpen, Plus, Search, Edit, Trash2 } from "lucide-react";

const ManageBooksPage = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Manage Books</h2>
            <p className="text-gray-600">Add, edit, or remove books from the library</p>
          </div>
          <Button className="bg-library-purple hover:bg-library-purple/90">
            <Plus className="mr-2 h-4 w-4" /> Add New Book
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Library Books</CardTitle>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search books..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBooks.map((book) => (
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
                      <BookOpen className="h-4 w-4 text-gray-400 mr-1" />
                      <span className={`text-sm ${book.available ? 'text-green-500' : 'text-orange-500'}`}>
                        {book.available ? 'Available' : 'Borrowed'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default ManageBooksPage;
