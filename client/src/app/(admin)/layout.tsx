

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F0F4F4] flex">
      <div className="w-[90%]">{children}</div>
    </div>
  );
}
