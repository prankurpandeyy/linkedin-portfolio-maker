import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4">
        <Hero />
      </main>
    </div>
  );
}
