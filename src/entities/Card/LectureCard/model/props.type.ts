interface LectureCardLectureProps {
  id?: number;
  title?: string;
  order?: number;
  durationInSeconds?: number;
}

interface LectureCardProps {
  tagLabel?: string;
  title?: string;
  durationInSeconds?: number;
  lectures?: LectureCardLectureProps[];
}

export type { LectureCardLectureProps, LectureCardProps };