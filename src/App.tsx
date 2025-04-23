
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManageBooksPage from "./pages/admin/ManageBooksPage";
import IssuedBooksPage from "./pages/admin/IssuedBooksPage";
import DueDatesPage from "./pages/admin/DueDatesPage";
import UsersPage from "./pages/admin/UsersPage";
import SettingsPage from "./pages/admin/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import BookHistoryPage from "./pages/user/BookHistoryPage";
import MyBooksPage from "./pages/user/MyBooksPage";
import ProfilePage from "./pages/user/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          
          {/* User Routes */}
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/my-books" element={<MyBooksPage />} />
          <Route path="/history" element={<BookHistoryPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/books" element={<ManageBooksPage />} />
          <Route path="/admin/issued" element={<IssuedBooksPage />} />
          <Route path="/admin/due-dates" element={<DueDatesPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/notifications" element={<NotificationsPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
