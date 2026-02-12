const APP_ROUTES = {
  MAIN: "/main",
  LOGIN: "/login",
  REGISTER: "/register",
  COURSE_DETAIL: "/course",
  COURSE_CREATE: "/course/new",
  ME: "/me",
};

export const getCourseLearnRoute = (courseId: number | string) =>
  `${APP_ROUTES.COURSE_DETAIL}/${courseId}/learn`;

export default APP_ROUTES;
