/**
 * Notionデータ型
 */
export type NotionType = {
    id: string;
    title: string;
    kind: string;
    contents: string;
    createdAt: string;
};

/**
 * Notionリストレスポンス
 */
export type FetchNotionListResponse = {
    id: string;
    title: string;
    kind: string;
    contents: string;
    created_at: string;
};
