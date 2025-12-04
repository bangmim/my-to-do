import { NavigationBar } from '@/components/navigation-bar/NavigationBar';

export const metadata = {
    title: '대시보드 - Todo Studio',
    description: '할 일 관리 대시보드',
};

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavigationBar />
            <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
    );
}
