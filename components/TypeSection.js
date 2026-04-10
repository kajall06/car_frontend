import Link from "next/link";

const types = [
  {
    name: "SUV",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800",
  },
  {
    name: "Sedan",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800",
  },
  {
    name: "Coupe",
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800",
  },
];

export default function BrowseByType() {
  return (
    <div className="mt-12 flex flex-col items-center">

      {/* TITLE CENTER */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        Browse by Type
      </h2>

      {/* GRID */}
      <div className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">

        {types.map((type) => (
          <Link key={type.name} href={`/cars/type/${type.name}`}>

            <div className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

              {/* IMAGE FULL COVER */}
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={type.image}
                  className="w-full h-full object-cover"
                  alt={type.name}
                />
              </div>

              {/* TEXT */}
              <div className="p-4 text-center font-bold text-xl">
                {type.name}
              </div>

            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}