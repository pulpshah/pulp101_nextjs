import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { TaskChecklist } from "@/components/dashboard/TaskChecklist";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 space-y-12">
      <h1 className="text-4xl font-bold text-white">Welcome to your Onboarding Dashboard</h1>
      <p className="text-gray-400 text-lg">Track your progress and complete setup tasks below.</p>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard title="Welcome Package" status="Complete" />
        <DashboardCard title="Access Credentials" status="Pending" />
        <DashboardCard title="First Team Meeting" status="Scheduled" />
        <DashboardCard title="Handbook Training" status="In Progress" />
        <DashboardCard title="Project Tools Setup" status="Pending" />
        <DashboardCard title="Feedback Session" status="Upcoming" />
      </section>

      <ProgressTracker progress={45} />

      <TaskChecklist
        tasks={[
          { label: "Read Team Handbook", completed: true },
          { label: "Join Slack + Email", completed: false },
          { label: "Set up GitHub + Vercel", completed: false },
          { label: "Schedule intro call", completed: false },
        ]}
      />
    </main>
  );
}
