import { InfoCard } from "@/src/entities/Card";
import EnrollmentCard from "@/src/entities/Card/EnrollmentCard";
import {
  AwardIcon,
  CheckCircle2Icon,
  ClockIcon,
  MessageSquareIcon,
} from "lucide-react";
import { cookies, headers } from "next/headers";
import Thumbnail from "../../../../public/image.png";

type EnrollmentApiItem = {
  id?: number;
  title?: string;
  courseTitle?: string;
  progress?: number;
  completionRate?: number;
  thumbnail?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  course?: {
    title?: string;
    thumbnailUrl?: string;
    imageUrl?: string;
  };
};

type EnrollmentApiResponse = {
  data?: EnrollmentApiItem[];
  error?: {
    message?: string;
  } | null;
};

type EnrollmentCardItem = {
  id: string;
  title: string;
  thumbnail: string;
  progress?: number;
};

const getBaseUrl = async () => {
  const headerStore = await headers();
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const forwardedProtocol = headerStore.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol ?? (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
};

const normalizeProgress = (item: EnrollmentApiItem) => {
  const candidate = item.progress ?? item.completionRate;

  if (typeof candidate !== "number" || Number.isNaN(candidate)) {
    return undefined;
  }

  return Math.min(100, Math.max(0, Math.round(candidate)));
};

const mapToEnrollmentCard = (
  item: EnrollmentApiItem,
  index: number,
): EnrollmentCardItem => {
  const title =
    item.course?.title ??
    item.courseTitle ??
    item.title ??
    `참여 중인 크루 ${index + 1}`;

  const thumbnail =
    item.course?.thumbnailUrl ??
    item.course?.imageUrl ??
    item.thumbnailUrl ??
    item.imageUrl ??
    item.thumbnail ??
    Thumbnail.src;

  return {
    id: String(item.id ?? index),
    title,
    thumbnail,
    progress: normalizeProgress(item),
  };
};

const getEnrollments = async (): Promise<{
  cards: EnrollmentCardItem[];
  errorMessage: string | null;
}> => {
  try {
    const baseUrl = await getBaseUrl();
    const cookieHeader = (await cookies()).toString();

    const response = await fetch(`${baseUrl}/api/enrollments`, {
      method: "GET",
      cache: "no-store",
      headers: cookieHeader
        ? {
            cookie: cookieHeader,
          }
        : undefined,
    });

    const result = (await response.json()) as EnrollmentApiResponse;

    if (!response.ok) {
      return {
        cards: [],
        errorMessage:
          result.error?.message ?? "내 수강 목록을 불러오지 못했습니다.",
      };
    }

    const cards = (result.data ?? []).map(mapToEnrollmentCard);

    return {
      cards,
      errorMessage: null,
    };
  } catch {
    return {
      cards: [],
      errorMessage: "내 수강 목록을 불러오지 못했습니다.",
    };
  }
};

const MePage = async () => {
  const { cards, errorMessage } = await getEnrollments();

  return (
    <div className="space-y-6">
      <div className="text-white grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <InfoCard
          label={"4개"}
          title="완주한 크루"
          icon={CheckCircle2Icon}
          iconColor="green"
        />
        <InfoCard
          label={"28회"}
          title="토론 참여"
          subLabel="상위 10%"
          icon={MessageSquareIcon}
          iconColor="blue"
        />
        <InfoCard
          label={"124.5h"}
          title="총 학습 시간"
          icon={ClockIcon}
          iconColor="indigo"
        />
        <InfoCard
          label={"12개"}
          title="획득 뱃지"
          icon={AwardIcon}
          iconColor="amber"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 px-2">
          참여 중인 크루
        </h3>

        {errorMessage ? (
          <p className="px-2 text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        ) : cards.length === 0 ? (
          <p className="px-2 text-sm text-slate-500 dark:text-slate-400">
            참여 중인 크루가 없습니다.
          </p>
        ) : (
          cards.map((card) => (
            <EnrollmentCard
              key={card.id}
              thumbnail={card.thumbnail}
              title={card.title}
              progress={card.progress}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MePage;
