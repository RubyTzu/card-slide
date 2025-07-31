import { Cards } from "./component/Cards";
import { DragTest } from "./component/DragTest";


export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col items-center justify-center min-h-screen w-full">
        {/* <Cards /> */}
        <DragTest />
      </main>
    </div>
  );
}
