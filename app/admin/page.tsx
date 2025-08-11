"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Calendar,
  Download
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const dashboardData = {
  stats: [
    {
      title: "Total Users",
      value: "1,234,567",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-cyan-400"
    },
    {
      title: "Revenue",
      value: "$2,456,890",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Active Sessions",
      value: "89,432",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      color: "text-purple-400"
    },
    {
      title: "Growth Rate",
      value: "23.4%",
      change: "+5.7%",
      trend: "up",
      icon: TrendingUp,
      color: "text-pink-400"
    }
  ],
  chartData: [
    { name: 'Jan', users: 4000, revenue: 2400, sessions: 2400 },
    { name: 'Feb', users: 3000, revenue: 1398, sessions: 2210 },
    { name: 'Mar', users: 2000, revenue: 9800, sessions: 2290 },
    { name: 'Apr', users: 2780, revenue: 3908, sessions: 2000 },
    { name: 'May', users: 1890, revenue: 4800, sessions: 2181 },
    { name: 'Jun', users: 2390, revenue: 3800, sessions: 2500 },
    { name: 'Jul', users: 3490, revenue: 4300, sessions: 2100 },
  ],
  recentActivity: [
    { id: 1, user: "Alex Chen", action: "Created new product", time: "2 minutes ago", type: "create" },
    { id: 2, user: "Sarah Johnson", action: "Updated user permissions", time: "5 minutes ago", type: "update" },
    { id: 3, user: "Marcus Rodriguez", action: "Deployed new feature", time: "12 minutes ago", type: "deploy" },
    { id: 4, user: "Emily Wang", action: "Resolved support ticket", time: "18 minutes ago", type: "support" },
    { id: 5, user: "David Park", action: "Generated analytics report", time: "25 minutes ago", type: "report" },
  ]
};

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const chartsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const header = headerRef.current;
    const stats = statsRef.current;
    const charts = chartsRef.current;

    // Header animation
    if (header) {
      gsap.from(header, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Stats cards animation
    if (stats.length > 0) {
      gsap.set(stats, { opacity: 0, y: 30, scale: 0.95 });
      gsap.to(stats, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2
      });
    }

    // Charts animation
    if (charts.length > 0) {
      gsap.set(charts, { opacity: 0, y: 40 });
      gsap.to(charts, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5
      });
    }
  }, []);

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black orbitron neon-text mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back, Alex. Here's what's happening with your platform.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="glass rounded-xl border-2 border-white/10 px-3 py-2 text-sm orbitron bg-transparent"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            
            <Button className="glass hover:neon-glow transition-all duration-300 rounded-xl orbitron">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.stats.map((stat, index) => (
            <Card
              key={index}
              ref={el => el && (statsRef.current[index] = el)}
              className="glass-strong hover:neon-glow transition-all duration-300 border-2 border-white/10 rounded-3xl"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground orbitron">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold orbitron neon-text mb-2">
                  {stat.value}
                </div>
                <div className="flex items-center text-sm">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card 
            ref={el => el && (chartsRef.current[0] = el)}
            className="glass-strong border-2 border-white/10 rounded-3xl"
          >
            <CardHeader>
              <CardTitle className="orbitron text-xl">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dashboardData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#00ffff" 
                    fill="url(#gradient)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ffff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00ffff" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Users Chart */}
          <Card 
            ref={el => el && (chartsRef.current[1] = el)}
            className="glass-strong border-2 border-white/10 rounded-3xl"
          >
            <CardHeader>
              <CardTitle className="orbitron text-xl">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card 
          ref={el => el && (chartsRef.current[2] = el)}
          className="glass-strong border-2 border-white/10 rounded-3xl"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="orbitron text-xl">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="glass rounded-xl">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 glass rounded-2xl hover:neon-glow transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center glass ${
                      activity.type === 'create' ? 'text-green-400' :
                      activity.type === 'update' ? 'text-blue-400' :
                      activity.type === 'deploy' ? 'text-purple-400' :
                      activity.type === 'support' ? 'text-yellow-400' :
                      'text-cyan-400'
                    }`}>
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="glass text-xs">
                      {activity.type}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}