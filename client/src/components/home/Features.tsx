const features = [
  {
    title: "AI Resume Review",
    description: "Improve your resume with ATS analysis."
  },
  {
    title: "Job Tracker",
    description: "Manage every application in one place."
  },
  {
    title: "Interview Prep",
    description: "Practice AI-generated interview questions."
  },
  {
    title: "Career Insights",
    description: "Get personalized career recommendations."
  }
];

function Features() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
          >
            <h3 className="mb-4 text-xl font-semibold">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;