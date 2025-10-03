"use client"
import { Upload, FileText, CheckCircle2 } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Upload your resume in PDF or DOC format",
      color: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: FileText,
      title: "Paste Job Description",
      description: "Add the job description you're applying for",
      color: "from-indigo-500 to-blue-500",
      delay: 0.1,
    },
    {
      icon: CheckCircle2,
      title: "Get Score + Suggestions",
      description: "Receive match score and improvement tips",
      color: "from-emerald-500 to-teal-500",
      delay: 0.2,
    },
  ]

  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-[600] text-balance mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Get your resume analyzed in three simple steps and land your dream job
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-2 gap-8 relative">
        {/* Connection lines for desktop */}
        <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 opacity-20" />

        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={index}
              className="cursor-pointer relative p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-zinc-200 rounded-2xl group bg-white"
              style={{ animationDelay: `${step.delay}s` }}
            >
              {/* Step number badge */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                {index + 1}
              </div>

              {/* Icon with gradient background */}
              <div className="mb-6 relative  ">
                <div
                  className={` w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <Icon className="w-10 h-10 text-foreground" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
              <p className="text-muted-foreground text-center text-pretty leading-relaxed">{step.description}</p>

              {/* Decorative gradient line at bottom */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg`}
              />
            </div>
          )
        })}
      </div>

      {/* Call to action */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">Millions of professionals trust Vicky💕 to optimize their resumes and land dream jobs.</p>
      </div>
    </section>
  )
}

export default HowItWorks
