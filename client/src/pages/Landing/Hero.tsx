function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="mb-6 text-6xl font-bold">
          Manage Your Job Search with AI
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
          Track applications, analyze resumes, prepare for interviews,
          and receive AI-powered job recommendations.
        </p>

        <button className="rounded-lg bg-blue-600 px-8 py-4 text-lg text-white hover:bg-blue-700">
          Start Free
        </button>
      </div>
    </section>
  );
}

export default Hero;