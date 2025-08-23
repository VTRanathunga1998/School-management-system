import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";

export default function TeacherPage() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row ">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 h-screen">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>

          {/* Scrollable wrapper */}
          <div className="h-full overflow-x-auto">
            {/* Min width applied to inner content */}
            <div className="min-w-[800px] h-full md:w-full">
              <BigCalendar />
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
}
