import { Search, Settings, User } from 'lucide-react';

/**
 * ヘッダーコンポーネント
 * @returns JSX.Element
 */
const CommonHeader = () => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Notionデータベース</h1>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-200">
                        <Search className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                        <Settings className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                        <User className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default CommonHeader;
