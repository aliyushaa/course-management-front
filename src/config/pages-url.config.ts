class ROUTE {
    private root = '/app'

    HOME = this.root
    TOP = `${this.root}/top`
    LOGIN = `${this.root}/login`
    SETTINGS = `${this.root}/settings`
    NOT_FOUND = `${this.root}/error`
    COURSE_LIST = `${this.root}/courses`
    COURSE_PAGE = `${this.root}/course`
    COURSE_PAGE_WITH_PARAM = `${this.root}/course/:courseId`
    SUBMISSIONS_PAGE = `${this.root}/submissions`

    COURSE_MANAGEMENT = `${this.root}/course-management`
    USER_MANAGEMENT = `${this.root}/user-management`
}

export const ROUTES = new ROUTE()