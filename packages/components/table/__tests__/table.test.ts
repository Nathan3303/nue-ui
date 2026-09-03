import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { NueTable } from '../index';

const columns = [
    { key: 'name', title: '姓名', width: 120, sortable: true },
    { key: 'age', title: '年龄', width: 80, align: 'right' }
];

const rows = [
    { name: '张三', age: 30 },
    { name: '李四', age: 25 },
    { name: '王五', age: null }
];

const mountTable = (props: Record<string, unknown> = {}) => {
    return mount(NueTable, { props: { data: rows, columns, ...props } });
};

describe('NueTable', () => {
    describe('渲染', () => {
        it('应该渲染列标题', () => {
            const wrapper = mountTable();
            const headCells = wrapper.findAll('thead th');
            expect(headCells).toHaveLength(2);
            expect(headCells[0]!.text()).toBe('姓名');
            expect(headCells[1]!.text()).toBe('年龄');
        });

        it('应该渲染数据行与单元格文本', () => {
            const wrapper = mountTable();
            const bodyRows = wrapper.findAll('tbody tr.nue-table__row');
            expect(bodyRows).toHaveLength(3);
            expect(bodyRows[0]!.text()).toContain('张三');
            expect(bodyRows[0]!.text()).toContain('30');
        });

        it('null/undefined 值应该渲染为空字符串', () => {
            const wrapper = mountTable();
            const cells = wrapper.findAll('tbody tr.nue-table__row')[2]!.findAll('td');
            expect(cells[1]!.text()).toBe('');
        });

        it('没有标题的列应回退到 key', () => {
            const wrapper = mount(NueTable, {
                props: { data: rows, columns: [{ key: 'name' }] }
            });
            expect(wrapper.find('thead th').text()).toBe('name');
        });

        it('数字列宽应转成 px，并应用 align 修饰类', () => {
            const wrapper = mountTable();
            const headCells = wrapper.findAll('thead th');
            expect(headCells[1]!.attributes('style')).toContain('width: 80px');
            expect(headCells[1]!.classes()).toContain('nue-table__head-cell--right');
            const td = wrapper.findAll('tbody td')[1]!;
            expect(td.classes()).toContain('nue-table__cell--right');
        });
    });

    describe('单元格与表头插槽', () => {
        it('cell 插槽应该覆盖默认渲染并接收作用域参数', () => {
            const wrapper = mount(NueTable, {
                props: { data: rows, columns },
                slots: {
                    'cell-name': (scope: { row: { name: string } }) =>
                        h('span', { class: 'custom-cell' }, `${scope.row.name}!`)
                }
            });
            expect(wrapper.find('.custom-cell').exists()).toBe(true);
            expect(wrapper.find('.custom-cell').text()).toBe('张三!');
        });

        it('header 插槽应该覆盖默认标题', () => {
            const wrapper = mount(NueTable, {
                props: { data: rows, columns },
                slots: { 'header-age': '自定义表头' }
            });
            const headCells = wrapper.findAll('thead th');
            expect(headCells[1]!.text()).toBe('自定义表头');
        });
    });

    describe('空态与加载态', () => {
        it('数据为空时应渲染空态行，colspan 等于列数', () => {
            const wrapper = mount(NueTable, { props: { data: [], columns } });
            const td = wrapper.find('tbody td.nue-table__cell--state');
            expect(td.exists()).toBe(true);
            expect(td.attributes('colspan')).toBe('2');
            expect(wrapper.text()).toContain('暂无数据');
        });

        it('空态插槽应覆盖默认空态', () => {
            const wrapper = mount(NueTable, {
                props: { data: [], columns },
                slots: { empty: '我的自定义空态' }
            });
            expect(wrapper.find('tbody').text()).toContain('我的自定义空态');
        });

        it('加载态应渲染加载行并隐藏数据', () => {
            const wrapper = mountTable({ loading: true });
            expect(wrapper.find('tbody').text()).toContain('加载中...');
            expect(wrapper.find('.nue-table__state-icon').exists()).toBe(true);
            expect(wrapper.findAll('tbody tr.nue-table__row')).toHaveLength(0);
        });
    });

    describe('排序', () => {
        const sortRows = [
            { name: 'alice', age: 30 },
            { name: 'bob', age: 25 },
            { name: 'carol', age: null }
        ];
        const rowTexts = (wrapper: ReturnType<typeof mount>) => {
            return wrapper.findAll('tbody tr.nue-table__row').map(row => row.text());
        };

        it('第一次点击应升序排列并触发 sort-change', async () => {
            const wrapper = mount(NueTable, { props: { data: sortRows, columns } });
            await wrapper.find('thead th').trigger('click');
            expect(rowTexts(wrapper)[0]!).toContain('alice');
            expect(wrapper.emitted('sort-change')?.[0]?.[0]).toEqual({
                key: 'name',
                order: 'asc'
            });
        });

        it('再次点击应降序，第三次点击应取消排序', async () => {
            const wrapper = mount(NueTable, { props: { data: sortRows, columns } });
            const th = wrapper.findAll('thead th')[0]!;
            await th.trigger('click');
            await th.trigger('click');
            expect(rowTexts(wrapper)[0]!).toContain('carol');
            expect(wrapper.emitted('sort-change')?.[1]?.[0]).toEqual({
                key: 'name',
                order: 'desc'
            });
            await th.trigger('click');
            expect(rowTexts(wrapper)[0]!).toContain('alice');
            expect(wrapper.emitted('sort-change')?.[2]?.[0]).toEqual({
                key: 'name',
                order: ''
            });
        });

        it('激活排序列应渲染方向箭头图标', async () => {
            const wrapper = mount(NueTable, { props: { data: sortRows, columns } });
            const th = wrapper.findAll('thead th')[0]!;
            await th.trigger('click');
            expect(wrapper.find('.nue-table__sort-icon').exists()).toBe(true);
            expect(wrapper.find('thead .icon-arrow-up').exists()).toBe(true);
            await th.trigger('click');
            expect(wrapper.find('thead .icon-arrow-down').exists()).toBe(true);
            await th.trigger('click');
            expect(wrapper.find('.nue-table__sort-icon').exists()).toBe(false);
        });

        it('非 sortable 列表头点击不应触发排序', async () => {
            const wrapper = mount(NueTable, { props: { data: sortRows, columns } });
            const headCells = wrapper.findAll('thead th');
            await headCells[1]!.trigger('click');
            expect(wrapper.emitted('sort-change')).toBeFalsy();
        });

        it('sort-key/sort-order 初值应直接生效', () => {
            const wrapper = mount(NueTable, {
                props: { data: sortRows, columns, sortKey: 'name', sortOrder: 'desc' }
            });
            expect(wrapper.find('thead .icon-arrow-down').exists()).toBe(true);
            expect(rowTexts(wrapper)[0]!).toContain('carol');
        });

        it('null 值行在数值列排序时应排到最后', async () => {
            const numericColumns = [{ key: 'age', title: '年龄', sortable: true }];
            const wrapper = mount(NueTable, {
                props: { data: sortRows, columns: numericColumns }
            });
            await wrapper.find('thead th').trigger('click');
            const texts = wrapper.findAll('tbody tr.nue-table__row').map(row => row.text());
            expect(texts[0]!).toBe('25');
            expect(texts[1]!).toBe('30');
            expect(texts[2]!).toBe('');
        });
    });

    describe('事件', () => {
        it('点击数据行应触发 row-click 并携带行数据与索引', async () => {
            const wrapper = mountTable();
            const targetRow = wrapper.findAll('tbody tr.nue-table__row')[1]!;
            await targetRow.trigger('click');
            const payload = wrapper.emitted('row-click')?.[0]?.[0] as {
                row: { name: string };
                index: number;
            };
            expect(payload.row.name).toBe('李四');
            expect(payload.index).toBe(1);
        });
    });

    describe('主题修饰', () => {
        it('theme 属性应生成修饰类', () => {
            const wrapper = mount(NueTable, {
                props: { data: rows, columns, theme: 'striped,border,custom' }
            });
            const root = wrapper.find('.nue-table');
            expect(root.classes()).toContain('nue-table--striped');
            expect(root.classes()).toContain('nue-table--border');
            expect(root.classes()).toContain('nue-table--custom');
        });
    });
});