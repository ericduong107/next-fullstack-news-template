/**
 * ĐỊNH NGHĨA NỘI DUNG CHO ADMIN.
 * Thêm 1 collection mới (vd: "services", "team") -> admin tự có menu, danh sách, form thêm/sửa.
 * Muốn có trang public thì copy app/[locale]/posts sang thư mục mới.
 */
export type FieldType = 'text' | 'textarea' | 'image' | 'date' | 'select' | 'boolean';
export type L = Record<string, string>;

export interface Field {
  key: string;
  label: L;
  type: FieldType;
  localized?: boolean; // lưu theo từng ngôn ngữ {vi:'..', en:'..'}
  required?: boolean;
  options?: { value: string; label: L }[];
  rows?: number;
}

export interface CollectionDef {
  label: L;
  singular: L;
  titleField: string;
  slugFrom?: string; // tự tạo slug từ field này
  fields: Field[];
}

export interface SingletonDef {
  label: L;
  fields: Field[];
}

const statusField: Field = {
  key: 'status',
  label: { vi: 'Trạng thái', en: 'Status' },
  type: 'select',
  options: [
    { value: 'published', label: { vi: 'Đã đăng', en: 'Published' } },
    { value: 'draft', label: { vi: 'Bản nháp', en: 'Draft' } },
  ],
};

export const collections: Record<string, CollectionDef> = {
  posts: {
    label: { vi: 'Tin tức', en: 'News' },
    singular: { vi: 'bài viết', en: 'post' },
    titleField: 'title',
    slugFrom: 'title',
    fields: [
      { key: 'title', label: { vi: 'Tiêu đề', en: 'Title' }, type: 'text', localized: true, required: true },
      { key: 'slug', label: { vi: 'Đường dẫn (slug)', en: 'Slug' }, type: 'text' },
      { key: 'excerpt', label: { vi: 'Mô tả ngắn', en: 'Excerpt' }, type: 'textarea', localized: true, rows: 3 },
      { key: 'content', label: { vi: 'Nội dung', en: 'Content' }, type: 'textarea', localized: true, rows: 12 },
      { key: 'cover', label: { vi: 'Ảnh đại diện', en: 'Cover image' }, type: 'image' },
      { key: 'date', label: { vi: 'Ngày đăng', en: 'Date' }, type: 'date' },
      statusField,
    ],
  },
  projects: {
    label: { vi: 'Dự án', en: 'Projects' },
    singular: { vi: 'dự án', en: 'project' },
    titleField: 'title',
    slugFrom: 'title',
    fields: [
      { key: 'title', label: { vi: 'Tên dự án', en: 'Project name' }, type: 'text', localized: true, required: true },
      { key: 'slug', label: { vi: 'Đường dẫn (slug)', en: 'Slug' }, type: 'text' },
      { key: 'excerpt', label: { vi: 'Mô tả ngắn', en: 'Summary' }, type: 'textarea', localized: true, rows: 3 },
      { key: 'content', label: { vi: 'Chi tiết', en: 'Details' }, type: 'textarea', localized: true, rows: 12 },
      { key: 'location', label: { vi: 'Địa điểm', en: 'Location' }, type: 'text', localized: true },
      { key: 'year', label: { vi: 'Năm', en: 'Year' }, type: 'text' },
      { key: 'cover', label: { vi: 'Ảnh đại diện', en: 'Cover image' }, type: 'image' },
      { key: 'date', label: { vi: 'Ngày đăng', en: 'Date' }, type: 'date' },
      statusField,
    ],
  },
};

export const singletons: Record<string, SingletonDef> = {
  footer: {
    label: { vi: 'Thông tin footer', en: 'Footer' },
    fields: [
      { key: 'description', label: { vi: 'Giới thiệu ngắn', en: 'Short description' }, type: 'textarea', localized: true, rows: 3 },
      { key: 'address', label: { vi: 'Địa chỉ', en: 'Address' }, type: 'text', localized: true },
      { key: 'phone', label: { vi: 'Điện thoại', en: 'Phone' }, type: 'text' },
      { key: 'email', label: { vi: 'Email', en: 'Email' }, type: 'text' },
      { key: 'facebook', label: { vi: 'Link Facebook', en: 'Facebook URL' }, type: 'text' },
      { key: 'youtube', label: { vi: 'Link YouTube', en: 'YouTube URL' }, type: 'text' },
      { key: 'copyright', label: { vi: 'Bản quyền', en: 'Copyright' }, type: 'text', localized: true },
    ],
  },
  contact: {
    label: { vi: 'Trang liên hệ', en: 'Contact page' },
    fields: [
      { key: 'heading', label: { vi: 'Tiêu đề', en: 'Heading' }, type: 'text', localized: true },
      { key: 'intro', label: { vi: 'Giới thiệu', en: 'Intro' }, type: 'textarea', localized: true, rows: 4 },
      { key: 'address', label: { vi: 'Địa chỉ', en: 'Address' }, type: 'text', localized: true },
      { key: 'phone', label: { vi: 'Điện thoại', en: 'Phone' }, type: 'text' },
      { key: 'email', label: { vi: 'Email', en: 'Email' }, type: 'text' },
      { key: 'hours', label: { vi: 'Giờ làm việc', en: 'Opening hours' }, type: 'text', localized: true },
      { key: 'mapEmbed', label: { vi: 'Link nhúng Google Map (src của iframe)', en: 'Google Maps embed URL (iframe src)' }, type: 'text' },
    ],
  },
};
