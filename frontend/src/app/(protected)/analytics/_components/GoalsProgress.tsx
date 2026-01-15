import ProgressRing from "../../dashboard/_components/ProgressRing"

function GoalsProgress() {
  return (
    <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-soft p-5 animate-slide-up">
      <h3 className="font-semibold text-foreground mb-6">
        Weekly Goals Progress
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <ProgressRing
          progress={85}
          size={100}
          strokeWidth={6}
          label="Tasks"
          sublabel="34/40 done"
        />
        <ProgressRing
          progress={72}
          size={100}
          strokeWidth={6}
          label="Study Time"
          sublabel="28.5/40 hrs"
        />
        <ProgressRing
          progress={90}
          size={100}
          strokeWidth={6}
          label="Attendance"
          sublabel="18/20 classes"
        />
        <ProgressRing
          progress={60}
          size={100}
          strokeWidth={6}
          label="Readings"
          sublabel="6/10 chapters"
        />
      </div>
    </div>
  )
}

export default GoalsProgress
