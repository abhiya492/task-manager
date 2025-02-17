//src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Calendar, List, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <CheckCircle className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">TaskMaster</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  "bg-blue-600 text-white hover:bg-blue-700"
                )}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Organize Your Work & Life with
            <span className="text-blue-600 block mt-2">TaskMaster</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Transform your productivity with smart task management, team collaboration, 
            and intuitive scheduling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className={cn(
                "inline-flex items-center px-6 py-3 text-base font-medium",
                "bg-blue-600 text-white rounded-lg hover:bg-blue-700 gap-2",
                "transition-transform hover:scale-105"
              )}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage tasks efficiently and collaborate effectively
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<List className="w-8 h-8" />}
              title="Smart Task Management"
              description="Create, organize, and prioritize tasks with drag-and-drop simplicity."
            />
            <FeatureCard 
              icon={<Calendar className="w-8 h-8" />}
              title="Calendar Integration"
              description="Visual timeline for deadlines and milestones with automated reminders."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Team Collaboration"
              description="Assign tasks, share files, and communicate in real-time."
            />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <CheckCircle className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals already achieving more with TaskMaster
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className={cn(
                "inline-flex items-center px-8 py-3 text-lg",
                "bg-white text-blue-600 rounded-lg hover:bg-blue-50",
                "transition-transform hover:scale-105"
              )}
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            {/* Footer content remains similar but with better spacing */}
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;