# Future Shop

An e-commerce storefront built with Next.js, TypeScript, Tailwind CSS, and Zustand.

## Setup

1. Clone Repo
    git clone https://github.com/habiburrahman26/future-studio-task.git

2. Install dependencies:

	 ```bash
	 pnpm install
	 ```

3. Create a `.env.local` file with the application URL:

	 ```env
	 BASE_URL=http://localhost:3000
	 ```

4. Start the development server:

	 ```bash
	 pnpm run dev
	 ```

5. Open `http://localhost:3000` in your browser.



###  Architecture and Folder Structure

The project uses the Next.js App Router:

```text
app/
	api/products/       Product API routes
	products/[id]/      Product details page
	cart/               Shopping bag page
	checkout/           Checkout page
	page.tsx            Product listing page
components/
	layout/             Header and footer
	ui/                 Reusable UI components
features/product/
	components/         Product filters, cards, reviews, and search
	services.ts         Product data and API services
	types.ts            Product TypeScript types
data/products.json    Local product data
store/cart.ts         Zustand cart store
lib/utils.ts          Shared utility functions
```

The UI is split into reusable components. Product logic lives in the product feature folder, while shared cart state lives in the Zustand store.

### API and Data Fetching

 ** Please ignore the product images because they are AI generated on request time so some times its take too much time to generate the image or some times its fail to generate image

- Product data starts in `data/products.json`.
- API route handlers in `app/api/products` provide product listing, filtering, product details, and related products.
- Functions in `features/product/services.ts` call these API routes.
- The cart is stored in the browser with Zustand persistence.
- All the API are called in the server

### Server and Client Components

- Pages that fetch product data are Server Components by default. This keeps data loading on the server and reduces browser JavaScript.
- Interactive components use `'use client'`, including filters, search, pagination, cart controls, checkout forms, and modal controls.
- Zustand, React Hook Form, and browser events are used only in Client Components.

###  Performance Decisions

- Product data is fetched on the server.
- Zustand prevents unnecessary global state duplication for the cart.
- Lists use stable product IDs as React keys.
- The UI uses small reusable components so updates stay localized.
- `useMemo`, `useCallback`, and `React.memo` are not added by default because the current lists are small and do not show a measured rendering bottleneck. They can be added after profiling identifies a real need.
- Images use Next.js `Image` with responsive sizes.


### Working Demo

 - Live link: [https://future-studio-task.vercel.app](https://future-studio-task.vercel.app/)