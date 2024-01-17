import Navbar from "@/components/ui/Navbar"

export default function Home() {
  return (
    <main>
      <div className="main-application text-white">
        <Navbar />
        <div className="flex w-full justify-center h-full items-center mt-32">
          <div className="flex flex-col text-center font-light text-6xl">
            <span>RÉSERVEZ</span>
            <span>UNE EXPÉRIENCE</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 w-auto h-auto -z-10 brightness-50">
        <video autoPlay playsInline loop>
          <source src="/landing.mp4" type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  )
}
