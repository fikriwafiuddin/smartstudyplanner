import DiscussionsSection from "./_components/DiscussionsSection"
import SharedTasksSection from "./_components/SharedTasksSection"
import HeaderSection from "./_components/HeaderSection"
import MembersList from "./_components/MembersList"

function DetailGroupPage() {
  return (
    <>
      <HeaderSection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedTasksSection />

        <DiscussionsSection />
      </div>

      <MembersList />
    </>
  )
}

export default DetailGroupPage
