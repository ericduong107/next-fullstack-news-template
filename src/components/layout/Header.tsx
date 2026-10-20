import Link from "next/link";
import { APP_NAME } from "src-2/constants";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          {APP_NAME}
        </Link>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          <Link href="/example" className="hover:text-foreground">
            Ví dụ
          </Link>
        </nav>
      </div>
    </header>
  );
}
