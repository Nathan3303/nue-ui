export type IconNameType =
    | 'archive'
    | 'inbox-fill'
    | 'inbox'
    | 'square-check-fill'
    | 'square-check'
    | 'square'
    | 'check'
    | 'priority-1'
    | 'priority-2'
    | 'priority-3'
    | 'select'
    | 'connection'
    | 'logo'
    | 'lock'
    | 'files'
    | 'menu'
    | 'arrow-right-more'
    | 'arrow-left-more'
    | 'projects'
    | 'board'
    | 'drive'
    | 'plus'
    | 'location'
    | 'download'
    | 'upload'
    | 'picture'
    | 'history'
    | 'chat'
    | 'subscribe'
    | 'refresh'
    | 'warning'
    | 'setting'
    | 'loading'
    | 'eye'
    | 'clear'
    | 'fail'
    | 'tag'
    | 'more-vertical'
    | 'heart'
    | 'edit'
    | 'help'
    | 'success'
    | 'more'
    | 'share'
    | 'calendar'
    | 'calendar-wrap'
    | 'filter'
    | 'delete'
    | 'search'
    | 'circle'
    | 'ring'
    | 'plus-circle'
    | 'heart-fill'
    | 'success-fill'
    | 'completed'
    | 'plus-circle-fill'
    | 'more2'
    | 'mail'
    | 'theme'
    | 'scan'
    | 'eye-close'
    | 'arrow-right'
    | 'arrow-left'
    | 'arrow-down'
    | 'arrow-up';

export type IconPropsType = {
    name: IconNameType;
    size?: string;
    color?: string;
    spin?: boolean;
    spinSpeed?: string;
    theme?: string | string[];
};
