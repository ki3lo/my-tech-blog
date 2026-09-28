import { type CollectionEntry, getCollection } from 'astro:content';
import { slugify } from '../consts';

export type Post = CollectionEntry<'blog'>;

// All posts visible in this build, newest first.
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Groups posts by a slug derived from each post, keeping the first display name seen.
function groupBy(posts: Post[], keys: (post: Post) => string[]) {
	const groups = new Map<string, { name: string; posts: Post[] }>();
	for (const post of posts) {
		for (const name of keys(post)) {
			const slug = slugify(name);
			if (!groups.has(slug)) groups.set(slug, { name, posts: [] });
			groups.get(slug)!.posts.push(post);
		}
	}
	return groups;
}

export const groupByTag = (posts: Post[]) => groupBy(posts, (post) => post.data.tags);

export function groupBySeries(posts: Post[]) {
	const groups = groupBy(posts, (post) => (post.data.series ? [post.data.series] : []));
	for (const group of groups.values()) {
		group.posts.sort(
			(a, b) =>
				(a.data.seriesOrder ?? Infinity) - (b.data.seriesOrder ?? Infinity) ||
				a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
		);
	}
	return groups;
}
