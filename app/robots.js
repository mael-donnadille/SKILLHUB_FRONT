export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/administrateur/', '/compte/'],
        },
        sitemap: 'https://skillhub.com/sitemap.xml',
    }
}
