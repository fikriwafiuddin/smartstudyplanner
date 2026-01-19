import DiscussionsSection from "./_components/DiscussionsSection"
import SharedTasksSection from "./_components/SharedTasksSection"
import HeaderSection from "./_components/HeaderSection"
import MembersList from "./_components/MembersList"

function DetailGroupPage() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <HeaderSection />
          <SharedTasksSection />
          <MembersList />
        </div>

        <div className="lg:sticky lg:top-6 h-fit">
          <DiscussionsSection />
        </div>
      </div>
    </>
  )
}

export default DetailGroupPage
