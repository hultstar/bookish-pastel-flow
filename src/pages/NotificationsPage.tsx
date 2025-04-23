
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockNotifications, Notification as NotificationType } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Bell, AlertTriangle, Clock, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>(mockNotifications);
  const userType = "user";

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "due_soon":
        return <Clock className="h-5 w-5 text-orange-500" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "available":
        return <BookOpen className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-library-purple" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "due_soon":
        return "border-l-orange-500";
      case "overdue":
        return "border-l-red-500";
      case "available":
        return "border-l-green-500";
      default:
        return "border-l-library-purple";
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
            <p className="text-gray-600">Stay updated with your library activities</p>
          </div>
          <Button 
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={!notifications.some(n => !n.read)}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex p-4 border-l-4 bg-white rounded-lg shadow-sm ${
                      notification.read ? "opacity-60" : ""
                    } ${getNotificationColor(notification.type)}`}
                  >
                    <div className="mr-4 flex-shrink-0 self-start">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-800">
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                              New
                            </span>
                          )}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(notification.date, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-library-purple"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium">No notifications</h3>
                <p className="mt-1 text-gray-500">
                  You're all caught up! No new notifications.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
