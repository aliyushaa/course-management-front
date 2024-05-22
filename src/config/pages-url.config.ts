class ROUTE {
    private root = '/app'

    HOME = this.root
    LOGIN = `${this.root}/login`
    SETTINGS = `${this.root}/settings`
    NOT_FOUND = `${this.root}/error`
    COURSE_LIST = `${this.root}/courses`
    COURSE_PAGE = `${this.root}/course`
    COURSE_PAGE_WITH_PARAM = `${this.root}/course/:courseId`

    COURSE_MANAGEMENT = `${this.root}/course-management`
}

export const ROUTES = new ROUTE()