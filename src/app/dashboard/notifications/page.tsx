import React from 'react';

// --- Helper: Icon Components ---
// For a real app, you'd import these from a library like 'lucide-react' or 'heroicons'
// But for this static example, we'll define them directly.

const ChatBubbleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537a5.25 5.25 0 01-4.991-4.592l-.004-.002a5.25 5.25 0 014.232-5.23l3.976-.569a5.25 5.25 0 011.963.069zM5.25 9.25A3.75 3.75 0 001.5 13v.16l1.921.274a5.25 5.25 0 014.613 5.345l.015.003a5.25 5.25 0 01-5.234 4.232l-.004-.002a5.25 5.25 0 01-4.592-4.991l-.537-3.722c-.094-1.133.59-2.193 1.624-2.431l3.976-.569a5.25 5.25 0 014.963 1.963z" />
  </svg>
);

const UserAddIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 21z" />
    </svg>
);


// --- TypeScript Type Definition ---
// This defines the "shape" of a single notification object.
type Notification = {
  id: number;
  icon: React.ElementType;
  iconBgColor: string;
  title: React.ReactNode; // React.ReactNode allows us to pass JSX like <strong>
  timestamp: string;
};

// --- Static Data ---
// In a real application, this data would come from an API call.
const staticNotifications: Notification[] = [
  {
    id: 1,
    icon: ChatBubbleIcon,
    iconBgColor: 'bg-blue-100 text-blue-600',
    title: (
      <>
        <strong className="font-semibold">Sarah Johnson</strong> left a comment on your post{' '}
        <span className="font-semibold text-gray-800">"Next.js 14 Features"</span>.
      </>
    ),
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    icon: UserAddIcon,
    iconBgColor: 'bg-green-100 text-green-600',
    title: (
      <>
        <strong className="font-semibold">Alex Smith</strong> has joined your{' '}
        <span className="font-semibold text-gray-800">"Marketing"</span> team.
      </>
    ),
    timestamp: '1 day ago',
  },
  {
    id: 3,
    icon: CreditCardIcon,
    iconBgColor: 'bg-purple-100 text-purple-600',
    title: (
        <>
            Your monthly subscription payment of <strong className="font-semibold">$49.99</strong> was successful.
        </>
    ),
    timestamp: '3 days ago',
  },
];

// --- The Page Component ---
const NotificationsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            <button className="text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            {staticNotifications.length > 0 ? (
              staticNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-4 p-4 sm:p-6 hover:bg-gray-50">
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${notification.iconBgColor}`}
                  >
                    <notification.icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <p className="text-sm text-gray-700">{notification.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{notification.timestamp}</p>
                  </div>

                   {/* Unread Indicator */}
                   <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-500 mt-1"></div>
                </div>
              ))
            ) : (
              // Empty State
              <div className="p-6 text-center text-gray-500">
                <p>You have no new notifications.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotificationsPage;