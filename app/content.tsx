import Image from "next/image";

const content = [
  {
    date: "2025-11-01",
    content:
      "Progress on AGI is real but uneven—models are better at narrow tasks but still far from versatile, human-level intelligence. Expert surveys place median timelines around 2030–2040, though gaps remain in reasoning, autonomy and robustness. Key bottlenecks include formulating a clear definition of AGI, creating new architectures beyond scaled LLMs, and avoiding slip-ups on generalisation and alignment.",
  },
  {
    date: "2025-10-31",
    content:
      "Progress on AGI is real but uneven—models are better at narrow tasks but still far from versatile, human-level intelligence. Expert surveys place median timelines around 2030–2040, though gaps remain in reasoning, autonomy and robustness. Key bottlenecks include formulating a clear definition of AGI, creating new architectures beyond scaled LLMs, and avoiding slip-ups on generalisation and alignment.",
  },
  {
    date: "2025-10-30",
    content:
      "Progress on AGI is real but uneven—models are better at narrow tasks but still far from versatile, human-level intelligence. Expert surveys place median timelines around 2030–2040, though gaps remain in reasoning, autonomy and robustness. Key bottlenecks include formulating a clear definition of AGI, creating new architectures beyond scaled LLMs, and avoiding slip-ups on generalisation and alignment.",
  },
];

export function Content() {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />

      {content.map((item) => (
        <div key={item.date} className="relative flex gap-8 pb-8 last:pb-0">
          <div className="relative shrink-0" />

          {/* Content */}
          <div className="flex-1">
            <h2 className="font-bold">{item.date}</h2>
            <p className="text-sm">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
