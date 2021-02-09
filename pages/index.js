import Link from 'next/link';

import ChevronRight from '@/components/icons/ChevronRight';

const sections = [
  {
    title: 'Recipes',
    link: '/recipes',
    imageSrc: '/recipes-150.png',
    description:
      'Our favorite recipes that we have made and collected over the years.',
  },
  {
    title: 'Pet Activity',
    link: '/pet-activity',
    imageSrc: '/pet-activity-150.png',
    description: "Keeping track of our pets' activities througout the day.",
  },
];

export default function Home() {
  return (
    <>
      <h1 className="text-6xl font-bold font-lora pt-2 pb-3 text-center sm:text-left px-4">
        Our Family
      </h1>

      <div className="sm:px-4">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {sections.map(({ link, title, imageSrc, description }) => (
              <li>
                <Link href={link}>
                  <a className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-14 w-14 rounded-full"
                            src={imageSrc}
                          />
                        </div>
                        <div className="min-w-0 flex-1 px-4">
                          <div>
                            <p className="text-2xl font-semibold font-lora">
                              {title}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              {description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRight />
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
