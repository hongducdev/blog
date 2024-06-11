# 🌟 Hongdudev's Personal Blog 🌟

[![wakatime](https://wakatime.com/badge/github/hongducdev/blog.svg)](https://wakatime.com/badge/github/hongducdev/blog)

A personal blog by hongdudev. I write about web development, programming, and tech.

## 🚀 Features

- **Framework**: Built with Next.js for server-side rendering and static site generation.
- **Styling**: Styled using Tailwind CSS for a highly customizable and responsive design.
- **UI Components**: Utilizes Shadcn UI for accessible and beautiful UI components.
- **CMS**: Integrated with Notion as the content management system for easy blog post creation and management.

## 🛠️ Getting Started

### 📋 Prerequisites

- Node.js (v14.x or later)
- pnpm

### 📥 Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/hongdudev/blog.git
    cd blog
    ```

2. Install the dependencies:

    ```sh
    pnpm install
    ```

3. Create a `.env` file in the root directory and add your Notion access token, blog database ID, and base URL:

    ```env
    NOTION_ACCESS_TOKEN=your-notion-access-token
    NOTION_BLOG_DATABASE_ID=your-notion-database-id
    BASE_URL=your-base-url
    ```

### 🔑 Getting Notion Access Token and Database ID

To obtain your Notion access token and database ID:

1. Go to [Notion Developers](https://developers.notion.com/).
2. Create an integration to get your Notion access token.
3. Share your Notion database with the integration to get the database ID.

### ▶️ Running the Development Server

To start the development server, run:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🏗️ Building for Production

To create an optimized production build, run:

```sh
pnpm build
```

This will generate a `/.next` directory containing the optimized build output.

### 🌐 Starting the Production Server

To start the production server, run:

```sh
pnpm start
```

### 🌍 Environment Variables

- `NOTION_ACCESS_TOKEN`: The token for accessing the Notion API. You can obtain this by creating an integration on Notion.
- `NOTION_BLOG_DATABASE_ID`: The ID of the Notion database where your blog posts are stored.
- `BASE_URL`: The base URL of your blog (e.g., `https://yourdomain.com`).

## 🚢 Deployment

You can deploy your Next.js application to a variety of hosting providers, such as Vercel, Netlify, or any other platform that supports Node.js applications.

### 🚀 Deploying to Vercel

To deploy your app to Vercel, follow these steps:

1. Install the Vercel CLI:

    ```sh
    npm install -g vercel
    ```

2. Deploy your application:

    ```sh
    vercel
    ```

Follow the prompts to link your project with Vercel, configure your settings, and deploy your app.

## 🤝 Contributing

Contributions are welcome! If you have any ideas or suggestions, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 📧 Contact

If you have any questions or feedback, feel free to reach out to me at [hey@hongducdev.com](mailto:hey@hongducdev.com).

---

Happy coding!

Hongdudev 🌟