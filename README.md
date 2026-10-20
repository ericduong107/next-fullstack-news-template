@ -1,75 +1,77 @@
# Next Template

[![Use this template](https://img.shields.io/badge/Use%20this-template-2ea44f?style=for-the-badge)](https://github.com/ericduong107/next_ts-template-web/generate)

Boilerplate Next.js (App Router + TypeScript + Tailwind CSS) sẵn sàng dùng ngay, không cần setup lại từ đầu mỗi khi bắt đầu dự án mới.

> Có admin, trang client dạng tin tức không có sản phẩm

## Đã có sẵn

- **Next.js 14 (App Router)** + TypeScript strict mode
- **Tailwind CSS** với biến theme (light/dark) sẵn trong `globals.css`
- **ESLint + Prettier** (kèm plugin sắp xếp class Tailwind)
- **Cấu trúc thư mục rõ ràng**: `components`, `lib`, `hooks`, `types`, `constants`
- **Path alias** `@/...` trỏ vào `src/`
- Component mẫu: `Button`, `Header`, `Footer`
- Hook mẫu: `useLocalStorage`, `useDebounce`
- API route mẫu (`/api/hello`) với validate bằng `zod`
- Route group mẫu `(routes)/example`
- Trang `not-found`
- File `.env.example` liệt kê sẵn các biến môi trường thường dùng

## Bắt đầu từ template này

1. Bấm nút **Use this template** ở trên (hoặc nút xanh trên GitHub) → đặt tên repo mới.
2. Clone repo vừa tạo về máy:
   \`\`\`bash
   git clone https://github.com/<user>/<ten-repo-moi>.git
   cd <ten-repo-moi>
   \`\`\`
3. Cài dependencies: \`npm install\`
4. Đổi tên project trong \`package.json\` (trường \`"name"\`) và tiêu đề trong README nếu workflow tự động ở bước 6 chưa chạy.
5. Copy \`.env.example\` → \`.env.local\` và điền giá trị thật.
6. Chạy \`npm run dev\` và bắt đầu code.

## Cấu trúc thư mục

```
src/
  app/                  # Routes (App Router)
    (routes)/example/   # Ví dụ route group
    api/hello/           # Ví dụ API route
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
  components/
    ui/                 # Component dùng chung, không gắn business logic (Button, Input...)
    layout/             # Header, Footer, Sidebar...
  lib/                  # Hàm tiện ích, wrapper API (utils.ts, fetcher.ts)
  hooks/                # Custom React hooks
  types/                # Định nghĩa TypeScript dùng chung
  constants/            # Hằng số, cấu hình tĩnh
public/                 # Ảnh, favicon, file tĩnh
```

## Gợi ý mở rộng khi bắt đầu dự án thật

Những phần này tuỳ dự án nên chưa cài sẵn, nhưng đây là gợi ý cần thêm gì tiếp theo:

- **Auth**: NextAuth.js hoặc Clerk/Auth0 — biến `NEXTAUTH_*` đã có sẵn trong `.env.example`.
- **Database/ORM**: Prisma + Postgres (hoặc Drizzle) — biến `DATABASE_URL` đã có sẵn.
- **State management**: Zustand hoặc React Query nếu app có nhiều state phức tạp / gọi API nhiều nơi.
- **Testing**: Vitest + Testing Library, hoặc Playwright cho e2e.
- **shadcn/ui**: nếu muốn bộ component UI đầy đủ hơn (`Button` mẫu ở đây đã theo style tương thích shadcn).
- **CI**: GitHub Actions chạy lint + build trên mỗi PR.

## Script có sẵn

| Lệnh              | Mô tả                          |
| ----------------- | ------------------------------- |
| `npm run dev`     | Chạy dev server                 |
| `npm run build`   | Build production                |
| `npm run start`   | Chạy production build           |
| `npm run lint`    | Kiểm tra lỗi ESLint             |
| `npm run format`  | Format code bằng Prettier       |
