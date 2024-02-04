import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
    return (
<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <Image
        alt="Night"
                        src="/login.png"
                        width={600}
                        height={1000}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="/">
          <span className="sr-only">Home</span>
        </a>

        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to <span className="">PROEDUCATOR </span>academy
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Excell in Learning
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
            href="/"
          >
            <span className="sr-only">Home</span>
          </a>

          <h1 className=" text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to <span className="text-red-700">PROEDUCATOR </span>academy
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            Excell in Learning
          </p>
        </div>

       <SignIn />
      </div>
    </main>
  </div>
</section>
  );
}