import Image from "next/image";

export default function Home() {
  return (
    <>
      <nav>
        <div className="navbar bg-neutral text-neutral-content">
          <a className="btn btn-ghost normal-case text-xl">Music</a>
        </div>
      </nav>
      <main className="flex m-1 justify-center">
        <div className="card card-compact  bg-base-100 shadow-xl">
          <figure>
            <iframe
               
              src="https://www.youtube.com/embed/MIKHPrCZTPk?autoplay=1&mute=0&controls=0"
            ></iframe>
          </figure>
          <div className="card-body">
            <h2 className="card-title">Music📺</h2>
            <p>Listen to Millions Song Add Free</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Play</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
