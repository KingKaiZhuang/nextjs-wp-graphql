const baseUrl = process.env.WORDPRESS_URL;

import { Category, Post } from '@/lib/types';

console.log('>> WORDPRESS_URL used by Next.js:', baseUrl);

async function wpFetch(query: string, variables: any = {}) {

    const cacheKey = encodeURIComponent(JSON.stringify(variables));

    const res = await fetch(`${baseUrl}/graphql?after=${cacheKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 3600 },  // ISR for API calls
        body: JSON.stringify({
            query,
            variables
        })
    });

    if (!res.ok) {
        console.error("WordPress GraphQL Error:", await res.text());
        throw new Error("Failed to fetch WP GraphQL");
    }

    const json = await res.json();

    if (json.errors) {
        console.error("GraphQL Errors:", json.errors);
        throw new Error("WP returned GraphQL errors");
    }

    return json.data;
}


/* 取得所有分類 */
export async function getCategories(): Promise<Category[]> {
    const query = `
        query getCategories {
            categories(first: 100) {
                nodes {
                    id
                    name
                    slug
                }
            }
        }
    `;

    const data = await wpFetch(query);
    return data.categories.nodes;
}


/* 取得文章列表（搜尋 / 類別 / 分頁） */
export async function getAllPosts(
    searchTerm: string = '',
    category: string = '',
    params: { before?: string | null; after?: string | null } = {}
): Promise<{
    posts: Post[];
    pageInfo: {
        startCursor: string | null;
        endCursor: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}> {
    const hasSearchTerm = searchTerm.trim() !== '';
    const hasCategory = category.trim() !== '';
    const isPrevious = Boolean(params.before);

    const variableDefinitions = [
        `$perPage: Int!`,
        isPrevious ? `$before: String` : `$after: String`,
        hasSearchTerm ? `$search: String` : null,
        hasCategory ? `$categorySlug: String` : null,
    ].filter(Boolean).join(', ');

    const whereConditions = [
        hasSearchTerm ? `search: $search` : null,
        hasCategory ? `categoryName: $categorySlug` : null,
    ].filter(Boolean);

    const whereClause = whereConditions.length
        ? `where: { ${whereConditions.join(', ')} }`
        : '';

    const query = `
        query GetPosts(${variableDefinitions}) {
          posts(
            ${isPrevious ? "last: $perPage" : "first: $perPage"},
            ${isPrevious ? "before: $before" : "after: $after"},
            ${whereClause}
          ) {
            nodes {
              id
              title
              excerpt
              date
              slug
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
    `;

    const variables: any = {
        perPage: 10,
        ...(isPrevious ? { before: params.before } : { after: params.after }),
    };

    if (hasSearchTerm) variables.search = searchTerm;
    if (hasCategory) variables.categorySlug = category;

    const data = await wpFetch(query, variables);

    return {
        posts: data.posts.nodes,
        pageInfo: data.posts.pageInfo,
        ...(hasSearchTerm && { searchTerm }),
        ...(hasCategory && { category }),
    };
}


/* 取得單篇文章內容（slug） */
export async function getPostsBySlug(slug: string): Promise<Post | null> {
    const query = `
        query GetPostBySlug($slug: ID!) {
            post(id: $slug, idType: SLUG) {
                id
                title
                content
                date
                author {
                    node {
                        name
                    }
                }
                categories {
                    nodes {
                        name
                    }
                }
                tags {
                    nodes {
                        name
                    }
                }
            }
        }
    `;

    const data = await wpFetch(query, { slug });
    return data.post;
}


/* 取得所有文章 slug（用於 static generate） */
export async function getAllPostSlugs(): Promise<{
    slug: string;
    modified: string | null;
    date: string | null;
}[]> {
    const query = `
        query GetAllPostSlugs {
            posts(first: 1000) {
                nodes {
                    slug
                    date
                    modified
                }
            }
        }
    `;

    const data = await wpFetch(query);
    return data.posts.nodes;
}


/* 取得 WordPress Page by DATABASE_ID */
export async function getPageById(id: number): Promise<{
    id: string;
    slug: string;
    title: string;
    content: string;
} | null> {
    const query = `
        query GetPageById($id: ID!) {
            page(id: $id, idType: DATABASE_ID) {
                id
                slug
                title
                content
            }
        }
    `;

    const data = await wpFetch(query, { id });
    return data.page;
}
