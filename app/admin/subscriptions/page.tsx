"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MoreHorizontal, Search } from "lucide-react"
import type { Subscription } from "@/contexts/auth-context"

export default function SubscriptionsPage() {
  const { getAllSubscriptions, getAllUsers, getAllPlans } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  // Dialog states
  const [isEditSubscriptionOpen, setIsEditSubscriptionOpen] = useState(false)
  const [isCancelSubscriptionOpen, setIsCancelSubscriptionOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    status: "active" as "active" | "canceled" | "expired",
    endDate: "",
    autoRenew: true,
  })

  const subscriptions = getAllSubscriptions()
  const users = getAllUsers()
  const plans = getAllPlans()

  // Helper function to get user name by ID
  const getUserName = (userId: string): string => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : "Unknown User"
  }

  // Helper function to get plan name by ID
  const getPlanName = (planId: string): string => {
    const plan = plans.find((p) => p.id === planId)
    return plan ? plan.name : "Unknown Plan"
  }

  // Filter subscriptions based on search query
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const userName = getUserName(subscription.userId).toLowerCase()
    const planName = getPlanName(subscription.planId).toLowerCase()
    return (
      userName.includes(searchQuery.toLowerCase()) ||
      planName.includes(searchQuery.toLowerCase()) ||
      subscription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Helper function to get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "canceled":
        return "secondary"
      case "expired":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleOpenEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setFormData({
      status: subscription.status,
      endDate: new Date(subscription.endDate).toISOString().split("T")[0],
      autoRenew: subscription.autoRenew,
    })
    setIsEditSubscriptionOpen(true)
  }

  const handleOpenCancelSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setIsCancelSubscriptionOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as "active" | "canceled" | "expired" }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, autoRenew: checked }))
  }

  const handleEditSubscription = () => {
    // In a real app, this would call an API to update the subscription
    console.log("Updating subscription:", selectedSubscription?.id, formData)
    setIsEditSubscriptionOpen(false)
  }

  const handleCancelSubscription = () => {
    // In a real app, this would call an API to cancel the subscription
    console.log("Canceling subscription:", selectedSubscription?.id)
    setIsCancelSubscriptionOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
          <CardDescription>View and manage user subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subscription ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Auto Renew</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24">
                      No subscriptions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell className="font-medium">{subscription.id}</TableCell>
                      <TableCell>{getUserName(subscription.userId)}</TableCell>
                      <TableCell>{getPlanName(subscription.planId)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(subscription.status)}>{subscription.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={subscription.autoRenew ? "outline" : "secondary"}>
                          {subscription.autoRenew ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleOpenEditSubscription(subscription)}>
                              Edit subscription
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleOpenCancelSubscription(subscription)}
                              disabled={subscription.status !== "active"}
                            >
                              Cancel subscription
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Subscription Dialog */}
      <Dialog open={isEditSubscriptionOpen} onOpenChange={setIsEditSubscriptionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogDescription>Update subscription details and settings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="autoRenew" checked={formData.autoRenew} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="autoRenew">Auto Renew</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSubscriptionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubscription}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Confirmation */}
      <AlertDialog open={isCancelSubscriptionOpen} onOpenChange={setIsCancelSubscriptionOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this subscription? The user will lose access to premium features at the
              end of their current billing period.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep it active</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, cancel subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

