import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import type { Transaction } from "@/contexts/auth-context"

interface RecentTransactionsTableProps {
  transactions: Transaction[]
}

export function AdminRecentTransactionsTable({ transactions }: RecentTransactionsTableProps) {
  const { getAllUsers, getAllPlans } = useAuth()

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

  // Helper function to get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "pending":
        return "outline"
      case "failed":
        return "destructive"
      case "refunded":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{getUserName(transaction.userId)}</TableCell>
                <TableCell>{getPlanName(transaction.planId)}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(transaction.status)}>{transaction.status}</Badge>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

