'use server';

// schema
import { FormNotionCreateInputs } from '@/app/schema/notion-schema';

/**
 * Notion作成
 * @param formData
 * @returns none
 * @throws Error
 */
export const createNotion = async (formData: FormNotionCreateInputs) => {
    console.log('createNotion');
    const apiUrl = process.env.API_URL;

    try {
        const response = await fetch(`${apiUrl}/dify/notion-create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: formData.topic,
            }),
        });

        if (!response.ok) {
            console.error(response);
            throw new Error('Failed to create notion');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
