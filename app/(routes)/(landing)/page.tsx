import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight, Bot, Sparkles, Workflow, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">Flow.ai</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#docs" className="hover:text-foreground transition-colors">Documentation</Link>
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <LoginLink postLoginRedirectURL="/workflow">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            </LoginLink>
            <RegisterLink postLoginRedirectURL="/workflow">
              <Button className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                Get Started
              </Button>
            </RegisterLink>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 ring-1 ring-primary/20">
              <Sparkles className="h-4 w-4" />
              <span>Introducing AI-Powered Workflows</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-2 py-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Build Smart Workflows at the Speed of Thought
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Design, automate, and deploy powerful AI workflows with our intuitive visual builder. 
              Embed intelligent chat interfaces directly into your applications.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <RegisterLink postLoginRedirectURL="/workflow" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full text-base h-12 px-8 shadow-xl shadow-primary/25 hover:scale-105 transition-all duration-300">
                  Start Building Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RegisterLink>
              <Link href="#demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full rounded-full text-base h-12 px-8 hover:bg-secondary/50">
                  Book a Demo
                </Button>
              </Link>
            </div>

            {/* Dashboard Mockup */}
            <div className="mt-20 w-full max-w-5xl relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30"></div>
              <div className="relative rounded-2xl border border-border/50 bg-background shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                </div>
                <div className="relative aspect-[16/9] w-full bg-muted/10 overflow-hidden">
                  <Image 
                    src="/workflow-light.png" 
                    alt="Workflow Builder Interface" 
                    fill
                    className="object-cover block dark:hidden"
                    priority
                  />
                  <Image 
                    src="/workflow-dark.png" 
                    alt="Workflow Builder Interface" 
                    fill
                    className="object-cover hidden dark:block"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
              <p className="text-muted-foreground text-lg">
                Powerful tools that help you build, embed, and manage your AI interactions with zero friction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Workflow className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Visual Node Builder</h3>
                <p className="text-muted-foreground">
                  Drag and drop logic nodes to create complex automated workflows without writing a single line of code.
                </p>
              </div>

              <div className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                   <Bot className="w-32 h-32" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom AI Agents</h3>
                <p className="text-muted-foreground">
                  Train and deploy intelligent agents tailored to your specific business data and use cases.
                </p>
              </div>

              <div className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1-Click Embeds</h3>
                <p className="text-muted-foreground">
                  Generate embed codes instantly and drop your AI chat widgets into any React, HTML, or Next.js application.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold">Flow.ai</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Flow.ai Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
