
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationBar from "@/components/layout/NavigationBar";
import { Book } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex justify-center">
              <Book className="h-10 w-10 text-library-purple" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-800">Welcome back to LibraryHub</h1>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="user">
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="user-password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-library-purple hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-library-purple hover:bg-library-purple/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@library.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-library-purple hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-library-purple hover:bg-library-purple/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In as Admin"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-library-purple hover:underline font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
