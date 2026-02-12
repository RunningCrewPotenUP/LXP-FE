import { InfoCard } from "@/src/entities/Card";
import EnrollmentCard from "@/src/entities/Card/EnrollmentCard";
import { getCourseLearnRoute } from "@/src/shared/constants/routes";
import RoleUpgradeInfoCard from "./RoleUpgradeInfoCard";
import { MailIcon, SparklesIcon, UserIcon } from "lucide-react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Thumbnail from "../../../../public/image.png";

type EnrollmentApiItem = {
  id?: number;
  courseId?: number;
  title?: string;
  courseTitle?: string;
  progress?: number;
  completionRate?: number;
  thumbnail?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  course?: {
    id?: number;
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

type UserMeApiItem = {
  userId?: number;
  email?: string;
  name?: string;
  role?: string;
  level?: string;
};

type UserMeApiResponse = {
  data?: UserMeApiItem | null;
  error?: {
    code?: string;
    message?: string;
  } | null;
};

type EnrollmentCardItem = {
  id: string;
  courseId?: number;
  title: string;
  thumbnail: string;
  progress?: number;
};

type UserInfo = {
  name: string;
  email: string;
  role: string;
  level: string;
  canUpgradeRole: boolean;
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
    courseId: item.course?.id ?? item.courseId,
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

const ROLE_LABEL_MAP: Record<string, string> = {
  LEARNER: "러너",
  INSTRUCTOR: "크루 리더",
};

const LEVEL_LABEL_MAP: Record<string, string> = {
  JUNIOR: "주니어",
  MIDDLE: "미들",
  SENIOR: "시니어",
  EXPERT: "전문가",
};

const mapRoleLabel = (role?: string) => {
  if (!role) {
    return "정보 없음";
  }

  return ROLE_LABEL_MAP[role] ?? role;
};

const mapLevelLabel = (level?: string) => {
  if (!level) {
    return "정보 없음";
  }

  return LEVEL_LABEL_MAP[level] ?? level;
};

const isLearnerRole = (role?: string) => {
  if (!role) {
    return false;
  }

  const normalizedRole = role.trim().toUpperCase();

  return normalizedRole === "LEARNER";
};

const getMe = async (): Promise<{
  user: UserInfo | null;
  unauthorized: boolean;
}> => {
  try {
    const baseUrl = await getBaseUrl();
    const cookieHeader = (await cookies()).toString();

    const response = await fetch(`${baseUrl}/api/users/me`, {
      method: "GET",
      cache: "no-store",
      headers: cookieHeader
        ? {
            cookie: cookieHeader,
          }
        : undefined,
    });

    if (response.status === 401) {
      return {
        user: null,
        unauthorized: true,
      };
    }

    const result = (await response.json()) as UserMeApiResponse;

    if (!response.ok) {
      return {
        user: null,
        unauthorized: false,
      };
    }

    return {
      user: {
        name: result.data?.name?.trim() || "정보 없음",
        email: result.data?.email?.trim() || "정보 없음",
        role: mapRoleLabel(result.data?.role),
        level: mapLevelLabel(result.data?.level),
        canUpgradeRole: isLearnerRole(result.data?.role),
      },
      unauthorized: false,
    };
  } catch {
    return {
      user: null,
      unauthorized: false,
    };
  }
};

const MePage = async () => {
  const [{ cards, errorMessage }, meResult] = await Promise.all([
    getEnrollments(),
    getMe(),
  ]);

  if (meResult.unauthorized) {
    redirect("/login");
  }

  const user =
    meResult.user ??
    ({
      name: "정보 없음",
      email: "정보 없음",
      role: "정보 없음",
      level: "정보 없음",
      canUpgradeRole: false,
    } satisfies UserInfo);

  return (
    <div className="space-y-6">
      <div className="text-white grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <InfoCard
          label={user.name}
          title="이름"
          icon={UserIcon}
          iconColor="green"
        />
        <InfoCard
          label={user.email}
          title="이메일"
          icon={MailIcon}
          iconColor="blue"
        />
        <RoleUpgradeInfoCard
          role={user.role}
          canUpgrade={user.canUpgradeRole}
        />
        <InfoCard
          label={user.level}
          title="레벨"
          icon={SparklesIcon}
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
              learnHref={
                typeof card.courseId === "number"
                  ? getCourseLearnRoute(card.courseId)
                  : undefined
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MePage;
