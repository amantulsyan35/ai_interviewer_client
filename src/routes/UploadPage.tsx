import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Upload,
  FileText,
  Users,
  Zap,
  Star,
  ArrowRight,
  Brain,
  Target,
  Clock,
} from "lucide-react";
import { useUpload } from "../hooks/useUpload";
import UploadCard from "../components/upload-card";
import { DocUploader, type UploadedDoc } from "../components/DocUploader";

export default function LandingPage() {
  const [resumeFiles, setResumeFiles] = useState<UploadedDoc[]>([]);
  const [jobDescFiles, setJobDescFiles] = useState<UploadedDoc[]>([]);
  const { mutate } = useUpload();

  const handleNext = () => {
    const resumeUrl = resumeFiles[0]?.url;
    const jobDescUrl = jobDescFiles[0]?.url;
    if (!resumeUrl || !jobDescUrl) return;
    mutate({ resumeUrl, jobDescUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">
              InterviewAI
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How it Works
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            AI-Powered Interview Practice
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master Your Next
            <span className="text-emerald-600"> Job Interview</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Get personalized interview questions based on your resume and target
            job description. Practice with our AI interviewer and receive
            detailed feedback to land your dream job.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="text-gray-600">4.9/5 rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <span className="text-gray-600">
                50,000+ interviews conducted
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Interview Practice
            </h2>
            <p className="text-gray-600 text-lg">
              Upload your documents to get personalized interview questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Job Description Upload */}
            <Card className="border-2 border-dashed border-gray-200 hover:border-emerald-300 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Job Description</CardTitle>
                <CardDescription>
                  Upload the job posting or description you're applying for
                </CardDescription>
              </CardHeader>
              <CardContent>
                {jobDescFiles.length > 0 ? (
                  <UploadCard
                    fileName={jobDescFiles?.[0]?.fileKey}
                    handleRemove={() => setJobDescFiles([])}
                  />
                ) : (
                  <DocUploader
                    onUploadBegin={(name) => console.log("Uploading:", name)}
                    onClientUploadComplete={setJobDescFiles}
                    onUploadError={(err) => console.error(err)}
                  />
                )}
              </CardContent>
            </Card>

            {/* Resume Upload */}
            <Card className="border-2 border-dashed border-gray-200 hover:border-emerald-300 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Your Resume</CardTitle>
                <CardDescription>
                  Upload your current resume or CV
                </CardDescription>
              </CardHeader>
              <CardContent>
                {resumeFiles.length > 0 ? (
                  <UploadCard
                    fileName={resumeFiles?.[0]?.fileKey}
                    handleRemove={() => setResumeFiles([])}
                  />
                ) : (
                  <DocUploader
                    onUploadBegin={(name) => console.log("Uploading:", name)}
                    onClientUploadComplete={setResumeFiles}
                    onUploadError={(err) => console.error(err)}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
              disabled={!resumeFiles || !jobDescFiles}
              onClick={handleNext}
            >
              Start AI Interview
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {(!resumeFiles || !jobDescFiles) && (
              <p className="text-sm text-gray-500 mt-2">
                Please upload both files to continue
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose InterviewAI?
            </h2>
            <p className="text-xl text-gray-600">
              Advanced AI technology meets personalized interview preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">
                  Personalized Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  AI analyzes your resume and job description to generate
                  relevant, role-specific interview questions
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Real-time Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Get instant feedback on your answers, including suggestions
                  for improvement and confidence scoring
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Practice Anytime</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Available 24/7 for unlimited practice sessions. No scheduling
                  required, practice at your own pace
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to interview success
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Upload Documents",
                description:
                  "Upload your resume and the job description you're targeting",
              },
              {
                step: 2,
                title: "AI Analysis",
                description:
                  "Our AI analyzes both documents to understand the role requirements and your background",
              },
              {
                step: 3,
                title: "Practice Interview",
                description:
                  "Answer personalized questions in a realistic interview simulation",
              },
              {
                step: 4,
                title: "Get Feedback",
                description:
                  "Receive detailed feedback and improvement suggestions for each answer",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold">InterviewAI</span>
              </div>
              <p className="text-gray-400">
                Empowering job seekers with AI-powered interview preparation
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
