export interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function processContent(html: string): { processedContent: string; tocItems: TOCItem[] } {
    const tocItems: TOCItem[] = [];
    let headingCount = 0;

    // Regex to match <h2> and <h3> tags
    // Captures: 1=level (2 or 3), 2=attributes (optional), 3=content
    const regex = /<h([23])([^>]*)>(.*?)<\/h\1>/gi;

    const processedContent = html.replace(regex, (match, level, attrs, content) => {
        const id = `heading-${headingCount++}`;
        const numericLevel = parseInt(level, 10);

        // Strip HTML tags from the heading content for the TOC text
        const text = content.replace(/<[^>]*>/g, '').trim();

        tocItems.push({
            id,
            text,
            level: numericLevel,
        });

        // Reconstruct the tag with the new ID
        // We preserve existing attributes but ensure our ID is added
        // If an ID already exists, we could preserve it, but for simplicity and consistency
        // we are overwriting/appending our own ID.
        // A simple way is to just inject id="..." before the closing > of the opening tag.

        // However, a cleaner way is to reconstruct the tag.
        // Let's check if there are existing attributes.

        return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
    });

    return { processedContent, tocItems };
}
