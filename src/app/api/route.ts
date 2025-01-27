// import { parseHTML } from 'linkedom';
// import type { NextApiRequest, NextApiResponse } from 'next';

// interface Stat {
//     class: string;
//     text: string;
//     sameLine: boolean;
// }

// interface TierData {
//     tier: string;
//     stats: Stat[];
// }

// interface ParsedItem {
//     name: string;
//     image: string;
//     tiers: TierData[];
// }

// const fetchAndParseUniques = async (url: string): Promise<ParsedItem[]> => {
//     const html = await (await fetch(url)).text();
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
//     const { document } = parseHTML(html);

//     const parseTable = (table: HTMLTableElement): ParsedItem => {
//         const itemName =
//             table.querySelector('th.item-unique')?.textContent?.trim() ?? '';
//         const image = table.querySelector('img')?.getAttribute('src') ?? '';

//         const tiers: TierData[] = [];
//         table.querySelectorAll('td').forEach(td => {
//             const tierElement = td.querySelector('b');
//             if (tierElement) {
//                 const tier = tierElement.textContent?.trim() ?? '';
//                 const stats: Stat[] = [];

//                 // Extract stats and split into lines
//                 td.childNodes.forEach(node => {
//                     if (node.nodeType === 3) {
//                         // Text Node
//                         const text = node.textContent?.trim();
//                         if (text) {
//                             const lines = text
//                                 .split('\n')
//                                 .map(line => line.trim())
//                                 .filter(Boolean);
//                             let sameLine = false;
//                             lines.forEach((line, index) => {
//                                 stats.push({
//                                     class: 'text',
//                                     text: line,
//                                     sameLine: sameLine,
//                                 });
//                                 sameLine = line.endsWith(':');
//                             });
//                         }
//                     } else if (node.nodeType === 1) {
//                         // Element Node
//                         const element = node as HTMLElement;
//                         const className = element.className || 'unknown';
//                         const text = element.textContent?.trim();
//                         console.log(element.textContent);

//                         if (text) {
//                             const lines = text
//                                 .split('\n')
//                                 .map(line => line.trim())
//                                 .filter(Boolean);
//                             let sameLine = false;
//                             lines.forEach((line, index) => {
//                                 stats.push({
//                                     class: className,
//                                     text: line,
//                                     sameLine: sameLine,
//                                 });
//                                 sameLine = line.endsWith(':');
//                             });
//                         }
//                     }
//                 });

//                 tiers.push({ tier, stats });
//             }
//         });

//         return { name: itemName, image, tiers };
//     };

//     const tables = Array.from(
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//         document.querySelectorAll('table.uniques')
//     );
//     //@ts-expect-error "shit's fucked"
//     return tables.slice(0, 1).map(table => parseTable(table));
// };

// export async function GET() {
//     try {
//         const url = 'https://docs.median-xl.com/doc/items/sacreduniques'; // URL to scrape
//         // const url = 'https://docs.median-xl.com/doc/items/tiereduniques'; // URL to scrape
//         const data = await fetchAndParseUniques(url);
//         return new Response(JSON.stringify(data));
//     } catch (error) {
//         console.error('Error scraping data:', error);
//         // res.status(500).json({ error: 'Failed to scrape data' });
//     }
// }
