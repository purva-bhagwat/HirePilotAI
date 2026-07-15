import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-8 py-24 text-center">

        <span className="mb-6 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          AI Powered Career Management Platform
        </span>

        <h1 className="max-w-4xl text-6xl font-bold leading-tight">
          Land Your Dream Job
          <span className="text-blue-600"> Faster with AI</span>
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-gray-600">
          Track applications, analyze resumes,
          prepare for interviews and receive AI-powered
          career guidance from one dashboard.
        </p>

        <div className="mt-10 flex gap-4">
          <Link to="/register">
             <button className="rounded-xl bg-blue-600 px-8 py-4 text-white hover:bg-blue-700">
                Start Free
            </button>
          </Link>
          
          <Link to="/demo">
            <button className="rounded-xl border border-gray-300 bg-white px-8 py-4 hover:bg-gray-100">
              Watch Demo
            </button>
          </Link>   
        </div>

      </div>
    </section>
  );
}

export default Hero;