import { DragCards } from "./component/DragCards";
import { SlideTest } from "./component/SlideTest";

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col items-center justify-center w-full bg-[linear-gradient(143deg,rgba(87,199,87,1)_0%,rgba(42,155,89,1)_45%,rgba(55,92,12,1)_100%)]">
        <div className="w-full h-screen relative overflow-hidden mx-auto cursor-(--my-cursor) border border-emerald-600 noise">
          <DragCards />
        </div>
        <div className="min-h-screen flex items-center">
          {/* <SlideTest /> */}
        </div>
      </main>
    </div>
  );
}
