module.exports = eleventyConfig => {
	eleventyConfig.addShortcode('formatDate', date => {
		return dateFormatter.format(date);
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
			'mp4'
		],
		dir: {
			includes: '_includes',
			layouts: '_layouts'
		}
	};
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	timeZone: 'UTC',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
