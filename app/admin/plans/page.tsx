"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { CheckCircle2, MoreHorizontal, Plus, XCircle } from "lucide-react"
import type { PricingPlan } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"

export default function PlansPage() {
  const { getAllPlans, createPlan, updatePlan, deletePlan } = useAuth()

  // Dialog states
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false)
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false)
  const [isDeletePlanOpen, setIsDeletePlanOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    billingCycle: "monthly" as "monthly" | "yearly",
    features: [""],
    isPopular: false,
    maxPhotoGroups: null as number | null,
    customDomain: false,
    advancedAnalytics: false,
    teamMembers: 1,
  })

  const plans = getAllPlans()

  const handleOpenAddPlan = () => {
    setFormData({
      name: "",
      price: 0,
      billingCycle: "monthly",
      features: [""],
      isPopular: false,
      maxPhotoGroups: null,
      customDomain: false,
      advancedAnalytics: false,
      teamMembers: 1,
    })
    setIsAddPlanOpen(true)
  }

  const handleOpenEditPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan)
    setFormData({
      name: plan.name,
      price: plan.price,
      billingCycle: plan.billingCycle,
      features: [...plan.features],
      isPopular: plan.isPopular,
      maxPhotoGroups: plan.maxPhotoGroups,
      customDomain: plan.customDomain,
      advancedAnalytics: plan.advancedAnalytics,
      teamMembers: plan.teamMembers,
    })
    setIsEditPlanOpen(true)
  }

  const handleOpenDeletePlan = (plan: PricingPlan) => {
    setSelectedPlan(plan)
    setIsDeletePlanOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleBillingCycleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, billingCycle: value as "monthly" | "yearly" }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    setFormData((prev) => ({ ...prev, features: updatedFeatures }))
  }

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }))
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures.splice(index, 1)
    setFormData((prev) => ({ ...prev, features: updatedFeatures }))
  }

  const handleAddPlan = () => {
    // Filter out empty features
    const filteredFeatures = formData.features.filter((f) => f.trim() !== "")

    const newPlan = {
      ...formData,
      features: filteredFeatures,
    }

    createPlan(newPlan)
    setIsAddPlanOpen(false)
  }

  const handleEditPlan = () => {
    if (selectedPlan) {
      // Filter out empty features
      const filteredFeatures = formData.features.filter((f) => f.trim() !== "")

      const updatedPlan = {
        ...formData,
        features: filteredFeatures,
      }

      updatePlan(selectedPlan.id, updatedPlan)
      setIsEditPlanOpen(false)
    }
  }

  const handleDeletePlan = () => {
    if (selectedPlan) {
      deletePlan(selectedPlan.id)
      setIsDeletePlanOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pricing Plans</h1>
        <Button className="gap-2" onClick={handleOpenAddPlan}>
          <Plus className="h-4 w-4" />
          Add Plan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Management</CardTitle>
          <CardDescription>View and manage your subscription plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Photo Groups</TableHead>
                  <TableHead>Custom Domain</TableHead>
                  <TableHead>Team Members</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>${plan.price}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{plan.billingCycle}</Badge>
                    </TableCell>
                    <TableCell>{plan.maxPhotoGroups === null ? "Unlimited" : plan.maxPhotoGroups}</TableCell>
                    <TableCell>
                      {plan.customDomain ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>{plan.teamMembers}</TableCell>
                    <TableCell>
                      {plan.isPopular ? <Badge variant="default">Popular</Badge> : <Badge variant="outline">No</Badge>}
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
                          <DropdownMenuItem onClick={() => handleOpenEditPlan(plan)}>Edit plan</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleOpenDeletePlan(plan)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Plan Dialog */}
      <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Plan</DialogTitle>
            <DialogDescription>Create a new pricing plan for your customers.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Plan Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Pro" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="12"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="billingCycle">Billing Cycle</Label>
                <Select value={formData.billingCycle} onValueChange={handleBillingCycleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxPhotoGroups">Max Photo Groups</Label>
                <Input
                  id="maxPhotoGroups"
                  name="maxPhotoGroups"
                  type="number"
                  value={formData.maxPhotoGroups === null ? "" : formData.maxPhotoGroups}
                  onChange={(e) => {
                    const value = e.target.value === "" ? null : Number.parseInt(e.target.value)
                    setFormData((prev) => ({ ...prev, maxPhotoGroups: value }))
                  }}
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="teamMembers">Team Members</Label>
                <Input
                  id="teamMembers"
                  name="teamMembers"
                  type="number"
                  value={formData.teamMembers}
                  onChange={handleInputChange}
                  placeholder="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="customDomain"
                  checked={formData.customDomain}
                  onCheckedChange={(checked) => handleSwitchChange("customDomain", checked)}
                />
                <Label htmlFor="customDomain">Custom Domain</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="advancedAnalytics"
                  checked={formData.advancedAnalytics}
                  onCheckedChange={(checked) => handleSwitchChange("advancedAnalytics", checked)}
                />
                <Label htmlFor="advancedAnalytics">Advanced Analytics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => handleSwitchChange("isPopular", checked)}
                />
                <Label htmlFor="isPopular">Mark as Popular</Label>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Features</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  Add Feature
                </Button>
              </div>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g., Unlimited photo groups"
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      className="h-8 w-8"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPlan}>Create Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
            <DialogDescription>Update the pricing plan details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Plan Name</Label>
                <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input id="edit-price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-billingCycle">Billing Cycle</Label>
                <Select value={formData.billingCycle} onValueChange={handleBillingCycleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-maxPhotoGroups">Max Photo Groups</Label>
                <Input
                  id="edit-maxPhotoGroups"
                  name="maxPhotoGroups"
                  type="number"
                  value={formData.maxPhotoGroups === null ? "" : formData.maxPhotoGroups}
                  onChange={(e) => {
                    const value = e.target.value === "" ? null : Number.parseInt(e.target.value)
                    setFormData((prev) => ({ ...prev, maxPhotoGroups: value }))
                  }}
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-teamMembers">Team Members</Label>
                <Input
                  id="edit-teamMembers"
                  name="teamMembers"
                  type="number"
                  value={formData.teamMembers}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-customDomain"
                  checked={formData.customDomain}
                  onCheckedChange={(checked) => handleSwitchChange("customDomain", checked)}
                />
                <Label htmlFor="edit-customDomain">Custom Domain</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-advancedAnalytics"
                  checked={formData.advancedAnalytics}
                  onCheckedChange={(checked) => handleSwitchChange("advancedAnalytics", checked)}
                />
                <Label htmlFor="edit-advancedAnalytics">Advanced Analytics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => handleSwitchChange("isPopular", checked)}
                />
                <Label htmlFor="edit-isPopular">Mark as Popular</Label>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Features</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  Add Feature
                </Button>
              </div>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g., Unlimited photo groups"
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      className="h-8 w-8"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Plan Confirmation */}
      <AlertDialog open={isDeletePlanOpen} onOpenChange={setIsDeletePlanOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the <span className="font-medium">{selectedPlan?.name}</span> plan. Users
              currently subscribed to this plan will not be affected, but no new subscriptions will be allowed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePlan}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

