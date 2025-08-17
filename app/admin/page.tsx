export default function AdminPage() {
  const paperBackground = {
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
    `
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100" style={paperBackground}>
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black orbitron neon-text leading-tight">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-4">
          We are working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
}
