import { Cards } from "./component/Cards";
import { CardsTest } from "./component/CardsTest";


export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col items-center justify-center min-h-screen w-full">
        {/* <Cards /> */}
        <CardsTest />
      </main>
    </div>
  );
}
