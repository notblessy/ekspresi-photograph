import { Mail, Globe, Instagram, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ProfileData {
  name: string
  title: string
  bio: string
  email: string
  instagram: string
  website: string
}

interface ProfileSectionProps {
  data: ProfileData
}

export function ProfileSection({ data }: ProfileSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <Avatar className="w-24 h-24 border">
        <AvatarImage src="/placeholder.svg?height=96&width=96" alt={data.name} />
        <AvatarFallback>
          <Camera className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-4 flex-1">
        <div>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-muted-foreground">{data.title}</p>
        </div>
        <p className="max-w-2xl">{data.bio}</p>
        <div className="flex flex-wrap gap-3">
          {data.email && (
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="h-4 w-4" />
              {data.email}
            </Button>
          )}
          {data.instagram && (
            <Button variant="outline" size="sm" className="gap-2">
              <Instagram className="h-4 w-4" />
              {data.instagram}
            </Button>
          )}
          {data.website && (
            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              {data.website}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

