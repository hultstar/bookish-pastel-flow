
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/layout/NavigationBar";
import { Book, Search, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: Book,
      title: "Vast Collection",
      description: "Access thousands of books across various genres and categories",
    },
    {
      icon: Search,
      title: "Easy Search",
      description: "Find your next read quickly with our powerful search system",
    },
    {
      icon: Clock,
      title: "Simple Borrowing",
      description: "Borrow books with just a few clicks and manage due dates",
    },
    {
      icon: User,
      title: "Personal Account",
      description: "Track your reading history and get personalized recommendations",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Your Digital
                  <span className="text-library-purple"> Library </span>
                  Management System
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-lg">
                  Simplifying the way you discover, borrow, and return books.
                  Designed for readers and librarians alike.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-library-purple hover:bg-library-purple/90">
                    Get Started
                  </Button>
                </Link>
                <Link to="/books">
                  <Button size="lg" variant="outline">
                    Browse Books
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white p-6 md:p-8 rounded-2xl shadow-xl transform rotate-3 md:scale-110">
                <div className="aspect-[4/3] bg-library-peach rounded-lg flex items-center justify-center">
                  <Book size={80} className="text-library-purple opacity-80" />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium">Library Management Made Simple</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Modern tools for modern libraries
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-library-lavender rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-library-peach rounded-full -z-10 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose LibraryHub?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our library management system is designed to make your reading experience seamless
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-library-lavender rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-library-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-library-lavender rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-library-purple/20 rounded-full"></div>
            <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-library-purple/10 rounded-full"></div>
            
            <div className="relative z-10 md:max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Ready to get started?
              </h2>
              <p className="text-gray-700 mb-6">
                Join thousands of readers and librarians who are already using LibraryHub to manage their reading experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button>Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline">Create Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Book className="h-5 w-5 text-library-purple" />
              <span className="font-semibold text-gray-800">LibraryHub</span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} LibraryHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
