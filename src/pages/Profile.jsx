"use client"

import { useEffect, useState } from "react"
import { Clock, User, Sparkles, Bell } from "lucide-react"

export default function Profile() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Badge */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Something exciting is brewing
          </span>
        </div>

        {/* Main Content */}
        <div
          className={`text-center space-y-6 transition-all duration-700 delay-150 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
              Profile Page
              <span className="block text-purple-600 mt-2">Coming Soon</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We're crafting a beautiful profile experience just for you. Stay tuned for something special.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div
          className={`grid md:grid-cols-3 gap-4 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Card 1 */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Personalized</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your profile, your way. Customize every detail to match your style.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Beautiful</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                A stunning interface designed with attention to every pixel.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Fast</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Lightning-fast performance that keeps up with you.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a target="_black"  href="https://wa.me/9389897294?text=When the Profile page Open" className="flex cursor-pointer items-center justify-center gap-2 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition">
            <Bell className="w-4 h-4" />
            Notify Me
          </a>
          {/* <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-100 transition">
            Learn More
          </button> */}
        </div>

        {/* Timeline */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-sm text-gray-500">
            Expected launch: <span className="text-purple-600 font-medium">Dec 2025</span>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-100 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-100 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
