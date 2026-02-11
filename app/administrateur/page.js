import { useState } from 'react';
import { Users, BookOpen, Layers, Calendar, LayoutDashboard } from 'lucide-react';
import StudentManagement from "@/components/administrateur/StudentManagement";
import CourseValidation from "@/components/administrateur/CourseValidation";
import CategoryManagement from "@/components/administrateur/CategoryManagement";
import YearManagement from "@/components/administrateur/YearManagement";

export default function AdminPane() {
    const [activeTab, setActiveTab] = useState('students');

    const renderContent = () => {
        switch (activeTab) {
            case 'students':
                return <StudentManagement />;
            case 'validation':
                return <CourseValidation />;
            case 'categories':
                return <CategoryManagement />;
            case 'years':
                return <YearManagement />;
            default:
                return <StudentManagement />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <main className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-64 shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-24">
                            <div className="mb-6 px-2">
                                <h2 className="text-xs font-bold text-secondary uppercase tracking-wider">Administration</h2>
                            </div>
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('students')}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'students'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-secondary hover:bg-slate-50 hover:text-primary'
                                        }`}
                                >
                                    <Users size={18} />
                                    <span>Apprenants</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('validation')}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'validation'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-secondary hover:bg-slate-50 hover:text-primary'
                                        }`}
                                >
                                    <BookOpen size={18} />
                                    <span>Validations</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('categories')}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'categories'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-secondary hover:bg-slate-50 hover:text-primary'
                                        }`}
                                >
                                    <Layers size={18} />
                                    <span>Catégories</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('years')}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'years'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-secondary hover:bg-slate-50 hover:text-primary'
                                        }`}
                                >
                                    <Calendar size={18} />
                                    <span>Années</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="grow">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
}
