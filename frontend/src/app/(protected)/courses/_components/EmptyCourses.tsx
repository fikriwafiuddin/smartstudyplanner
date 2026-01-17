import { Button } from "@/components/ui/button"
import { BookOpenIcon, PlusIcon } from "lucide-react"

type EmptyCoursesProps = {
  searchQuery?: string
}

function EmptyCourses({ searchQuery }: EmptyCoursesProps) {
  return (
    <div className="text-center py-12">
      <BookOpenIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">
        No courses found
      </h3>
      <p className="text-muted-foreground mb-4">
        {searchQuery
          ? "Try adjusting your search query"
          : "Get started by adding your first course"}
      </p>
      {!searchQuery && (
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      )}
    </div>
  )
}

export default EmptyCourses
