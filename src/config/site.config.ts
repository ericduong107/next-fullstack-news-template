/**
 * CẤU HÌNH CHÍNH CỦA TEMPLATE – sửa file này cho từng khách.
 */
export const siteConfig = {
  name: { vi: 'Tên công ty', en: 'Company Name' } as Record<string, string>,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  /**
   * Đa ngôn ngữ phía CLIENT (website khách).
   * enabled: false  -> chỉ chạy 1 ngôn ngữ (defaultLocale), URL không có tiền tố /vi, ẩn nút đổi ngôn ngữ,
   *                    form admin cũng chỉ hiện 1 ngôn ngữ nội dung.
   * enabled: true   -> URL dạng /vi/..., /en/... + nút đổi ngôn ngữ.
   */
  i18n: {
    enabled: true,
    locales: ['vi', 'en'] as string[],
    defaultLocale: 'vi',
  },

  /** Menu chính. key tương ứng "nav.<key>" trong i18n/client.ts */
  nav: [
    { key: 'home', href: '/' },
    { key: 'posts', href: '/posts' },
    { key: 'projects', href: '/projects', feature: 'projects' },
    { key: 'contact', href: '/contact' },
  ] as { key: string; href: string; feature?: string }[],

  /** Bật/tắt từng module để bán theo gói */
  features: { projects: true } as Record<string, boolean>,

  postsPerPage: 9,
};

/** Admin luôn có đa ngôn ngữ riêng (lưu cookie admin_lang) */
export const adminConfig = {
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
};
