export type IconNameType =
    | "in-progress"
    | "logo"
    | "time"
    | "lock"
    | "files"
    | "menu"
    | "more-right"
    | "projects"
    | "board"
    | "drive"
    | "plys"
    | "todo"
    | "write"
    | "location"
    | "download"
    | "upload"
    | "picture"
    | "history"
    | "chat"
    | "subscribe"
    | "refresh"
    | "warning"
    | "setting"
    | "loading"
    | "eye"
    | "clear"
    | "fail"
    | "tag"
    | "more-vertical"
    | "heart"
    | "edit"
    | "help"
    | "success"
    | "more"
    | "share"
    | "calendar"
    | "calendar-wrap"
    | "delete"
    | "search"
    | "circle"
    | "ring"
    | "plus-circle"
    | "heart-fill"
    | "success-fill"
    | "completed"
    | "invoices"
    | "plus-circle-fill"
    | "more2"
    | "mail"
    | "theme"
    | "scan"
    | "eye-close"
    | "arrow-right"
    | "arrow-left"
    | "logo2"
    | "arrow-down"
    | "arrow-up";

export type IconPropsType = {
    name: IconNameType;
    size?: string;
    color?: string;
    spin?: boolean;
    spinSpeed?: string;
    theme?: string | string[];
};
