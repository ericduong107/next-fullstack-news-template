import Container from './Container';
import { cn } from '@/lib/utils';

export default function Section({
  title, action, className, children,
}: { title?: string; action?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn('py-12', className)}>
      <Container>
        {(title || action) && (
          <div className="mb-6 flex items-end justify-between gap-4">
            {title && <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>}
            {action}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
