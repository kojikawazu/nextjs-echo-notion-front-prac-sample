import { useState } from 'react';

/**
 * モーダルフック
 * @returns カスタムhooks
 */
export const useModal = () => {
    // モーダルの開閉状態
    const [isModalOpen, setIsModalOpen] = useState(false);

    // モーダルを開く
    const openModal = () => {
        setIsModalOpen(true);
    };

    // モーダルを閉じる
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return { isModalOpen, openModal, closeModal };
};
