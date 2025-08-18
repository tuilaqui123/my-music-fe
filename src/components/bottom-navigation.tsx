import { Home, Search, Library, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomNavigation() {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search" },
    { icon: Library, label: "Library" },
    { icon: User, label: "Profile" },
  ]

  return (
    <div className="bg-card border-t border-border p-2">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 h-auto py-2 ${
              item.active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
