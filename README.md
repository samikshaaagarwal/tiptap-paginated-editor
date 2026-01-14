# Introduction

This project is a Tiptap-based rich text editor with real-time pagination, built to accurately represent how legal documents will appear when printed. The editor visually divides content into US Letter–sized pages with fixed margins, ensuring that formatting seen on screen matches printed output. This is especially important for submission-sensitive documents such as those sent to USCIS, where layout accuracy matters.

## Approach to calculating Page Breaks

Pagination is calculated using actual DOM measurements, not estimated line counts.

Each paragraph or block of content is treated as a unit. These blocks are rendered inside a hidden offscreen container that matches the page’s width and typography. The editor measures each block’s offsetHeight and accumulates height until the usable page height is exceeded. When that happens, the remaining blocks flow onto the next page.

Pagination is implemented as derived data from the document blocks rather than stored state, which avoids cascading renders and keeps page layout deterministic. This approach ensures accurate pagination across mixed content types, varying line heights, and different formatting styles.

## Trade-Offs and Limitations

1. Very long single paragraphs are not yet split across pages at the text-node level
2. Tables are not currently supported
3. Pagination recalculates on content changes, which could be optimized for very large documents
4. Cursor position can shift slightly during page reflow in edge cases

## Improvements with more time

With additional time, I would:
1. Implement true mid-paragraph splitting for long text blocks
2. Add editable headers and footers
3. Support tables with proper page break handling
4. Add print/export to PDF functionality
5. Improve performance with measurement caching
6. Preserve cursor position more precisely during reflow
