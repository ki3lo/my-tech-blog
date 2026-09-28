import rss from '@astrojs/rss';
import { CATEGORIES, SITE_DESCRIPTION, SITE_TITLE, withBase } from '../consts';
import { getPosts } from '../utils/posts';

export async function GET(context) {
	const posts = await getPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: new URL(withBase('/'), context.site),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: [CATEGORIES[post.data.category].label, ...post.data.tags],
			link: withBase(`/blog/${post.id}/`),
		})),
	});
}
