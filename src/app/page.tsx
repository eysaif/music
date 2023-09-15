import Image from "next/image";
import dashboard from "./dashboard/page";
import Link from "next/link";
export default function Login() {
  return (
    <>
      <nav>
        <div className="navbar bg-neutral text-neutral-content">
          <Link className="btn btn-ghost normal-case text-xl" href="/dashboard">
            Login
          </Link>
        </div>
      </nav>
    </>
  );
}
