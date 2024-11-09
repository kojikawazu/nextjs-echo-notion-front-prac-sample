import { z } from 'zod';

// バリデーションスキーマの定義
export const formNotionCreateSchema = z.object({
    topic: z.string().min(1, 'トピックは必須です').max(1000, '1000文字以内で入力してください'),
});

// 型の推論
export type FormNotionCreateInputs = z.infer<typeof formNotionCreateSchema>;
