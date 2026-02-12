import { SearchIcon } from "lucide-react";
import { headers } from "next/headers";
import InputField from "../../../entities/InputField";
import CardContainer from "../../../widgets/CardContainer";
import CategoryControl from "../../../widgets/CategoryControl";
import { CrewHero } from "../../../widgets/Hero/";

type MainApiResponse = {
  data?: {
    cards?: {
      id: number;
      title: string;
      description?: string;
      badgeOptions?: {
        label: string;
      };
      tagOptions?: {
        label: string;
      }[];
    }[];
  };
};

const getBaseUrl = async () => {
  const headerStore = await headers();
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const forwardedProtocol = headerStore.get("x-forwarded-proto");
  const protocol = forwardedProtocol ?? (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
};

const getCourseCards = async () => {
  try {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`${baseUrl}/api/courses/search`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const result = (await response.json()) as MainApiResponse;
    return result.data?.cards ?? [];
  } catch {
    return [];
  }
};

export default async function Home() {
  const courseCards = await getCourseCards();

  return (
    <>
      <main className="">
        <CrewHero />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0 gap-2">
          <CategoryControl />

          <InputField icon={SearchIcon} />
        </div>

        <CardContainer cardOptions={courseCards} />
      </main>
    </>
  );
}
