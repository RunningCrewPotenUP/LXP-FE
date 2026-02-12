import { PhotoHero } from "@/src/entities/Hero";

type CourseDetailHeroProps = {
  title?: string;
  category?: string;
};

const CourseDetailHero = ({ title, category }: CourseDetailHeroProps) => {
  return (
    <PhotoHero
      title={title ?? "비전공자를 위한 SQL 첫걸음: 데이터 리터러시 기르기"}
      category={category ?? "데이터"}
    />
  );
};

export default CourseDetailHero;
