'use client';

import { useEffect, useState, useRef } from "react";

interface PostViewsProps {
    postId: number;
    initialViews?: number;
}

export default function PostViews({ postId, initialViews = 0 }: PostViewsProps) {
    const [views, setViews] = useState(initialViews);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const handleViews = async () => {
            const storageKey = `pvc_visits_${postId}`;
            const hasViewed = localStorage.getItem(storageKey);

            try {
                const baseUrl = process.env.WORDPRESS_URL || 'http://localhost:10003';
                const endpoint = `${baseUrl}/wp-json/custom/v1/post-views/${postId}`;

                // If already viewed, use GET (read only). If new, use POST (increment).
                const method = hasViewed ? 'GET' : 'POST';

                const response = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.views !== undefined) {
                        setViews(data.views);
                    }

                    // Only mark as viewed if we successfully incremented (POST)
                    if (method === 'POST') {
                        localStorage.setItem(storageKey, 'viewed');
                    }
                }
            } catch (error) {
                console.error('Error fetching views:', error);
            }
        };

        handleViews();
    }, [postId]);

    return (
        <span className="text-sm text-slate-500 ml-4 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {views}
        </span>
    );
}
