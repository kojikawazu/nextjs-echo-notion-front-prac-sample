import { Suspense } from 'react';
// types
import { NotionType, FetchNotionListResponse } from '@/app/types/notion';
// components
import Loading from '@/app/components/common/Loading';
import NotionList from '@/app/components/notion/list/NotionList';

/**
 * Notionリストコンポーネント(サーバーサイド)
 * @returns JSX.Element
 */
const NotionListSvr = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let notionList: NotionType[] = [];

    try {
        const response = await fetch(`${apiUrl}/notion`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
            },
            next: {
                revalidate: 0,
            },
        });

        const data = await response.json();
        notionList = data.map((item: FetchNotionListResponse) => ({
            id: item.id,
            title: item.title,
            kind: item.kind,
            contents: item.contents,
            createdAt: item.created_at,
        }));
    } catch (error) {
        console.error(error);
    }

    return (
        <Suspense fallback={<Loading />}>
            <NotionList notionList={notionList} />
        </Suspense>
    );
};

export default NotionListSvr;
