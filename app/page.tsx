import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoveRight, Grid3x3, BarChart3, Layers, Palette, Globe, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b sticky top-0 bg-background z-10">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-xl">Ekspresi</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#showcase" className="text-sm font-medium hover:underline underline-offset-4">
            Showcase
          </Link>
          <Link href="#analytics" className="text-sm font-medium hover:underline underline-offset-4">
            Analytics
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 border-b">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Express Your Photography
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Build a stunning portfolio with Ekspresi. Showcase your work with customizable grid layouts and track
                  your audience engagement.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Start Creating
                    <MoveRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="gap-2">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2 p-2 bg-muted rounded-lg">
                <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Portfolio example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Portfolio example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Portfolio example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Portfolio example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Portfolio example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Portfolio example"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ekspresi provides all the tools you need to create a professional photography portfolio that stands out.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Grid3x3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Customizable Grids</h3>
              <p className="text-center text-muted-foreground">
                Create beautiful photo layouts with customizable grid settings for each collection.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Visitor Analytics</h3>
              <p className="text-center text-muted-foreground">
                Track who views your portfolio with detailed analytics and visitor insights.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Photo Groups</h3>
              <p className="text-center text-muted-foreground">
                Organize your work into collections with custom settings for each group.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Customizable Design</h3>
              <p className="text-center text-muted-foreground">
                Personalize your portfolio with custom colors, fonts, and layouts.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Custom Domain</h3>
              <p className="text-center text-muted-foreground">
                Connect your own domain or use our free subdomain for your portfolio.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Fast Performance</h3>
              <p className="text-center text-muted-foreground">
                Optimized image loading and responsive design for all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="w-full py-12 md:py-24 lg:py-32 border-y">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Showcase</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Customizable Grid Layouts</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create stunning photo layouts with our flexible grid system. Adjust columns, spacing, and more.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Group-Specific Settings</h3>
                <p className="text-muted-foreground">
                  Each photo collection can have its own unique grid layout. Adjust columns, spacing, rounded corners,
                  and captions for each group independently.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    <span>Adjustable column count (1-6 columns)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    <span>Customizable gap spacing</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    <span>Toggle rounded corners</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    <span>Show or hide photo captions</span>
                  </li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Grid example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Grid example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-muted-foreground/20 rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Grid example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-background rounded border">
                  <div className="flex items-center justify-between text-sm">
                    <span>Columns: 3</span>
                    <span>Gap: 8px</span>
                    <span>Rounded: Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-background p-4 rounded-lg border shadow-sm">
                <div className="space-y-2 mb-4">
                  <h4 className="text-lg font-medium">Visitor Analytics Dashboard</h4>
                  <p className="text-sm text-muted-foreground">Last 7 days</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-3 rounded-md text-center">
                      <div className="text-2xl font-bold">245</div>
                      <div className="text-xs text-muted-foreground">Page Views</div>
                    </div>
                    <div className="bg-muted p-3 rounded-md text-center">
                      <div className="text-2xl font-bold">112</div>
                      <div className="text-xs text-muted-foreground">Visitors</div>
                    </div>
                    <div className="bg-muted p-3 rounded-md text-center">
                      <div className="text-2xl font-bold">3:24</div>
                      <div className="text-xs text-muted-foreground">Avg. Time</div>
                    </div>
                  </div>
                  <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                    <div className="text-muted-foreground text-sm">Visitor chart visualization</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-xs font-medium">Top Locations</div>
                      <div className="text-xs text-muted-foreground mt-1">United States, UK, Canada</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-xs font-medium">Popular Groups</div>
                      <div className="text-xs text-muted-foreground mt-1">Landscapes, Portraits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">Analytics</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Know Your Audience</h2>
              <p className="text-muted-foreground">
                Track who views your portfolio with our comprehensive analytics dashboard. Understand your audience and
                optimize your content.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                  <span>Track page views and unique visitors</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                  <span>See visitor locations and devices</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                  <span>Identify your most popular photo groups</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                  <span>Measure engagement with time-on-page metrics</span>
                </li>
              </ul>
              <div>
                <Link href="/login">
                  <Button className="gap-2">
                    Try Analytics
                    <MoveRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Photographers Love Ekspresi</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what professional photographers are saying about our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Ekspresi has transformed how I showcase my work. The customizable grids and analytics have helped me
                  understand what resonates with my audience."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted h-10 w-10 overflow-hidden">
                  <img src="/placeholder.svg?height=40&width=40" alt="Avatar" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Landscape Photographer</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The ability to create different grid layouts for each photo group is exactly what I needed. My
                  portfolio has never looked better."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted h-10 w-10 overflow-hidden">
                  <img src="/placeholder.svg?height=40&width=40" alt="Avatar" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Portrait Photographer</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "I've tried many portfolio platforms, but Ekspresi stands out with its analytics. I can finally see
                  who's viewing my work and for how long."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted h-10 w-10 overflow-hidden">
                  <img src="/placeholder.svg?height=40&width=40" alt="Avatar" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium">Emma Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Wedding Photographer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for you and start building your portfolio today.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-muted-foreground">Perfect for getting started</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Up to 3 photo groups</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Ekspresi subdomain</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                  <span>Custom domain</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Popular
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-muted-foreground">For serious photographers</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$12</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Unlimited photo groups</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Custom domain</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Business</h3>
                <p className="text-muted-foreground">For professional studios</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$29</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Multiple portfolios</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Client proofing</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>White labeling</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Showcase Your Work?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of photographers who trust Ekspresi to display their portfolios.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Get Started for Free
                  <MoveRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Ekspresi. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}

