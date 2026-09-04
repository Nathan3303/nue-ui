/**
 * 日期工具函数 - 使用原生 Date API 实现
 */

/**
 * 格式化日期为 YYYY-MM-DD 格式
 * @param date - 日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 格式化日期为友好格式 (YYYY年MM月DD日)
 * @param date - 日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDateFriendly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

/**
 * 格式化日期时间为友好格式 (YYYY年MM月DD日 HH:mm)
 * @param date - 日期对象
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTimeFriendly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hour}:${minute}`;
}

/**
 * 检测日期字符串的格式类型
 * @param str - 日期字符串
 * @returns 格式类型: 'iso', 'standard', 或 null
 */
export function detectDateFormat(str: string): 'iso' | 'standard' | null {
    if (!str || typeof str !== 'string') return null;

    // ISO 格式检查 (带 T 或带时区)
    if (
        /^\d{4}-\d{2}-\d{2}T/.test(str) ||
        /^\d{4}-\d{2}-\d{2}.*[+-]\d{2}:?\d{2}$/.test(str) ||
        /^\d{4}-\d{2}-\d{2}.*Z$/.test(str)
    ) {
        return 'iso';
    }

    // 标准格式检查
    if (/^\d{4}-\d{2}-\d{2}$/.test(str) || /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(str)) {
        return 'standard';
    }

    return null;
}

/**
 * 格式化日期为 ISO 格式 (YYYY-MM-DDTHH:mm:ssZ)
 * @param date - 日期对象
 * @returns ISO 格式的日期字符串
 */
export function formatDateISO(date: Date): string {
    return date.toISOString();
}

/**
 * 格式化日期时间为 ISO 格式 (YYYY-MM-DDTHH:mm:ssZ)
 * @param date - 日期对象
 * @returns ISO 格式的日期时间字符串
 */
export function formatDateTimeISO(date: Date): string {
    return date.toISOString();
}

/**
 * 根据检测到的格式类型格式化日期
 * @param date - 日期对象
 * @param formatType - 格式类型 ('iso' 或 'standard')
 * @param includeTime - 是否包含时间
 * @returns 格式化后的日期字符串
 */
export function formatDateByType(
    date: Date,
    formatType: 'iso' | 'standard',
    includeTime: boolean = false
): string {
    if (formatType === 'iso') {
        if (includeTime) {
            return formatDateTimeISO(date);
        }
        // 对于只包含日期的 ISO 格式，我们取日期部分
        return date.toISOString().split('T')[0]!;
    }

    // standard 格式
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (includeTime) {
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    return `${year}-${month}-${day}`;
}

/**
 * 解析日期字符串为 Date 对象
 * @param str - 日期字符串 (支持 YYYY-MM-DD 或 ISO 格式)
 * @returns Date 对象或 null (如果解析失败)
 */
export function parseDate(str: string): Date | null {
    if (!str || typeof str !== 'string') {
        return null;
    }

    // 检查是否是 ISO 格式的变种（带 T 或带时区）
    const isISOFormat = /^\d{4}-\d{2}-\d{2}(T| )/.test(str);

    if (isISOFormat) {
        const date = new Date(str);
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return new Date(year, month - 1, day);
        }
    }

    // 严格的 YYYY-MM-DD 格式解析
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(str)) {
        return null;
    }

    const [year, month, day] = str.split('-').map(Number);
    // 正则已保证三段均为数字，此处仅作类型收窄
    if (year === undefined || month === undefined || day === undefined) {
        return null;
    }
    const parsedDate = new Date(year, month - 1, day);

    // 验证日期有效性
    if (
        parsedDate.getFullYear() !== year ||
        parsedDate.getMonth() !== month - 1 ||
        parsedDate.getDate() !== day
    ) {
        return null;
    }

    return parsedDate;
}

/**
 * 获取指定月份的天数
 * @param year - 年份
 * @param month - 月份 (1-12)
 * @returns 该月的天数
 */
export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}

/**
 * 获取星期几
 * @param date - 日期对象
 * @returns 星期几 (0 = 周日, 6 = 周六)
 */
export function getWeekday(date: Date): number {
    return date.getDay();
}

/**
 * 日期加减天数
 * @param date - 基准日期
 * @param days - 要加减的天数 (正数为加，负数为减)
 * @returns 计算后的日期
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * 日期加减月份
 * @param date - 基准日期
 * @param months - 要加减的月份数 (正数为加，负数为减)
 * @returns 计算后的日期
 */
export function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    const targetMonth = result.getMonth() + months;
    result.setMonth(targetMonth);

    // 处理月份溢出/下溢的情况
    // 例如: 1月31日 + 1个月 = 3月3日，需要回调到2月28/29日
    if (result.getMonth() !== (date.getMonth() + months + 12) % 12) {
        const daysInTargetMonth = getDaysInMonth(result.getFullYear(), result.getMonth() + 1);
        result.setDate(Math.min(date.getDate(), daysInTargetMonth));
    }

    return result;
}

/**
 * 判断两个日期是否同一天
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 是否同一天
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * 判断日期是否在指定范围内
 * @param date - 要检查的日期
 * @param start - 范围起始日期
 * @param end - 范围结束日期
 * @returns 是否在范围内
 */
export function isInRange(date: Date, start: Date, end: Date): boolean {
    const time = date.getTime();
    return time >= start.getTime() && time <= end.getTime();
}

/**
 * 获取日期范围内的所有日期
 * @param start - 起始日期
 * @param end - 结束日期
 * @returns 日期数组
 */
export function getDateRange(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    const current = new Date(start);
    const endTime = end.getTime();

    while (current.getTime() <= endTime) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return dates;
}

/**
 * 获取最近 N 天
 * @param days - 天数
 * @returns 最近 N 天的日期数组 (从今天开始往前数)
 */
export function getRecentDays(days: number): Date[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dates: Date[] = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date);
    }

    return dates;
}