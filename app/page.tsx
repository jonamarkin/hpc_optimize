"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, Cloud, DollarSign, Gauge, Shield, Zap, CheckCircle, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Animated counter component
function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  HPCOptimize
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="hover:scale-105 transition-transform">
                  View Dashboard
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all shadow-lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-7xl mx-auto text-center relative">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 hover:scale-105 transition-transform">
              🚀 Reduce HPC costs by up to 40%
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Optimize Your HPC{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Resources & Costs
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Get real-time insights into resource usage and costs across on-premise and cloud-based HPC environments.
              Make informed decisions about resource allocation with our comprehensive optimization dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all shadow-xl"
                >
                  View Live Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 hover:scale-105 transition-transform border-2"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">
                <AnimatedCounter end={40} suffix="%" />
              </div>
              <p className="text-muted-foreground">Average Cost Reduction</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-muted-foreground">Organizations Trust Us</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">
                <AnimatedCounter end={2} suffix="M+" />
              </div>
              <p className="text-muted-foreground">Resources Monitored</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">
                <AnimatedCounter end={99} suffix="%" />
              </div>
              <p className="text-muted-foreground">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
              Powerful Features
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Everything You Need for HPC Optimization</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and insights to monitor, analyze, and optimize your HPC infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Gauge,
                title: "Real-time Monitoring",
                description:
                  "Monitor CPU, memory, storage, and network usage across all your HPC resources in real-time with sub-second precision",
                gradient: "from-blue-500/10 to-blue-600/5",
                iconColor: "text-blue-500",
              },
              {
                icon: DollarSign,
                title: "Cost Analysis",
                description:
                  "Track and analyze costs across different environments with detailed breakdowns, forecasting, and budget alerts",
                gradient: "from-green-500/10 to-green-600/5",
                iconColor: "text-green-500",
              },
              {
                icon: Cloud,
                title: "Multi-Environment",
                description:
                  "Unified view of both on-premise and cloud-based HPC environments for comprehensive hybrid management",
                gradient: "from-purple-500/10 to-purple-600/5",
                iconColor: "text-purple-500",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description:
                  "Interactive charts and analytics to understand usage patterns and identify optimization opportunities",
                gradient: "from-orange-500/10 to-orange-600/5",
                iconColor: "text-orange-500",
              },
              {
                icon: Zap,
                title: "Smart Recommendations",
                description:
                  "AI-powered recommendations for resource allocation and cost optimization strategies with ROI predictions",
                gradient: "from-yellow-500/10 to-yellow-600/5",
                iconColor: "text-yellow-500",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "Enterprise-grade security with role-based access control, audit logging, and compliance reporting",
                gradient: "from-red-500/10 to-red-600/5",
                iconColor: "text-red-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50"
              >
                <CardHeader className="space-y-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
                Proven Results
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Reduce Costs by Up to 40%</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our customers typically see significant cost reductions within the first month of implementation.
                Identify underutilized resources, optimize workload placement, and make data-driven decisions about your
                HPC infrastructure with confidence.
              </p>
              <div className="space-y-4">
                {[
                  "Identify idle and underutilized resources automatically",
                  "Optimize workload scheduling and placement with AI",
                  "Compare on-premise vs cloud costs in real-time",
                  "Forecast future resource needs with 95% accuracy",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="h-6 w-6 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 border-2 shadow-xl">
              <div className="space-y-6">
                {[
                  { label: "Cost Reduction", value: 40, color: "bg-gradient-to-r from-green-500 to-green-400" },
                  { label: "Resource Utilization", value: 85, color: "bg-gradient-to-r from-blue-500 to-blue-400" },
                  {
                    label: "Operational Efficiency",
                    value: 60,
                    color: "bg-gradient-to-r from-purple-500 to-purple-400",
                  },
                  { label: "Time Savings", value: 75, color: "bg-gradient-to-r from-orange-500 to-orange-400" },
                ].map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <span className="text-sm text-muted-foreground font-bold">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full ${metric.color} transition-all duration-1000 ease-out shadow-lg`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground mb-8">Trusted by leading organizations worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {[Users, Globe, Cloud, Shield, BarChart3, Zap].map((Icon, index) => (
              <div
                key={index}
                className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                <Icon className="h-6 w-6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Optimize Your HPC Infrastructure?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join hundreds of organizations already saving millions with HPCOptimize
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 hover:scale-105 transition-all shadow-xl">
                Explore Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                HPCOptimize
              </span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 HPCOptimize. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
