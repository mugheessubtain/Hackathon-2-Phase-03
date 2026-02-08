"use client";

export default function Features() {
  const features = [
    {
      title: "AI-Powered Assistant",
      description:
        "Manage tasks with natural language. Our intelligent AI understands your commands and helps you stay organized effortlessly.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      gradient: "from-violet-500 to-purple-600",
      badge: "NEW",
    },
    {
      title: "Intelligent Organization",
      description:
        "Effortlessly create, edit, and manage tasks with our intuitive interface. Smart categorization keeps you focused on what matters.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      ),
      gradient: "from-fuchsia-500 to-pink-600",
    },
    {
      title: "Fort Knox Security",
      description:
        "Enterprise-grade authentication with JWT tokens. Your data is encrypted and protected with industry-leading security standards.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      ),
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Complete Privacy",
      description:
        "Your tasks belong to you alone. Advanced data isolation ensures complete privacy and confidentiality.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      gradient: "from-violet-500 to-indigo-600",
    },
    {
      title: "Visual Progress",
      description:
        "Track accomplishments with satisfaction. Beautiful indicators and insights help you visualize your productivity journey.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      ),
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Seamless Everywhere",
      description:
        "Native experience on every device. Desktop, tablet, or mobile — your tasks sync instantly and work flawlessly.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      ),
      gradient: "from-emerald-500 to-teal-600",
    },
  ];

  const aiFeatures = [
    "Create tasks using natural language",
    "Update multiple tasks at once",
    "Get smart task suggestions",
    "Voice-activated commands",
    "Intelligent task prioritization",
    "Automated task organization"
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100 to-violet-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200/50 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">
              POWERFUL FEATURES
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Everything you need to{" "}
            <span className="block mt-2 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              thrive and succeed
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Comprehensive tools designed to elevate your productivity and help you achieve extraordinary results.
          </p>
        </div>

        {/* AI Feature Spotlight */}
        <div className="mb-20 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl p-1 shadow-2xl">
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-violet-100 border border-violet-200 mb-4">
                  <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs font-bold text-violet-700">AI POWERED</span>
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                  Your Intelligent Task Assistant
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Experience the future of task management with our AI assistant. Simply tell it what you need, and watch as it handles the rest.
                </p>
                <div className="space-y-3">
                  {aiFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-2xl blur-2xl opacity-60"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 shadow-xl">
                  <div className="space-y-4">
                    {/* Mock chat messages */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-2xl rounded-br-sm shadow-md text-sm max-w-[80%]">
                        Create a task to review quarterly reports
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm shadow-md text-sm max-w-[80%]">
                        ✅ Done! I've created "Review quarterly reports" for you.
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-2xl rounded-br-sm shadow-md text-sm max-w-[80%]">
                        Mark all my tasks as complete
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm shadow-md text-sm max-w-[80%]">
                        🎉 All done! I've marked 5 tasks as complete.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-transparent transition-all duration-300"
            >
              {/* Badge for new features */}
              {feature.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-bold rounded-full">
                    {feature.badge}
                  </span>
                </div>
              )}

              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" 
                   style={{
                     background: `linear-gradient(135deg, ${feature.gradient.includes('violet') ? '#8b5cf6' : feature.gradient.includes('fuchsia') ? '#d946ef' : feature.gradient.includes('pink') ? '#ec4899' : feature.gradient.includes('cyan') ? '#06b6d4' : '#10b981'}, transparent)`
                   }}>
              </div>

              <div className="relative">
                {/* Icon container */}
                <div className="mb-6">
                  <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6 text-lg">Ready to transform your workflow with AI?</p>
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-violet-500/30 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-200"
          >
            Get Started Free
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}