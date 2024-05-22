import React from 'react';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    createDate: string;
}

const mockBlogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'Post Title 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget finibus velit.',
        createDate: '2024-04-25'
    },
    {
        id: 2,
        title: 'Post Title 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget finibus velit.',
        createDate: '2024-04-24'
    },
    {
        id: 3,
        title: 'Post Title 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget finibus velit.',
        createDate: '2024-04-23'
    }
];

const BlogSection: React.FC = () => {
    const blogPosts: BlogPost[] = mockBlogPosts;

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Latest Blog Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {blogPosts.map((post: BlogPost) => (
                    <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4">{post.content}</p>
                        <p className="text-gray-400">Created on: {post.createDate}</p>
                        <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">Read More</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogSection;
