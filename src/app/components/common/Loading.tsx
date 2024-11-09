import { RotateCw } from 'lucide-react';

/**
 * 読み込み中コンポーネント
 * @returns JSX.Element
 */
const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-2">
            <RotateCw className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-500">読み込み中...</p>
        </div>
    );
};

export default Loading;
