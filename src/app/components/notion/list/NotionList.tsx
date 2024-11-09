'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, PlusCircle } from 'lucide-react';

// types
import { NotionType } from '@/app/types/notion';
// components
import CommonHeader from '@/app/components/layout/CommonHeader';
import CommonFooter from '@/app/components/layout/CommonFooter';

interface NotionListProps {
    notionList: NotionType[];
}

/**
 * Notionリストコンポーネント
 * @param notionList
 * @returns JSX.Element
 */
const NotionList = ({ notionList }: NotionListProps) => {
    const [mounted, setMounted] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    // 初期レンダリング時は何も表示しない
    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <CommonHeader />

            <main className="flex-grow">
                <div className="max-w-4xl mx-auto p-4">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Notionデータベース
                            </h2>

                            {/* 新規作成 */}
                            <Link
                                href="/notion/form"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                <PlusCircle className="w-5 h-5 mr-2" />
                                <span>新規作成</span>
                            </Link>
                        </div>

                        {/* データベース一覧 */}
                        <div className="divide-y divide-gray-200">
                            {notionList.map((item) => (
                                <div key={item.id} className="bg-white">
                                    <div
                                        className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
                                        onClick={() => toggleItem(item.id)}
                                        role="button"
                                        aria-expanded={expandedItems.has(item.id)}
                                        aria-controls={`content-${item.id}`}
                                    >
                                        {expandedItems.has(item.id) ? (
                                            <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 mr-2 text-gray-500" />
                                        )}
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <span className="mr-4">{item.kind}</span>
                                                <span>
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {expandedItems.has(item.id) && (
                                        <div
                                            id={`content-${item.id}`}
                                            className="p-4 bg-gray-50 border-t border-gray-200"
                                        >
                                            <p className="text-gray-700">{item.contents}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <CommonFooter />
        </div>
    );
};

export default NotionList;
