module.exports = eleventyConfig => {
	eleventyConfig.addShortcode('formatDate', date => {
		// Hack to work around explicit dates being UTC and implicit dates being local
		const formatter =
			date.getMinutes() === 0 && date.getSeconds() === 0
				? utcDateFormatter
				: dateFormatter;
		return formatter.format(date);
	});

	eleventyConfig.addShortcode('postIndexLink', function (collections) {
		const page = this.page;
		const isArchived = collections.archived.some(
			post => post.url === page.url
		);

		return isArchived
			? '<a href="/archive">Back to archive</a>'
			: '<a href="/blog">Back to all posts</a>';
	});

	return {
		templateFormats: [
			'html',
			'md',
			'njk',
			'liquid',
			'11ty.js',
			'css',
			'jpg',
			'png',
			'webp',
			'mp4',
		],
		dir: {
			includes: '_includes',
			layouts: '_layouts',
		},
	};
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

const utcDateFormatter = new Intl.DateTimeFormat('en-US', {
	timeZone: 'UTC',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
