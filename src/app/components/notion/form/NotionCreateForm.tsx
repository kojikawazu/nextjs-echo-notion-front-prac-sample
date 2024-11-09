'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

// hooks
import { useModal } from '@/app/hooks/useModal';
// schema
import { FormNotionCreateInputs, formNotionCreateSchema } from '@/app/schema/notion-schema';
// utils
import { createNotion } from '@/app/utils/notion/fetch-notion';
// components
import CommonHeader from '@/app/components/layout/CommonHeader';
import CommonFooter from '@/app/components/layout/CommonFooter';

/**
 * Notion作成フォームコンポーネント
 * @returns JSX.Element
 */
const NotionCreateForm = () => {
    // ルーター
    const router = useRouter();
    // 渡すフォームデータ
    const [formData, setFormData] = useState<FormNotionCreateInputs | null>(null);
    // フォーム
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormNotionCreateInputs>({
        resolver: zodResolver(formNotionCreateSchema),
    });
    // モーダル
    const { isModalOpen, openModal, closeModal } = useModal();

    // フォーム送信処理
    const onSubmit = (data: FormNotionCreateInputs) => {
        openModal();
        setFormData(data);
    };

    // モーダルでの確定処理
    const handleConfirm = async () => {
        if (!formData) return;

        // モーダルを閉じる
        closeModal();
        try {
            // ローディングトースト
            const loadingToast = toast.loading('保存中...');

            // Notion作成
            await createNotion(formData);

            // 成功トースト
            toast.success('保存しました！', {
                id: loadingToast,
            });

            // リダイレクト
            router.push('/notion');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <CommonHeader />

            <main className="flex-grow">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <a
                        href="#"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                            e.preventDefault();
                            router.back();
                        }}
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        戻る
                    </a>
                </div>

                <div className="max-w-3xl mx-auto p-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                    >
                        <div className="p-6 space-y-6">
                            {/* トピック */}
                            <div>
                                <label
                                    htmlFor="topic"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Notionに追加したいトピック
                                    <br />
                                    AIがタイトルと本文、種別を自動で作成します。
                                </label>
                                <textarea
                                    {...register('topic')}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {errors.topic && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.topic.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                保存
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <CommonFooter />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">確認</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="mb-4">本当に追加してもよろしいですか？</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                はい
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                いいえ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotionCreateForm;
