import { DocCategory, DocItem } from '../types'

export const categories: DocCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn how to get started with our platform',
    icon: 'rocket',
  },
  {
    id: 'guides',
    title: 'Guides',
    description: 'Step-by-step guides for common tasks',
    icon: 'book',
  },
  {
    id: 'api',
    title: 'API Reference',
    description: 'Detailed API documentation',
    icon: 'code',
  },
  {
    id: 'examples',
    title: 'Examples',
    description: 'Example projects and code snippets',
    icon: 'folder',
  },
]

export const docs: DocItem[] = [
  {
    id: '1',
    title: 'Introduction',
    description: 'Learn about the basics of our platform',
    category: 'getting-started',
    slug: 'introduction',
    content: `
# Introduction

Welcome to our documentation! This guide will help you get started with our platform.

## What is DocsCMS?

DocsCMS is a modern documentation site and content management system that makes it easy to create, manage, and publish documentation.

## Features

- **Modern Design**: Clean, responsive design that looks great on all devices
- **Content Management**: Easy-to-use CMS for managing documentation
- **Search**: Powerful search functionality to find what you need
- **Versioning**: Support for multiple versions of documentation
- **Customization**: Customize the look and feel to match your brand

## Getting Started

To get started, check out the [Installation](/docs/installation) guide.
    `,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    published: true,
    tags: ['introduction', 'overview'],
    author: 'Admin',
    version: '1.0.0',
  },
  {
    id: '2',
    title: 'Installation',
    description: 'Learn how to install and set up our platform',
    category: 'getting-started',
    slug: 'installation',
    content: `
# Installation

This guide will walk you through the process of installing and setting up DocsCMS.

## Prerequisites

- Node.js 14 or higher
- npm or yarn

## Installation Steps

1. Clone the repository:

\`\`\`bash
git clone https://github.com/docscms/docscms.git
\`\`\`

2. Install dependencies:

\`\`\`bash
cd docscms
npm install
\`\`\`

3. Start the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to \`http://localhost:3000\`

## Configuration

You can configure DocsCMS by editing the \`config.js\` file in the root directory.

\`\`\`javascript
// config.js
module.exports = {
  title: 'My Documentation',
  description: 'Documentation for my project',
  // ...
}
\`\`\`
    `,
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    published: true,
    tags: ['installation', 'setup'],
    author: 'Admin',
    version: '1.0.0',
  },
  {
    id: '3',
    title: 'Authentication',
    description: 'Learn how to authenticate with our API',
    category: 'api',
    slug: 'authentication',
    content: `
# Authentication

This guide explains how to authenticate with our API.

## API Keys

To use our API, you'll need an API key. You can get one by signing up for an account and navigating to the API section in your dashboard.

## Authentication Methods

We support two authentication methods:

### Bearer Token

Include your API key in the Authorization header:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

### Query Parameter

Include your API key as a query parameter:

\`\`\`
https://api.example.com/endpoint?api_key=YOUR_API_KEY
\`\`\`

## Example Request

\`\`\`javascript
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
\`\`\`
    `,
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z',
    published: true,
    tags: ['api', 'authentication'],
    author: 'Admin',
    version: '1.0.0',
  },
  {
    id: '4',
    title: 'Creating Your First Document',
    description: 'Learn how to create your first document',
    category: 'guides',
    slug: 'creating-your-first-document',
    content: `
# Creating Your First Document

This guide will walk you through the process of creating your first document in DocsCMS.

## Accessing the CMS

1. Log in to your account
2. Navigate to the CMS section
3. Click on "New Document"

## Document Structure

A document consists of the following components:

- **Title**: The title of your document
- **Description**: A brief description of what the document is about
- **Category**: The category the document belongs to
- **Content**: The main content of your document, written in Markdown
- **Tags**: Optional tags to help with organization and search

## Writing Content

DocsCMS uses Markdown for content. Here's a quick reference:

### Headers

\`\`\`markdown
# Header 1
## Header 2
### Header 3
\`\`\`

### Emphasis

\`\`\`markdown
*italic* or _italic_
**bold** or __bold__
\`\`\`

### Lists

\`\`\`markdown
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

1. Item 1
2. Item 2
\`\`\`

### Code

\`\`\`markdown
\`inline code\`

\`\`\`javascript
// Code block
function hello() {
  console.log('Hello, world!');
}
\`\`\`
\`\`\`

## Publishing

Once you're satisfied with your document, click the "Publish" button to make it available to your users.
    `,
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z',
    published: true,
    tags: ['guides', 'documents'],
    author: 'Admin',
    version: '1.0.0',
  },
  {
    id: '5',
    title: 'API Overview',
    description: 'Overview of our API',
    category: 'api',
    slug: 'api-overview',
    content: `
# API Overview

Our API allows you to programmatically access and manipulate your documentation.

## Base URL

All API requests should be made to the following base URL:

\`\`\`
https://api.docscms.com/v1
\`\`\`

## Authentication

All API requests require authentication. See the [Authentication](/docs/authentication) guide for details.

## Rate Limiting

The API is rate limited to 100 requests per minute per API key. If you exceed this limit, you'll receive a 429 Too Many Requests response.

## Endpoints

The API provides the following endpoints:

### Documents

- \`GET /documents\` - List all documents
- \`GET /documents/{id}\` - Get a specific document
- \`POST /documents\` - Create a new document
- \`PUT /documents/{id}\` - Update a document
- \`DELETE /documents/{id}\` - Delete a document

### Categories

- \`GET /categories\` - List all categories
- \`GET /categories/{id}\` - Get a specific category
- \`POST /categories\` - Create a new category
- \`PUT /categories/{id}\` - Update a category
- \`DELETE /categories/{id}\` - Delete a category

### Users

- \`GET /users\` - List all users
- \`GET /users/{id}\` - Get a specific user
- \`POST /users\` - Create a new user
- \`PUT /users/{id}\` - Update a user
- \`DELETE /users/{id}\` - Delete a user
    `,
    createdAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-05T00:00:00.000Z',
    published: true,
    tags: ['api', 'overview'],
    author: 'Admin',
    version: '1.0.0',
  },
]

export function getCategories(): DocCategory[] {
  return categories
}

export function getDocsByCategory(categoryId: string): DocItem[] {
  return docs.filter(doc => doc.category === categoryId && doc.published)
}

export function getDocBySlug(slug: string): DocItem | undefined {
  return docs.find(doc => doc.slug === slug)
}

export function getAllDocs(): DocItem[] {
  return docs
}

export function searchDocs(query: string): DocItem[] {
  const lowerQuery = query.toLowerCase()
  return docs.filter(doc => 
    (doc.title.toLowerCase().includes(lowerQuery) || 
    doc.description.toLowerCase().includes(lowerQuery) ||
    doc.content.toLowerCase().includes(lowerQuery)) &&
    doc.published
  )
}