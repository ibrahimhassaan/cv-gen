import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { FileText, Upload, Sparkles, Download, Share2, Wand2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar Placeholder */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            CV
          </div>
          <span className="text-xl font-display font-medium">CV Gen</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">Log In</Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-none text-sm font-medium text-primary mb-8 animate-[fade-in_1s_ease-out]">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Resume Builder</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight animate-[slide-up_1s_ease-out]">
          Craft Your Perfect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
            Resume in Seconds
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-[slide-up_1.2s_ease-out]">
          Create professional, ATS-friendly resumes with our premium templates.
          Use AI to extract data from your existing CV or build one from scratch.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-[slide-up_1.4s_ease-out]">
          <Link href="/create/manual">
            <Button size="lg" variant="gradient" className="w-full sm:w-auto">
              <Sparkles className="mr-2 w-4 h-4" />
              Create New CV
            </Button>
          </Link>
          <Link href="/create/upload">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto glass hover:bg-white/10">
              <Upload className="mr-2 w-4 h-4" />
              Upload Existing
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Wand2 className="w-6 h-6" />
              </div>
              <CardTitle>AI Parsing</CardTitle>
              <CardDescription>
                Upload your old PDF and let our AI extract your details instantly.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <CardTitle>Premium Templates</CardTitle>
              <CardDescription>
                Choose from professionally designed layouts that stand out.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                <Share2 className="w-6 h-6" />
              </div>
              <CardTitle>Instant Sharing</CardTitle>
              <CardDescription>
                Download as PDF or share a unique link with recruiters.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 container mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-display font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold mb-6">1</div>
            <h3 className="text-xl font-semibold mb-2">Choose a Template</h3>
            <p className="text-muted-foreground">Select from our curated collection of modern designs.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold mb-6">2</div>
            <h3 className="text-xl font-semibold mb-2">Enter Details</h3>
            <p className="text-muted-foreground">Fill in your information manually or upload to auto-fill.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold mb-6">3</div>
            <h3 className="text-xl font-semibold mb-2">Download & Share</h3>
            <p className="text-muted-foreground">Export as high-quality PDF or share your unique link.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
