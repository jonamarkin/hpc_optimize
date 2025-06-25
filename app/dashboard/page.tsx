"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  BarChart3,
  Cloud,
  Cpu,
  DollarSign,
  HardDrive,
  MemoryStick,
  Network,
  Server,
  TrendingDown,
  TrendingUp,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

// Animated progress bar
function AnimatedProgress({ value, className = "" }: { value: number; className?: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500)
    return () => clearTimeout(timer)
  }, [value])

  return <Progress value={progress} className={`transition-all duration-1000 ease-out ${className}`} />
}

// Mock data with more realistic values
const mockData = {
  overview: {
    totalCost: 45680,
    monthlySavings: 12340,
    resourceUtilization: 78,
    activeNodes: 156,
    costTrend: 5.2,
    utilizationTrend: -2.1,
  },
  environments: {
    onPremise: {
      cost: 28450,
      utilization: 82,
      nodes: 89,
      status: "optimal",
    },
    cloud: {
      cost: 17230,
      utilization: 73,
      nodes: 67,
      status: "warning",
    },
  },
  resources: {
    cpu: { usage: 78, cost: 18500, trend: 2.3, status: "good" },
    memory: { usage: 65, cost: 12300, trend: -1.2, status: "optimal" },
    storage: { usage: 89, cost: 8900, trend: 4.1, status: "warning" },
    network: { usage: 45, cost: 5980, trend: -0.8, status: "good" },
  },
  recommendations: [
    {
      type: "cost",
      title: "Resize underutilized instances",
      description: "14 instances running at <30% utilization",
      savings: 2340,
      priority: "high",
      impact: "immediate",
      effort: "low",
    },
    {
      type: "performance",
      title: "Optimize storage allocation",
      description: "Move cold data to cheaper storage tiers",
      savings: 1890,
      priority: "medium",
      impact: "gradual",
      effort: "medium",
    },
    {
      type: "efficiency",
      title: "Schedule batch jobs during off-peak",
      description: "Reduce peak hour resource contention",
      savings: 980,
      priority: "low",
      impact: "long-term",
      effort: "high",
    },
  ],
  realTimeMetrics: {
    cpuTemp: 67,
    powerConsumption: 12.4,
    networkThroughput: 8.9,
    jobsRunning: 234,
  },
}

const sidebarItems = [
  {
    title: "Overview",
    icon: BarChart3,
    id: "overview",
  },
  {
    title: "Resource Usage",
    icon: Activity,
    id: "resources",
  },
  {
    title: "Cost Analysis",
    icon: DollarSign,
    id: "costs",
  },
  {
    title: "Environments",
    icon: Cloud,
    id: "environments",
  },
  {
    title: "Recommendations",
    icon: Zap,
    id: "recommendations",
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "good":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "warning":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Clock className="h-4 w-4" />
      case "low":
        return <Target className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar className="border-r-2">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                HPCOptimize
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={activeTab === item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="hover:scale-105 transition-transform"
                      >
                        <button className="w-full">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-md px-4">
            <SidebarTrigger className="-ml-1 hover:scale-110 transition-transform" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">{activeTab}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 animate-pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Live
              </Badge>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 hover:scale-105 transition-transform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="overview" className="space-y-4">
                {/* Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Monthly Cost</CardTitle>
                      <div className="h-8 w-8 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoaded ? <AnimatedCounter end={mockData.overview.totalCost} prefix="$" /> : "$0"}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {mockData.overview.costTrend > 0 ? (
                          <ArrowUpRight className="h-3 w-3 text-red-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-green-500 mr-1" />
                        )}
                        {Math.abs(mockData.overview.costTrend)}% from last month
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
                      <div className="h-8 w-8 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg flex items-center justify-center">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-500">
                        {isLoaded ? <AnimatedCounter end={mockData.overview.monthlySavings} prefix="$" /> : "$0"}
                      </div>
                      <p className="text-xs text-muted-foreground">27% cost reduction achieved</p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg flex items-center justify-center">
                        <Activity className="h-4 w-4 text-blue-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoaded ? <AnimatedCounter end={mockData.overview.resourceUtilization} suffix="%" /> : "0%"}
                      </div>
                      <AnimatedProgress value={mockData.overview.resourceUtilization} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
                      <div className="h-8 w-8 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg flex items-center justify-center">
                        <Server className="h-4 w-4 text-purple-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoaded ? <AnimatedCounter end={mockData.overview.activeNodes} /> : "0"}
                      </div>
                      <p className="text-xs text-muted-foreground">Across all environments</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Real-time Metrics */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">CPU Temperature</p>
                          <p className="text-2xl font-bold text-blue-500">
                            {isLoaded ? <AnimatedCounter end={mockData.realTimeMetrics.cpuTemp} suffix="°C" /> : "0°C"}
                          </p>
                        </div>
                        <Cpu className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/5 to-green-600/5 border-green-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Power Usage</p>
                          <p className="text-2xl font-bold text-green-500">
                            {isLoaded ? (
                              <AnimatedCounter end={mockData.realTimeMetrics.powerConsumption} suffix=" kW" />
                            ) : (
                              "0 kW"
                            )}
                          </p>
                        </div>
                        <Zap className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Network I/O</p>
                          <p className="text-2xl font-bold text-orange-500">
                            {isLoaded ? (
                              <AnimatedCounter end={mockData.realTimeMetrics.networkThroughput} suffix=" GB/s" />
                            ) : (
                              "0 GB/s"
                            )}
                          </p>
                        </div>
                        <Network className="h-8 w-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 border-purple-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Jobs</p>
                          <p className="text-2xl font-bold text-purple-500">
                            {isLoaded ? <AnimatedCounter end={mockData.realTimeMetrics.jobsRunning} /> : "0"}
                          </p>
                        </div>
                        <Activity className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Environment Comparison */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg flex items-center justify-center">
                          <Server className="h-5 w-5 text-blue-500" />
                        </div>
                        On-Premise Environment
                        <Badge className={`ml-auto ${getStatusColor(mockData.environments.onPremise.status)}`}>
                          {mockData.environments.onPremise.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Cost</span>
                        <span className="font-bold">${mockData.environments.onPremise.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Utilization</span>
                        <span className="font-bold">{mockData.environments.onPremise.utilization}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Nodes</span>
                        <span className="font-bold">{mockData.environments.onPremise.nodes}</span>
                      </div>
                      <AnimatedProgress value={mockData.environments.onPremise.utilization} />
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg flex items-center justify-center">
                          <Cloud className="h-5 w-5 text-purple-500" />
                        </div>
                        Cloud Environment
                        <Badge className={`ml-auto ${getStatusColor(mockData.environments.cloud.status)}`}>
                          {mockData.environments.cloud.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Cost</span>
                        <span className="font-bold">${mockData.environments.cloud.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Utilization</span>
                        <span className="font-bold">{mockData.environments.cloud.utilization}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Nodes</span>
                        <span className="font-bold">{mockData.environments.cloud.nodes}</span>
                      </div>
                      <AnimatedProgress value={mockData.environments.cloud.utilization} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(mockData.resources).map(([key, resource]) => {
                    const icons = {
                      cpu: Cpu,
                      memory: MemoryStick,
                      storage: HardDrive,
                      network: Network,
                    }
                    const Icon = icons[key as keyof typeof icons]
                    const colors = {
                      cpu: "from-blue-500/20 to-blue-600/10 text-blue-500",
                      memory: "from-green-500/20 to-green-600/10 text-green-500",
                      storage: "from-orange-500/20 to-orange-600/10 text-orange-500",
                      network: "from-purple-500/20 to-purple-600/10 text-purple-500",
                    }

                    return (
                      <Card
                        key={key}
                        className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 capitalize">
                            <div
                              className={`h-8 w-8 bg-gradient-to-br ${colors[key as keyof typeof colors].split(" ")[0]} ${colors[key as keyof typeof colors].split(" ")[1]} rounded-lg flex items-center justify-center`}
                            >
                              <Icon className={`h-5 w-5 ${colors[key as keyof typeof colors].split(" ")[2]}`} />
                            </div>
                            {key} Usage
                            <Badge className={`ml-auto ${getStatusColor(resource.status)}`}>{resource.status}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-3xl font-bold">{resource.usage}%</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex items-center text-sm">
                                  {resource.trend > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                                  )}
                                  {Math.abs(resource.trend)}%
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Trend over last 7 days</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <AnimatedProgress value={resource.usage} />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Monthly Cost</span>
                            <span className="font-bold">${resource.cost.toLocaleString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="costs" className="space-y-4">
                <div className="grid gap-4">
                  <Card className="bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Cost Breakdown by Resource Type
                      </CardTitle>
                      <CardDescription>Monthly costs across different resource categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(mockData.resources).map(([key, resource], index) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 capitalize">
                              <div
                                className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                                  index === 0
                                    ? "from-blue-500 to-blue-400"
                                    : index === 1
                                      ? "from-green-500 to-green-400"
                                      : index === 2
                                        ? "from-orange-500 to-orange-400"
                                        : "from-purple-500 to-purple-400"
                                }`}
                              />
                              <span className="font-medium">{key}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">${resource.cost.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">
                                {((resource.cost / mockData.overview.totalCost) * 100).toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-gradient-to-br from-green-500/5 to-green-600/5 border-green-500/20">
                      <CardHeader>
                        <CardTitle className="text-green-500">Cost Trends</CardTitle>
                        <CardDescription>7-day cost comparison</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between p-2 rounded bg-background/50">
                            <span className="text-sm">This week</span>
                            <span className="font-bold">${(mockData.overview.totalCost / 4).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between p-2 rounded bg-background/50">
                            <span className="text-sm">Last week</span>
                            <span className="font-bold">
                              ${((mockData.overview.totalCost / 4) * 1.08).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between p-2 rounded bg-green-500/10 text-green-500">
                            <span className="text-sm font-medium">Savings</span>
                            <span className="font-bold">-8.2%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
                      <CardHeader>
                        <CardTitle className="text-blue-500">Budget Status</CardTitle>
                        <CardDescription>Monthly budget utilization</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between p-2 rounded bg-background/50">
                            <span className="text-sm">Used</span>
                            <span className="font-bold">${mockData.overview.totalCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between p-2 rounded bg-background/50">
                            <span className="text-sm">Budget</span>
                            <span className="font-bold">$60,000</span>
                          </div>
                          <AnimatedProgress value={(mockData.overview.totalCost / 60000) * 100} />
                          <div className="text-sm text-muted-foreground text-center">
                            {((mockData.overview.totalCost / 60000) * 100).toFixed(1)}% of monthly budget used
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="environments" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl flex items-center justify-center">
                          <Server className="h-6 w-6 text-blue-500" />
                        </div>
                        On-Premise Infrastructure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-background/50">
                          <div className="text-sm text-muted-foreground">Total Nodes</div>
                          <div className="text-3xl font-bold text-blue-500">
                            {mockData.environments.onPremise.nodes}
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-background/50">
                          <div className="text-sm text-muted-foreground">Utilization</div>
                          <div className="text-3xl font-bold text-blue-500">
                            {mockData.environments.onPremise.utilization}%
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-3">Resource Distribution</div>
                        <div className="space-y-3">
                          {[
                            { name: "Compute Nodes", count: 64, color: "bg-blue-500" },
                            { name: "Storage Nodes", count: 16, color: "bg-green-500" },
                            { name: "GPU Nodes", count: 9, color: "bg-purple-500" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 rounded bg-background/30">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 ${item.color} rounded-full`} />
                                <span className="text-sm">{item.name}</span>
                              </div>
                              <span className="font-bold">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-purple-500/5 to-purple-600/5 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl flex items-center justify-center">
                          <Cloud className="h-6 w-6 text-purple-500" />
                        </div>
                        Cloud Infrastructure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-background/50">
                          <div className="text-sm text-muted-foreground">Total Instances</div>
                          <div className="text-3xl font-bold text-purple-500">{mockData.environments.cloud.nodes}</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-background/50">
                          <div className="text-sm text-muted-foreground">Utilization</div>
                          <div className="text-3xl font-bold text-purple-500">
                            {mockData.environments.cloud.utilization}%
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-3">Instance Types</div>
                        <div className="space-y-3">
                          {[
                            { name: "c5.xlarge", count: 32, color: "bg-purple-500" },
                            { name: "m5.2xlarge", count: 24, color: "bg-orange-500" },
                            { name: "p3.2xlarge", count: 11, color: "bg-red-500" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 rounded bg-background/30">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 ${item.color} rounded-full`} />
                                <span className="text-sm font-mono">{item.name}</span>
                              </div>
                              <span className="font-bold">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-4">
                  {mockData.recommendations.map((rec, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/50"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-3">
                            <div
                              className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                                rec.priority === "high"
                                  ? "bg-red-500/20 text-red-500"
                                  : rec.priority === "medium"
                                    ? "bg-yellow-500/20 text-yellow-500"
                                    : "bg-blue-500/20 text-blue-500"
                              }`}
                            >
                              {getPriorityIcon(rec.priority)}
                            </div>
                            <div>
                              <div className="text-lg">{rec.title}</div>
                              <div className="text-sm text-muted-foreground font-normal">{rec.description}</div>
                            </div>
                          </CardTitle>
                          <div className="flex gap-2">
                            <Badge
                              variant={
                                rec.priority === "high"
                                  ? "destructive"
                                  : rec.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="capitalize"
                            >
                              {rec.priority} priority
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {rec.impact} impact
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Potential Monthly Savings</div>
                            <div className="text-3xl font-bold text-green-500">${rec.savings.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Implementation effort: {rec.effort}</div>
                          </div>
                          <Button className="hover:scale-105 transition-transform bg-gradient-to-r from-primary to-primary/80">
                            Implement
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
