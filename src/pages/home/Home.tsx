import GetAppointment from "@/components/GetAppointment/GetAppointment";

export default function Home() {
  return (
    <section>
      <div className="min-h-screen bg-blue-400">
        <h1 className="text-3xl font-black text-center py-2">Prendi un appuntamento</h1>
        <GetAppointment />
      </div>
    </section>
  )
}
