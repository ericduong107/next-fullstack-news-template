/** Hiển thị văn bản thuần: mỗi đoạn cách nhau một dòng trống. Muốn markdown/HTML thì thay component này. */
export default function RichText({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).filter(Boolean);
  return (
    <div className="space-y-4 leading-relaxed text-slate-700">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">{p}</p>
      ))}
    </div>
  );
}
