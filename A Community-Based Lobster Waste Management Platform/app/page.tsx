import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Hero Title */}
        <h1 className="text-5xl font-bold text-gray-900">
          Turn seafood waste into sustainable biomaterials
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ShellCycle connects seafood restaurants&apos; shell waste with
          research labs that need crustacean shells for chitosan and
          biomaterials.
        </p>

        {/* Role Selection Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/restaurant"
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            I am a Restaurant (Supplier)
          </Link>
          <Link
            href="/lab"
            className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            I am a Lab (Buyer)
          </Link>
        </div>

      </div>
    </main>
  );
}
