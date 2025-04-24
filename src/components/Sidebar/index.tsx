import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Students', href: '/admin/students', icon: UserGroupIcon },
  { name: 'Courses', href: '/admin/courses', icon: AcademicCapIcon },
  { name: 'Schedule', href: '/admin/schedule', icon: ClockIcon },
  { name: 'Parent Info', href: '/admin/parent-info', icon: ChatBubbleLeftRightIcon },
  { name: 'Student Info', href: '/admin/student-info', icon: ChatBubbleLeftRightIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-4">
        <h2 className="text-lg font-semibold text-black dark:text-white">School Admin</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === item.href
                ? 'bg-amber-500 text-white'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
} 