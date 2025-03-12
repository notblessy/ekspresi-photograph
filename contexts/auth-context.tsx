// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   type ReactNode,
// } from "react";

// // Add this to the auth context near the top with other type definitions

// // Add UserRole type for permission management
// type UserRole = "user" | "admin";

// // Updated data model to support photo groups with their own grid settings
// type PhotoGroup = {
//   id: string;
//   name: string;
//   description: string;
//   coverId: number | null;
//   photos: Photo[];
//   gridSettings: GridSettings; // Added grid settings per group
// };

// type GridSettings = {
//   columns: number;
//   gap: number;
//   roundedCorners: boolean;
//   showCaptions: boolean;
// };

// type Photo = {
//   id: number;
//   src: string;
//   alt: string;
//   caption: string;
// };

// // Add these types to the existing types in the file
// type AnalyticsData = {
//   pageViews: PageView[];
//   visitors: Visitor[];
//   popularGroups: PopularGroup[];
//   dailyStats: DailyStat[];
// };

// type PageView = {
//   id: string;
//   path: string;
//   date: string;
//   referrer: string;
//   duration: number;
// };

// type Visitor = {
//   id: string;
//   country: string;
//   city: string;
//   device: string;
//   browser: string;
//   firstVisit: string;
//   lastVisit: string;
//   totalVisits: number;
// };

// type PopularGroup = {
//   groupId: string;
//   groupName: string;
//   views: number;
//   avgTimeSpent: number;
// };

// type DailyStat = {
//   date: string;
//   views: number;
//   visitors: number;
//   avgDuration: number;
// };

// // Add PricingPlan type
// type PricingPlan = {
//   id: string;
//   name: string;
//   price: number;
//   billingCycle: "monthly" | "yearly";
//   features: string[];
//   isPopular: boolean;
//   maxPhotoGroups: number | null;
//   customDomain: boolean;
//   advancedAnalytics: boolean;
//   teamMembers: number;
// };

// // Add Transaction type
// type Transaction = {
//   id: string;
//   userId: string;
//   planId: string;
//   amount: number;
//   status: "pending" | "completed" | "failed" | "refunded";
//   paymentMethod: string;
//   date: string;
// };

// // Add Subscription type
// type Subscription = {
//   id: string;
//   userId: string;
//   planId: string;
//   status: "active" | "canceled" | "expired";
//   startDate: string;
//   endDate: string;
//   autoRenew: boolean;
// };

// // Extend User type with role
// type User = {
//   id: string;
//   name: string;
//   email: string;
//   username: string;
//   role: UserRole; // Add role field
//   portfolios: Portfolio[];
// };

// // Update the Portfolio type to include analytics
// type Portfolio = {
//   id: string;
//   name: string;
//   gridSettings: GridSettings;
//   profileData: {
//     name: string;
//     title: string;
//     bio: string;
//     email: string;
//     instagram: string;
//     website: string;
//   };
//   photoGroups: PhotoGroup[];
//   analytics: AnalyticsData; // Add this line
// };

// // Update MOCK_USERS to include roles, making one user an admin
// const MOCK_USERS: User[] = [
//   {
//     id: "1",
//     name: "Jane Doe",
//     email: "jane@example.com",
//     username: "janedoe",
//     role: "user", // Regular user
//     portfolios: [
//       {
//         id: "portfolio-1",
//         name: "My Photography Portfolio",
//         gridSettings: {
//           columns: 3,
//           gap: 16,
//           roundedCorners: true,
//           showCaptions: true,
//         },
//         profileData: {
//           name: "Jane Doe",
//           title: "Photographer",
//           bio: "I'm a photographer specializing in landscape and portrait photography. Based in New York City, available for bookings worldwide.",
//           email: "jane@example.com",
//           instagram: "janedoephoto",
//           website: "janedoephotography.com",
//         },
//         photoGroups: [
//           {
//             id: "group-1",
//             name: "Landscapes",
//             description: "Beautiful natural landscapes from around the world",
//             coverId: 1,
//             gridSettings: {
//               columns: 3,
//               gap: 16,
//               roundedCorners: true,
//               showCaptions: true,
//             },
//             photos: [
//               {
//                 id: 1,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Landscape photo",
//                 caption: "Mountain sunrise",
//               },
//               {
//                 id: 2,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Landscape photo",
//                 caption: "Forest path",
//               },
//               {
//                 id: 3,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Landscape photo",
//                 caption: "Beach sunset",
//               },
//             ],
//           },
//           {
//             id: "group-2",
//             name: "Portraits",
//             description: "Studio and natural light portraits",
//             coverId: 4,
//             gridSettings: {
//               columns: 2,
//               gap: 24,
//               roundedCorners: true,
//               showCaptions: true,
//             },
//             photos: [
//               {
//                 id: 4,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Portrait photo",
//                 caption: "Studio portrait",
//               },
//               {
//                 id: 5,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Portrait photo",
//                 caption: "Natural light portrait",
//               },
//             ],
//           },
//           {
//             id: "group-3",
//             name: "Urban",
//             description: "City life and architecture",
//             coverId: 6,
//             gridSettings: {
//               columns: 3,
//               gap: 16,
//               roundedCorners: false,
//               showCaptions: true,
//             },
//             photos: [
//               {
//                 id: 6,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Urban photo",
//                 caption: "Urban exploration",
//               },
//               {
//                 id: 7,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Architecture photo",
//                 caption: "Modern building",
//               },
//             ],
//           },
//         ],
//         analytics: {
//           pageViews: [
//             {
//               id: "pv1",
//               path: "/",
//               date: "2025-03-08T14:23:45Z",
//               referrer: "google.com",
//               duration: 120,
//             },
//             {
//               id: "pv2",
//               path: "/landscapes",
//               date: "2025-03-08T15:12:30Z",
//               referrer: "instagram.com",
//               duration: 245,
//             },
//             {
//               id: "pv3",
//               path: "/portraits",
//               date: "2025-03-08T16:45:12Z",
//               referrer: "direct",
//               duration: 180,
//             },
//             {
//               id: "pv4",
//               path: "/",
//               date: "2025-03-09T09:23:10Z",
//               referrer: "facebook.com",
//               duration: 95,
//             },
//             {
//               id: "pv5",
//               path: "/urban",
//               date: "2025-03-09T10:34:22Z",
//               referrer: "twitter.com",
//               duration: 210,
//             },
//             {
//               id: "pv6",
//               path: "/landscapes",
//               date: "2025-03-09T11:56:40Z",
//               referrer: "direct",
//               duration: 320,
//             },
//             {
//               id: "pv7",
//               path: "/",
//               date: "2025-03-09T13:12:05Z",
//               referrer: "google.com",
//               duration: 75,
//             },
//             {
//               id: "pv8",
//               path: "/portraits",
//               date: "2025-03-09T14:45:30Z",
//               referrer: "instagram.com",
//               duration: 190,
//             },
//             {
//               id: "pv9",
//               path: "/urban",
//               date: "2025-03-09T16:20:15Z",
//               referrer: "direct",
//               duration: 260,
//             },
//             {
//               id: "pv10",
//               path: "/",
//               date: "2025-03-09T17:30:45Z",
//               referrer: "pinterest.com",
//               duration: 110,
//             },
//           ],
//           visitors: [
//             {
//               id: "v1",
//               country: "United States",
//               city: "New York",
//               device: "Desktop",
//               browser: "Chrome",
//               firstVisit: "2025-03-08T14:23:45Z",
//               lastVisit: "2025-03-09T17:30:45Z",
//               totalVisits: 4,
//             },
//             {
//               id: "v2",
//               country: "United Kingdom",
//               city: "London",
//               device: "Mobile",
//               browser: "Safari",
//               firstVisit: "2025-03-08T15:12:30Z",
//               lastVisit: "2025-03-09T11:56:40Z",
//               totalVisits: 2,
//             },
//             {
//               id: "v3",
//               country: "Canada",
//               city: "Toronto",
//               device: "Tablet",
//               browser: "Firefox",
//               firstVisit: "2025-03-08T16:45:12Z",
//               lastVisit: "2025-03-09T14:45:30Z",
//               totalVisits: 2,
//             },
//             {
//               id: "v4",
//               country: "Australia",
//               city: "Sydney",
//               device: "Mobile",
//               browser: "Chrome",
//               firstVisit: "2025-03-09T09:23:10Z",
//               lastVisit: "2025-03-09T16:20:15Z",
//               totalVisits: 2,
//             },
//           ],
//           popularGroups: [
//             {
//               groupId: "group-1",
//               groupName: "Landscapes",
//               views: 42,
//               avgTimeSpent: 210,
//             },
//             {
//               groupId: "group-2",
//               groupName: "Portraits",
//               views: 38,
//               avgTimeSpent: 185,
//             },
//             {
//               groupId: "group-3",
//               groupName: "Urban",
//               views: 27,
//               avgTimeSpent: 235,
//             },
//           ],
//           dailyStats: [
//             {
//               date: "2025-03-03",
//               views: 24,
//               visitors: 18,
//               avgDuration: 145,
//             },
//             {
//               date: "2025-03-04",
//               views: 32,
//               visitors: 22,
//               avgDuration: 160,
//             },
//             {
//               date: "2025-03-05",
//               views: 28,
//               visitors: 20,
//               avgDuration: 175,
//             },
//             {
//               date: "2025-03-06",
//               views: 35,
//               visitors: 25,
//               avgDuration: 190,
//             },
//             {
//               date: "2025-03-07",
//               views: 42,
//               visitors: 30,
//               avgDuration: 205,
//             },
//             {
//               date: "2025-03-08",
//               views: 38,
//               visitors: 28,
//               avgDuration: 195,
//             },
//             {
//               date: "2025-03-09",
//               views: 45,
//               visitors: 32,
//               avgDuration: 210,
//             },
//           ],
//         },
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "John Smith",
//     email: "john@example.com",
//     username: "johnsmith",
//     role: "user", // Regular user
//     portfolios: [
//       {
//         id: "portfolio-2",
//         name: "John's Portfolio",
//         gridSettings: {
//           columns: 2,
//           gap: 24,
//           roundedCorners: false,
//           showCaptions: true,
//         },
//         profileData: {
//           name: "John Smith",
//           title: "Wildlife Photographer",
//           bio: "Wildlife photographer with 10 years of experience. I specialize in capturing animals in their natural habitats.",
//           email: "john@example.com",
//           instagram: "johnsmithphoto",
//           website: "johnsmithphotography.com",
//         },
//         photoGroups: [
//           {
//             id: "group-1",
//             name: "Wildlife",
//             description: "Animals in their natural habitats",
//             coverId: 1,
//             gridSettings: {
//               columns: 2,
//               gap: 24,
//               roundedCorners: false,
//               showCaptions: true,
//             },
//             photos: [
//               {
//                 id: 1,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Wildlife photo",
//                 caption: "Lion in savanna",
//               },
//               {
//                 id: 2,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Wildlife photo",
//                 caption: "Elephant herd",
//               },
//             ],
//           },
//           {
//             id: "group-2",
//             name: "Safari",
//             description: "Photos from African safaris",
//             coverId: 3,
//             gridSettings: {
//               columns: 2,
//               gap: 24,
//               roundedCorners: false,
//               showCaptions: true,
//             },
//             photos: [
//               {
//                 id: 3,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Wildlife photo",
//                 caption: "Giraffe at sunset",
//               },
//               {
//                 id: 4,
//                 src: "/placeholder.svg?height=600&width=600",
//                 alt: "Wildlife photo",
//                 caption: "Zebras crossing",
//               },
//             ],
//           },
//         ],
//         analytics: {
//           pageViews: [
//             {
//               id: "pv1",
//               path: "/",
//               date: "2025-03-08T14:23:45Z",
//               referrer: "google.com",
//               duration: 120,
//             },
//             {
//               id: "pv2",
//               path: "/landscapes",
//               date: "2025-03-08T15:12:30Z",
//               referrer: "instagram.com",
//               duration: 245,
//             },
//             {
//               id: "pv3",
//               path: "/portraits",
//               date: "2025-03-08T16:45:12Z",
//               referrer: "direct",
//               duration: 180,
//             },
//             {
//               id: "pv4",
//               path: "/",
//               date: "2025-03-09T09:23:10Z",
//               referrer: "facebook.com",
//               duration: 95,
//             },
//             {
//               id: "pv5",
//               path: "/urban",
//               date: "2025-03-09T10:34:22Z",
//               referrer: "twitter.com",
//               duration: 210,
//             },
//             {
//               id: "pv6",
//               path: "/landscapes",
//               date: "2025-03-09T11:56:40Z",
//               referrer: "direct",
//               duration: 320,
//             },
//             {
//               id: "pv7",
//               path: "/",
//               date: "2025-03-09T13:12:05Z",
//               referrer: "google.com",
//               duration: 75,
//             },
//             {
//               id: "pv8",
//               path: "/portraits",
//               date: "2025-03-09T14:45:30Z",
//               referrer: "instagram.com",
//               duration: 190,
//             },
//             {
//               id: "pv9",
//               path: "/urban",
//               date: "2025-03-09T16:20:15Z",
//               referrer: "direct",
//               duration: 260,
//             },
//             {
//               id: "pv10",
//               path: "/",
//               date: "2025-03-09T17:30:45Z",
//               referrer: "pinterest.com",
//               duration: 110,
//             },
//           ],
//           visitors: [
//             {
//               id: "v1",
//               country: "United States",
//               city: "New York",
//               device: "Desktop",
//               browser: "Chrome",
//               firstVisit: "2025-03-08T14:23:45Z",
//               lastVisit: "2025-03-09T17:30:45Z",
//               totalVisits: 4,
//             },
//             {
//               id: "v2",
//               country: "United Kingdom",
//               city: "London",
//               device: "Mobile",
//               browser: "Safari",
//               firstVisit: "2025-03-08T15:12:30Z",
//               lastVisit: "2025-03-09T11:56:40Z",
//               totalVisits: 2,
//             },
//             {
//               id: "v3",
//               country: "Canada",
//               city: "Toronto",
//               device: "Tablet",
//               browser: "Firefox",
//               firstVisit: "2025-03-08T16:45:12Z",
//               lastVisit: "2025-03-09T14:45:30Z",
//               totalVisits: 2,
//             },
//             {
//               id: "v4",
//               country: "Australia",
//               city: "Sydney",
//               device: "Mobile",
//               browser: "Chrome",
//               firstVisit: "2025-03-09T09:23:10Z",
//               lastVisit: "2025-03-09T16:20:15Z",
//               totalVisits: 2,
//             },
//           ],
//           popularGroups: [
//             {
//               groupId: "group-1",
//               groupName: "Wildlife",
//               views: 42,
//               avgTimeSpent: 210,
//             },
//             {
//               groupId: "group-2",
//               groupName: "Safari",
//               views: 38,
//               avgTimeSpent: 185,
//             },
//           ],
//           dailyStats: [
//             {
//               date: "2025-03-03",
//               views: 24,
//               visitors: 18,
//               avgDuration: 145,
//             },
//             {
//               date: "2025-03-04",
//               views: 32,
//               visitors: 22,
//               avgDuration: 160,
//             },
//             {
//               date: "2025-03-05",
//               views: 28,
//               visitors: 20,
//               avgDuration: 175,
//             },
//             {
//               date: "2025-03-06",
//               views: 35,
//               visitors: 25,
//               avgDuration: 190,
//             },
//             {
//               date: "2025-03-07",
//               views: 42,
//               visitors: 30,
//               avgDuration: 205,
//             },
//             {
//               date: "2025-03-08",
//               views: 38,
//               visitors: 28,
//               avgDuration: 195,
//             },
//             {
//               date: "2025-03-09",
//               views: 45,
//               visitors: 32,
//               avgDuration: 210,
//             },
//           ],
//         },
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "Admin User",
//     email: "admin@example.com",
//     username: "admin",
//     role: "admin", // Admin user
//     portfolios: [], // Admin might not have portfolios
//   },
// ];

// // Add mock pricing plans
// const MOCK_PRICING_PLANS: PricingPlan[] = [
//   {
//     id: "plan-1",
//     name: "Free",
//     price: 0,
//     billingCycle: "monthly",
//     features: ["Up to 3 photo groups", "Basic analytics", "Ekspresi subdomain"],
//     isPopular: false,
//     maxPhotoGroups: 3,
//     customDomain: false,
//     advancedAnalytics: false,
//     teamMembers: 1,
//   },
//   {
//     id: "plan-2",
//     name: "Pro",
//     price: 12,
//     billingCycle: "monthly",
//     features: [
//       "Unlimited photo groups",
//       "Advanced analytics",
//       "Custom domain",
//       "Priority support",
//     ],
//     isPopular: true,
//     maxPhotoGroups: null,
//     customDomain: true,
//     advancedAnalytics: true,
//     teamMembers: 1,
//   },
//   {
//     id: "plan-3",
//     name: "Business",
//     price: 29,
//     billingCycle: "monthly",
//     features: [
//       "Multiple portfolios",
//       "Team collaboration",
//       "Client proofing",
//       "White labeling",
//     ],
//     isPopular: false,
//     maxPhotoGroups: null,
//     customDomain: true,
//     advancedAnalytics: true,
//     teamMembers: 5,
//   },
// ];

// // Add mock transactions
// const MOCK_TRANSACTIONS: Transaction[] = [
//   {
//     id: "tx-1",
//     userId: "1",
//     planId: "plan-2",
//     amount: 12,
//     status: "completed",
//     paymentMethod: "credit_card",
//     date: "2025-03-01T10:30:00Z",
//   },
//   {
//     id: "tx-2",
//     userId: "2",
//     planId: "plan-3",
//     amount: 29,
//     status: "completed",
//     paymentMethod: "paypal",
//     date: "2025-03-02T14:45:00Z",
//   },
//   {
//     id: "tx-3",
//     userId: "1",
//     planId: "plan-2",
//     amount: 12,
//     status: "pending",
//     paymentMethod: "credit_card",
//     date: "2025-03-05T09:15:00Z",
//   },
// ];

// // Add mock subscriptions
// const MOCK_SUBSCRIPTIONS: Subscription[] = [
//   {
//     id: "sub-1",
//     userId: "1",
//     planId: "plan-2",
//     status: "active",
//     startDate: "2025-03-01T10:30:00Z",
//     endDate: "2025-04-01T10:30:00Z",
//     autoRenew: true,
//   },
//   {
//     id: "sub-2",
//     userId: "2",
//     planId: "plan-3",
//     status: "active",
//     startDate: "2025-03-02T14:45:00Z",
//     endDate: "2025-04-02T14:45:00Z",
//     autoRenew: true,
//   },
// ];

// // Add these to the AuthContextType interface
// type AuthContextType = {
//   user: User | null;
//   activePortfolio: Portfolio | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   setActivePortfolio: (portfolioId: string) => void;
//   updatePortfolio: (portfolioData: Partial<Portfolio>) => void;
//   updateUsername: (newUsername: string) => Promise<boolean>;
//   // Photo group management
//   createPhotoGroup: (name: string, description: string) => string;
//   updatePhotoGroup: (groupId: string, data: Partial<PhotoGroup>) => void;
//   deletePhotoGroup: (groupId: string) => void;
//   addPhotoToGroup: (groupId: string, photo: Photo) => void;
//   removePhotoFromGroup: (groupId: string, photoId: number) => void;
//   reorderPhotosInGroup: (groupId: string, photos: Photo[]) => void;
//   setGroupCoverPhoto: (groupId: string, photoId: number) => void;
//   // New function for updating group grid settings
//   updateGroupGridSettings: (
//     groupId: string,
//     settings: Partial<GridSettings>
//   ) => void;
//   // ... existing properties
//   isAdmin: boolean; // Add this to check if current user is admin

//   // Admin functions
//   getAllUsers: () => User[];
//   getUserById: (userId: string) => User | null;
//   updateUser: (userId: string, data: Partial<User>) => boolean;
//   deleteUser: (userId: string) => boolean;

//   getAllPlans: () => PricingPlan[];
//   getPlanById: (planId: string) => PricingPlan | null;
//   createPlan: (plan: Omit<PricingPlan, "id">) => string;
//   updatePlan: (planId: string, data: Partial<PricingPlan>) => boolean;
//   deletePlan: (planId: string) => boolean;

//   getAllTransactions: () => Transaction[];
//   getAllSubscriptions: () => Subscription[];
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [activePortfolio, setActivePortfolioState] = useState<Portfolio | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   // Check for saved auth on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("photofolio_user");
//     const savedPortfolioId = localStorage.getItem(
//       "photofolio_active_portfolio"
//     );

//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser) as User;
//       setUser(parsedUser);

//       if (savedPortfolioId && parsedUser.portfolios.length > 0) {
//         const portfolio =
//           parsedUser.portfolios.find((p) => p.id === savedPortfolioId) ||
//           parsedUser.portfolios[0];
//         setActivePortfolioState(portfolio);
//       } else if (parsedUser.portfolios.length > 0) {
//         setActivePortfolioState(parsedUser.portfolios[0]);
//       }
//     }

//     setIsLoading(false);
//   }, []);

//   // Mock login function
//   const login = async (email: string, password: string): Promise<boolean> => {
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Find user by email (in a real app, we'd verify password too)
//     const foundUser = MOCK_USERS.find(
//       (u) => u.email.toLowerCase() === email.toLowerCase()
//     );

//     if (foundUser) {
//       setUser(foundUser);

//       // Set first portfolio as active if user has any
//       if (foundUser.portfolios.length > 0) {
//         setActivePortfolioState(foundUser.portfolios[0]);
//         localStorage.setItem(
//           "photofolio_active_portfolio",
//           foundUser.portfolios[0].id
//         );
//       }

//       // Save to localStorage
//       localStorage.setItem("photofolio_user", JSON.stringify(foundUser));
//       return true;
//     }

//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     setActivePortfolioState(null);
//     localStorage.removeItem("photofolio_user");
//     localStorage.removeItem("photofolio_active_portfolio");
//   };

//   const setActivePortfolio = (portfolioId: string) => {
//     if (!user) return;

//     const portfolio = user.portfolios.find((p) => p.id === portfolioId);
//     if (portfolio) {
//       setActivePortfolioState(portfolio);
//       localStorage.setItem("photofolio_active_portfolio", portfolioId);
//     }
//   };

//   const updatePortfolio = (portfolioData: Partial<Portfolio>) => {
//     if (!user || !activePortfolio) return;

//     // Create updated portfolio
//     const updatedPortfolio = {
//       ...activePortfolio,
//       ...portfolioData,
//       gridSettings: {
//         ...activePortfolio.gridSettings,
//         ...(portfolioData.gridSettings || {}),
//       },
//       profileData: {
//         ...activePortfolio.profileData,
//         ...(portfolioData.profileData || {}),
//       },
//       photoGroups: portfolioData.photoGroups || activePortfolio.photoGroups,
//     };

//     // Update the portfolio in the user's portfolios array
//     const updatedPortfolios = user.portfolios.map((p) =>
//       p.id === activePortfolio.id ? updatedPortfolio : p
//     );

//     // Create updated user
//     const updatedUser = {
//       ...user,
//       portfolios: updatedPortfolios,
//     };

//     // Update state and localStorage
//     setUser(updatedUser);
//     setActivePortfolioState(updatedPortfolio);
//     localStorage.setItem("photofolio_user", JSON.stringify(updatedUser));
//   };

//   const updateUsername = async (newUsername: string): Promise<boolean> => {
//     if (!user) return false;

//     // Check if username is already taken
//     const isUsernameTaken = MOCK_USERS.some(
//       (u) => u.username === newUsername && u.id !== user.id
//     );
//     if (isUsernameTaken) return false;

//     const updatedUser = { ...user, username: newUsername };
//     setUser(updatedUser);
//     localStorage.setItem("photofolio_user", JSON.stringify(updatedUser));
//     return true;
//   };

//   // New functions for photo group management
//   const createPhotoGroup = (name: string, description: string): string => {
//     if (!user || !activePortfolio) return "";

//     const newGroupId = `group-${Date.now()}`;
//     const newGroup: PhotoGroup = {
//       id: newGroupId,
//       name,
//       description,
//       coverId: null,
//       photos: [],
//       // Initialize with portfolio's grid settings
//       gridSettings: { ...activePortfolio.gridSettings },
//     };

//     const updatedPhotoGroups = [...activePortfolio.photoGroups, newGroup];
//     updatePortfolio({ photoGroups: updatedPhotoGroups });

//     return newGroupId;
//   };

//   const updatePhotoGroup = (groupId: string, data: Partial<PhotoGroup>) => {
//     if (!user || !activePortfolio) return;

//     const updatedPhotoGroups = activePortfolio.photoGroups.map((group) =>
//       group.id === groupId ? { ...group, ...data } : group
//     );

//     updatePortfolio({ photoGroups: updatedPhotoGroups });
//   };

//   const deletePhotoGroup = (groupId: string) => {
//     if (!user || !activePortfolio) return;

//     const updatedPhotoGroups = activePortfolio.photoGroups.filter(
//       (group) => group.id !== groupId
//     );
//     updatePortfolio({ photoGroups: updatedPhotoGroups });
//   };

//   const addPhotoToGroup = (groupId: string, photo: Photo) => {
//     if (!user || !activePortfolio) return;

//     const updatedPhotoGroups = activePortfolio.photoGroups.map((group) => {
//       if (group.id === groupId) {
//         // Ensure unique ID for the photo within the group
//         const maxId = group.photos.reduce((max, p) => Math.max(max, p.id), 0);
//         const newPhoto = { ...photo, id: photo.id || maxId + 1 };

//         // Set as cover if this is the first photo
//         const updatedGroup = {
//           ...group,
//           photos: [...group.photos, newPhoto],
//           coverId: group.coverId === null ? newPhoto.id : group.coverId,
//         };
//         return updatedGroup;
//       }
//       return group;
//     });

//     updatePortfolio({ photoGroups: updatedPhotoGroups });
//   };

//   const removePhotoFromGroup = (groupId: string, photoId: number) => {
//     if (!user || !activePortfolio) return;

//     const updatedPhotoGroups = activePortfolio.photoGroups.map((group) => {
//       if (group.id === groupId) {
//         const updatedPhotos = group.photos.filter(
//           (photo) => photo.id !== photoId
//         );

//         // Update cover if the removed photo was the cover
//         let updatedCoverId = group.coverId;
//         if (group.coverId === photoId) {
//           updatedCoverId =
//             updatedPhotos.length > 0 ? updatedPhotos[0].id : null;
//         }

//         return {
//           ...group,
//           photos: updatedPhotos,
//           coverId: updatedCoverId,
//         };
//       }
//       return group;
//     });

//     updatePortfolio({ photoGroups: updatedPhotoGroups });
//   };

//   const reorderPhotosInGroup = (groupId: string, photos: Photo[]) => {
//     if (!user || !activePortfolio) return;

//     const updatedPhotoGroups = activePortfolio.photoGroups.map((group) =>
//       group.id === groupId ? { ...group, photos } : group
//     );

//     updatePortfolio({ photoGroups: updatedPhotoGroups });
//   };

//   const setGroupCoverPhoto = (groupId: string, photoId: number) => {
//     if (!user || !activePortfolio) return;

//     const updatedPhotoGroups = activePortfolio.photoGroups.map((group) =>
//       group.id === groupId ? { ...group, coverId: photoId } : group
//     );

//     updatePortfolio({ photoGroups: updatedPhotoGroups });
//   };

//   // New function to update grid settings for a specific group
//   const updateGroupGridSettings = (
//     groupId: string,
//     settings: Partial<GridSettings>
//   ) => {
//     if (!user || !activePortfolio) return;

//     const updatedPhotoGroups = activePortfolio.photoGroups.map((group) => {
//       if (group.id === groupId) {
//         return {
//           ...group,
//           gridSettings: {
//             ...group.gridSettings,
//             ...settings,
//           },
//         };
//       }
//       return group;
//     });

//     updatePortfolio({ photoGroups: updatedPhotoGroups });
//   };

//   // Inside the AuthProvider function, add:
//   const isAdmin = user?.role === "admin";

//   // Admin functions implementation
//   const getAllUsers = () => {
//     return MOCK_USERS;
//   };

//   const getUserById = (userId: string) => {
//     return MOCK_USERS.find((u) => u.id === userId) || null;
//   };

//   const updateUser = (userId: string, data: Partial<User>) => {
//     // In a real app, this would update a database
//     // For now, we'll just log the update
//     console.log("Updating user", userId, data);
//     return true;
//   };

//   const deleteUser = (userId: string) => {
//     // In a real app, this would delete from a database
//     // For now, we'll just log the deletion
//     console.log("Deleting user", userId);
//     return true;
//   };

//   const getAllPlans = () => {
//     return MOCK_PRICING_PLANS;
//   };

//   const getPlanById = (planId: string) => {
//     return MOCK_PRICING_PLANS.find((p) => p.id === planId) || null;
//   };

//   const createPlan = (plan: Omit<PricingPlan, "id">) => {
//     // In a real app, this would create in a database
//     // For now, we'll just log the creation
//     const id = `plan-${Date.now()}`;
//     console.log("Creating plan", { ...plan, id });
//     return id;
//   };

//   const updatePlan = (planId: string, data: Partial<PricingPlan>) => {
//     // In a real app, this would update a database
//     // For now, we'll just log the update
//     console.log("Updating plan", planId, data);
//     return true;
//   };

//   const deletePlan = (planId: string) => {
//     // In a real app, this would delete from a database
//     // For now, we'll just log the deletion
//     console.log("Deleting plan", planId);
//     return true;
//   };

//   const getAllTransactions = () => {
//     return MOCK_TRANSACTIONS;
//   };

//   const getAllSubscriptions = () => {
//     return MOCK_SUBSCRIPTIONS;
//   };

//   // Add these to the return value in the AuthProvider component:
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         activePortfolio,
//         isAuthenticated: !!user,
//         login,
//         logout,
//         setActivePortfolio,
//         updatePortfolio,
//         updateUsername,
//         // Photo group management functions
//         createPhotoGroup,
//         updatePhotoGroup,
//         deletePhotoGroup,
//         addPhotoToGroup,
//         removePhotoFromGroup,
//         reorderPhotosInGroup,
//         setGroupCoverPhoto,
//         // Grid settings for groups
//         updateGroupGridSettings,
//         // ... existing properties
//         isAdmin,

//         // Admin functions
//         getAllUsers,
//         getUserById,
//         updateUser,
//         deleteUser,

//         getAllPlans,
//         getPlanById,
//         createPlan,
//         updatePlan,
//         deletePlan,

//         getAllTransactions,
//         getAllSubscriptions,
//       }}
//     >
//       {!isLoading && children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// // Add these type exports at the end
// export type {
//   PhotoGroup,
//   Photo,
//   GridSettings,
//   UserRole,
//   PricingPlan,
//   Transaction,
//   Subscription,
// };

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import useSWR, { mutate } from "swr";
import api from "@/lib/api";

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export type UserType = {
  id: number;
  email: string;
  name: string;
  picture: string;
  role: string;
  portfolio: PortfolioType;
};

export type PortfolioType = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  columns: number;
  gap: number;
  rounded_corners: boolean;
  show_captions: boolean;
  profiles: ProfileType;
  folders: FolderType[];
};

export type ProfileType = {
  id: string;
  portfolio_id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  instagram: string;
  website: string;
};

export type FolderType = {
  id: string;
  portfolio_id: string;
  name: string;
  description: string;
  coverId: number;
  photos: PhotoType[];
};

export type PhotoType = {
  id: number;
  folder_id: string;
  src: string;
  alt: string;
  caption: string;
};

interface AuthContextType {
  loading: boolean;
  user: UserType | null;
  onAuthenticateGoogle: (data: any) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: null,
  onAuthenticateGoogle: () => {},
  onLogout: () => {},
});

import { ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const { toast } = useToast();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [accessToken, setAccessToken] = useState(cookies.accessToken || "");

  const {
    data: user,
    error,
    isLoading,
    isValidating,
  } = useSWR(() => (accessToken ? "/v1/users/me" : ""));

  useEffect(() => {
    if (cookies.accessToken) {
      setAccessToken(cookies.accessToken);
    }
  }, [cookies]);

  const [loading, setLoading] = useState(false);

  const onAuthenticateGoogle = useCallback(
    async (data: any) => {
      setLoading(true);
      try {
        const { data: res } = await api.post("/v1/auth/login/google", data);

        if (res.data && res.success) {
          var expiredAt = new Date();
          expiredAt.setMonth(expiredAt.getMonth() + 1);

          setAccessToken(res.data.token);
          setCookie("accessToken", res.data.token, {
            path: "/",
            expires: expiredAt,
          });

          setTimeout(async () => {
            await mutate("/v1/users/me");
            router.push("/editor");
          }, 500);
        } else if (res.success && !res.data) {
          toast({
            title: "Error",
            description: "No data related to this account",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [router, setCookie, toast]
  );

  const onLogout = () => {
    setAccessToken("");
    removeCookie("accessToken", { path: "/" });
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        loading: isLoading || isValidating || loading,
        user: user?.data,
        onAuthenticateGoogle,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
